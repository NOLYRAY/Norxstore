import crypto from 'crypto';
import QRCode from 'qrcode';
import {
  getAllSubscriptionsMap,
  sendWebPushToTargets,
  getAdminNtfyConfig,
  resolveNtfyTopicsForService,
  sendNtfyPush,
  sendTelegramAdminAlert
} from './_pushStore.js';

export const RTDB_ORDERS_BASE =
  'https://norxstore-id-default-rtdb.asia-southeast1.firebasedatabase.app/norxstore/orders';

export function sanitizeOrderId(raw) {
  return String(raw || '').trim().replace(/[^a-zA-Z0-9_-]/g, '');
}

export function getGatewayRuntimeConfig() {
  const xenditKey = String(process.env.XENDIT_SECRET_KEY || '').trim();
  const midtransServerKey = String(process.env.MIDTRANS_SERVER_KEY || '').trim();
  const midtransProd =
    String(process.env.MIDTRANS_IS_PRODUCTION || '').trim().toLowerCase() === 'true';
  const explicitProvider = String(process.env.PAYMENT_PROVIDER || '').trim().toLowerCase();

  let provider = null;
  if (explicitProvider === 'xendit' && xenditKey) provider = 'xendit';
  else if (explicitProvider === 'midtrans' && midtransServerKey) provider = 'midtrans';
  else if (xenditKey) provider = 'xendit';
  else if (midtransServerKey) provider = 'midtrans';

  const configured = !!provider;
  const sandbox =
    provider === 'xendit'
      ? xenditKey.startsWith('xnd_development_')
      : provider === 'midtrans'
        ? !midtransProd
        : true;

  return {
    configured,
    provider,
    sandbox,
    hasXendit: !!xenditKey,
    hasMidtrans: !!midtransServerKey,
    webhookPath: '/api/payment-webhook'
  };
}

export function mapMethodToChannel(methodName) {
  const upper = String(methodName || '').toUpperCase();
  if (upper.includes('SEABANK')) return 'seabank';
  if (upper.includes('SHOPEE')) return 'shopeepay';
  if (upper.includes('GOPAY')) return 'gopay';
  if (upper.includes('OVO')) return 'ovo';
  if (upper.includes('DANA')) return 'dana';
  return 'qris';
}

export function normalizePhoneToE164(rawPhone) {
  const digits = String(rawPhone || '').replace(/[^\d+]/g, '');
  if (!digits) return '';
  if (digits.startsWith('+62') && digits.length >= 11) return digits;
  if (digits.startsWith('62') && digits.length >= 10) return '+' + digits;
  if (digits.startsWith('08') && digits.length >= 10) return '+62' + digits.slice(1);
  if (digits.startsWith('8') && digits.length >= 9) return '+62' + digits;
  return '';
}

export async function qrStringToDataUrl(qrString) {
  const raw = String(qrString || '').trim();
  if (!raw) return '';
  try {
    return await QRCode.toDataURL(raw, {
      errorCorrectionLevel: 'M',
      width: 480,
      margin: 2,
      color: { dark: '#0f172a', light: '#ffffff' }
    });
  } catch (e) {
    return '';
  }
}

export async function fetchRtdbOrder(orderId) {
  const safeId = sanitizeOrderId(orderId);
  if (!safeId) return null;
  try {
    const res = await fetch(`${RTDB_ORDERS_BASE}/${encodeURIComponent(safeId)}.json`, {
      signal: typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(4000) : undefined
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data && typeof data === 'object' ? data : null;
  } catch (e) {
    return null;
  }
}

export async function patchRtdbOrder(orderId, fields) {
  const safeId = sanitizeOrderId(orderId);
  if (!safeId || !fields || typeof fields !== 'object') return false;
  try {
    const res = await fetch(`${RTDB_ORDERS_BASE}/${encodeURIComponent(safeId)}.json`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
      signal: typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(4500) : undefined
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

export async function createXenditPayment({
  orderId,
  amountIdr,
  channel,
  itemName,
  customerPhone,
  returnUrl
}) {
  const secretKey = String(process.env.XENDIT_SECRET_KEY || '').trim();
  if (!secretKey) throw new Error('XENDIT_SECRET_KEY not configured');
  const auth = 'Basic ' + Buffer.from(`${secretKey}:`).toString('base64');
  const safeReturn =
    returnUrl && /^https?:\/\//i.test(returnUrl) ? returnUrl : 'https://norxstore.vercel.app/';

  // 1. Dynamic QRIS (Xendit QR Codes API 2022-07-31)
  if (channel === 'qris') {
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    const res = await fetch('https://api.xendit.co/qr_codes', {
      method: 'POST',
      headers: {
        Authorization: auth,
        'Content-Type': 'application/json',
        'api-version': '2022-07-31'
      },
      body: JSON.stringify({
        reference_id: orderId,
        type: 'DYNAMIC',
        currency: 'IDR',
        amount: amountIdr,
        expires_at: expiresAt
      })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || data.error_code || `Xendit QRIS failed (${res.status})`);
    }
    const qrString = data.qr_string || '';
    const qrImageDataUrl = await qrStringToDataUrl(qrString);
    return {
      provider: 'xendit',
      channel: 'qris',
      gatewayOrderId: orderId,
      externalId: data.id || orderId,
      qrString,
      qrImageDataUrl,
      qrUrl: '',
      deeplinkUrl: '',
      checkoutUrl: '',
      status: data.status || 'ACTIVE',
      expiresAt: data.expires_at || expiresAt
    };
  }

  // 2. Direct E-Wallet Charge (DANA / ShopeePay / OVO if phone provided)
  const e164Phone = normalizePhoneToE164(customerPhone);
  const canDirectEwallet =
    channel === 'dana' ||
    channel === 'shopeepay' ||
    (channel === 'ovo' && !!e164Phone);

  if (canDirectEwallet) {
    const channelCode =
      channel === 'dana' ? 'ID_DANA' : channel === 'shopeepay' ? 'ID_SHOPEEPAY' : 'ID_OVO';
    const channelProperties =
      channelCode === 'ID_OVO'
        ? { mobile_number: e164Phone }
        : { success_redirect_url: safeReturn, failure_redirect_url: safeReturn };

    const res = await fetch('https://api.xendit.co/ewallets/charges', {
      method: 'POST',
      headers: {
        Authorization: auth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reference_id: orderId,
        currency: 'IDR',
        amount: amountIdr,
        checkout_method: 'ONE_TIME_PAYMENT',
        channel_code: channelCode,
        channel_properties: channelProperties,
        metadata: { orderId, itemName: String(itemName || 'Top-Up Norxstore').slice(0, 80) }
      })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || data.error_code || `Xendit eWallet failed (${res.status})`);
    }
    const actions = (data && data.actions) || {};
    const deeplinkUrl =
      actions.mobile_deeplink_checkout_url ||
      actions.mobile_web_checkout_url ||
      actions.desktop_web_checkout_url ||
      '';
    const checkoutUrl =
      actions.mobile_web_checkout_url || actions.desktop_web_checkout_url || deeplinkUrl;
    const qrString = actions.qr_checkout_string || '';
    const qrImageDataUrl = qrString ? await qrStringToDataUrl(qrString) : '';

    return {
      provider: 'xendit',
      channel,
      gatewayOrderId: orderId,
      externalId: data.id || orderId,
      deeplinkUrl,
      checkoutUrl,
      qrString,
      qrImageDataUrl,
      qrUrl: '',
      status: data.status || 'PENDING',
      ovoPushSent: channelCode === 'ID_OVO'
    };
  }

  // 3. Xendit Invoice fallback (GoPay / SeaBank / OVO without phone)
  const res = await fetch('https://api.xendit.co/v2/invoices', {
    method: 'POST',
    headers: {
      Authorization: auth,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      external_id: orderId,
      amount: amountIdr,
      currency: 'IDR',
      description: `NORXSTORE · ${String(itemName || 'Top-Up Game').slice(0, 120)}`,
      invoice_duration: 900,
      success_redirect_url: safeReturn,
      failure_redirect_url: safeReturn
    })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.error_code || `Xendit Invoice failed (${res.status})`);
  }
  return {
    provider: 'xendit',
    channel,
    gatewayOrderId: orderId,
    externalId: data.id || orderId,
    deeplinkUrl: data.invoice_url || '',
    checkoutUrl: data.invoice_url || '',
    qrString: '',
    qrImageDataUrl: '',
    qrUrl: '',
    status: data.status || 'PENDING',
    expiresAt: data.expiry_date || ''
  };
}

export async function createMidtransPayment({
  orderId,
  amountIdr,
  channel,
  itemName,
  returnUrl
}) {
  const serverKey = String(process.env.MIDTRANS_SERVER_KEY || '').trim();
  if (!serverKey) throw new Error('MIDTRANS_SERVER_KEY not configured');
  const isProd =
    String(process.env.MIDTRANS_IS_PRODUCTION || '').trim().toLowerCase() === 'true';
  const coreBase = isProd ? 'https://api.midtrans.com' : 'https://api.sandbox.midtrans.com';
  const snapBase = isProd ? 'https://app.midtrans.com' : 'https://app.sandbox.midtrans.com';
  const auth = 'Basic ' + Buffer.from(`${serverKey}:`).toString('base64');
  const safeReturn =
    returnUrl && /^https?:\/\//i.test(returnUrl) ? returnUrl : 'https://norxstore.vercel.app/';

  const itemDetails = [
    {
      id: orderId.slice(0, 48),
      price: amountIdr,
      quantity: 1,
      name: String(itemName || 'Top-Up Game Norxstore').slice(0, 50)
    }
  ];

  // Core API direct deeplink / dynamic QRIS for GoPay, ShopeePay, QRIS
  if (channel === 'gopay' || channel === 'shopeepay' || channel === 'qris') {
    try {
      const payload = {
        payment_type: channel,
        transaction_details: {
          order_id: orderId,
          gross_amount: amountIdr
        },
        item_details: itemDetails
      };
      if (channel === 'gopay') {
        payload.gopay = { enable_callback: true, callback_url: safeReturn };
      } else if (channel === 'shopeepay') {
        payload.shopeepay = { callback_url: safeReturn };
      } else if (channel === 'qris') {
        payload.qris = { acquirer: 'gopay' };
      }

      const res = await fetch(`${coreBase}/v2/charge`, {
        method: 'POST',
        headers: {
          Authorization: auth,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && (!data.status_code || Number(data.status_code) < 400)) {
        const actions = Array.isArray(data.actions) ? data.actions : [];
        const deeplinkAct = actions.find((a) => a && a.name === 'deeplink-redirect');
        const qrAct = actions.find((a) => a && a.name === 'generate-qr-code');
        const qrString = data.qr_string || '';
        const qrImageDataUrl = qrString ? await qrStringToDataUrl(qrString) : '';

        return {
          provider: 'midtrans',
          channel,
          gatewayOrderId: orderId,
          externalId: data.transaction_id || orderId,
          deeplinkUrl: (deeplinkAct && deeplinkAct.url) || '',
          checkoutUrl: (deeplinkAct && deeplinkAct.url) || '',
          qrUrl: (qrAct && qrAct.url) || '',
          qrString,
          qrImageDataUrl,
          status: data.transaction_status || 'pending'
        };
      }
    } catch (coreErr) {
      // Fallback gracefully to Snap below if Core API channel isn't enabled yet
    }
  }

  // Snap API: try channel preference, then retry without enabled_payments so Perorangan (VA + GoPay + QRIS) never fails
  const attemptSnap = async (enabledPaymentsList) => {
    const snapBody = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amountIdr
      },
      item_details: itemDetails,
      callbacks: { finish: safeReturn }
    };
    if (Array.isArray(enabledPaymentsList) && enabledPaymentsList.length > 0) {
      snapBody.enabled_payments = enabledPaymentsList;
    }
    const res = await fetch(`${snapBase}/snap/v1/transactions`, {
      method: 'POST',
      headers: {
        Authorization: auth,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(snapBody)
    });
    const data = await res.json().catch(() => ({}));
    return { res, data };
  };

  const preferredSnapMap = {
    gopay: ['gopay', 'other_qris'],
    qris: ['other_qris', 'gopay'],
    shopeepay: ['shopeepay', 'other_qris', 'gopay'],
    dana: ['other_qris', 'gopay', 'bank_transfer'],
    ovo: ['other_qris', 'gopay', 'bank_transfer'],
    seabank: ['bank_transfer', 'other_va', 'other_qris']
  };

  let snapResp = await attemptSnap(preferredSnapMap[channel] || null);
  if (!snapResp.res.ok || !snapResp.data.redirect_url) {
    snapResp = await attemptSnap(null);
  }

  if (!snapResp.res.ok || !snapResp.data.redirect_url) {
    const d = snapResp.data || {};
    throw new Error(
      (Array.isArray(d.error_messages) ? d.error_messages.join(', ') : d.status_message) ||
        `Midtrans Snap failed (${snapResp.res.status})`
    );
  }
  return {
    provider: 'midtrans',
    channel,
    gatewayOrderId: orderId,
    externalId: snapResp.data.token || orderId,
    snapToken: snapResp.data.token || '',
    deeplinkUrl: snapResp.data.redirect_url,
    checkoutUrl: snapResp.data.redirect_url,
    qrUrl: '',
    qrString: '',
    qrImageDataUrl: '',
    status: 'pending'
  };
}

export async function queryMidtransOrderStatus(orderId) {
  const serverKey = String(process.env.MIDTRANS_SERVER_KEY || '').trim();
  if (!serverKey) return null;
  const isProd =
    String(process.env.MIDTRANS_IS_PRODUCTION || '').trim().toLowerCase() === 'true';
  const coreBase = isProd ? 'https://api.midtrans.com' : 'https://api.sandbox.midtrans.com';
  const auth = 'Basic ' + Buffer.from(`${serverKey}:`).toString('base64');
  try {
    const res = await fetch(`${coreBase}/v2/${encodeURIComponent(orderId)}/status`, {
      headers: { Authorization: auth, Accept: 'application/json' },
      signal: typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(4500) : undefined
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

export async function queryXenditEwalletStatus(chargeId) {
  const secretKey = String(process.env.XENDIT_SECRET_KEY || '').trim();
  if (!secretKey || !chargeId) return null;
  const auth = 'Basic ' + Buffer.from(`${secretKey}:`).toString('base64');
  try {
    const res = await fetch(`https://api.xendit.co/ewallets/charges/${encodeURIComponent(chargeId)}`, {
      headers: { Authorization: auth },
      signal: typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(4500) : undefined
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

export function verifyMidtransSignature(body) {
  const serverKey = String(process.env.MIDTRANS_SERVER_KEY || '').trim();
  if (!serverKey || !body) return false;
  const orderId = String(body.order_id || '');
  const statusCode = String(body.status_code || '');
  const grossAmount = String(body.gross_amount || '');
  const sigKey = String(body.signature_key || '');
  if (!orderId || !statusCode || !grossAmount || !sigKey) return false;
  const expected = crypto
    .createHash('sha512')
    .update(orderId + statusCode + grossAmount + serverKey)
    .digest('hex');
  return expected === sigKey;
}

export async function markOrderPaidAndNotifyAdmin(orderId, gatewayMeta = {}) {
  const safeId = sanitizeOrderId(orderId);
  if (!safeId) return { updated: false, reason: 'invalid-order-id' };

  const existing = await fetchRtdbOrder(safeId);
  const alreadyPaid = !!(existing && existing.gatewayPaid === true);
  const now = Date.now();

  const patchPayload = {
    customerPaidConfirmed: true,
    customerPaidAt: (existing && existing.customerPaidAt) || now,
    gatewayPaid: true,
    gatewayPaidAt: now,
    gatewayStatus: 'PAID',
    gatewayProvider: gatewayMeta.provider || (existing && existing.gatewayProvider) || '',
    gatewayExternalId: gatewayMeta.externalId || (existing && existing.gatewayExternalId) || '',
    status: existing && (existing.status === 'done' || existing.status === 'selesai') ? existing.status : 'processing'
  };

  await patchRtdbOrder(safeId, patchPayload);

  if (alreadyPaid) {
    return { updated: true, duplicateNotificationSkipped: true };
  }

  try {
    const ord = existing || {};
    const serviceSide = ord.serviceType === 'joki' ? 'joki' : 'topup';
    const itemsText = Array.isArray(ord.items)
      ? ord.items.map((it) => (it.name || 'Top-Up') + (it.qty > 1 ? ' x' + it.qty : '')).join(', ')
      : 'Top-Up Game';
    const priceStr = ord.total
      ? 'Rp' + Math.round(Number(ord.total) || 0).toLocaleString('id-ID')
      : '';
    const uidPart = ord.topupUid ? ` · UID: ${ord.topupUid} (${ord.topupServer || 'Asia'})` : '';
    const title =
      serviceSide === 'joki'
        ? '💳 Pembayaran Otomatis Joki Masuk! - NORXSTORE'
        : '💳 Pembayaran Otomatis Top Up Masuk! - NORXSTORE';
    const notifBody = `LUNAS (${gatewayMeta.provider ? gatewayMeta.provider.toUpperCase() : 'GATEWAY'})${uidPart} → ${itemsText} · ${priceStr} (${ord.paymentMethod || 'Online'})`;

    const [allMap, ntfyCfg] = await Promise.all([getAllSubscriptionsMap(), getAdminNtfyConfig()]);
    const adminTargets = Object.values(allMap || {}).filter((s) => s && s.isAdmin === true);
    const topics = resolveNtfyTopicsForService(ntfyCfg, serviceSide);

    await Promise.allSettled([
      adminTargets.length > 0
        ? sendWebPushToTargets(adminTargets, {
            title,
            body: notifBody,
            url: 'https://norxstore.vercel.app/',
            serviceType: serviceSide,
            tag: 'admin-paid-' + safeId
          })
        : Promise.resolve(),
      ...topics.map((topic) =>
        sendNtfyPush({
          topic,
          title,
          body: notifBody,
          url: 'https://norxstore.vercel.app/',
          priority: 5,
          tags: ['moneybag', 'white_check_mark']
        })
      ),
      sendTelegramAdminAlert({ title, body: notifBody })
    ]);
  } catch (e) {}

  return { updated: true };
}
