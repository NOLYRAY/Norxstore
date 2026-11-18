import { applyCorsHeaders, readJsonBody } from './_pushStore.js';
import {
  sanitizeOrderId,
  getGatewayRuntimeConfig,
  mapMethodToChannel,
  fetchRtdbOrder,
  patchRtdbOrder,
  createXenditPayment,
  createMidtransPayment
} from './_paymentGateway.js';

export default async function handler(req, res) {
  applyCorsHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const cfg = getGatewayRuntimeConfig();
    if (!cfg.configured) {
      return res.status(503).json({
        ok: false,
        configured: false,
        code: 'GATEWAY_NOT_CONFIGURED',
        error:
          'Payment Gateway API belum diaktifkan di server (XENDIT_SECRET_KEY atau MIDTRANS_SERVER_KEY belum diisi).'
      });
    }

    const body = await readJsonBody(req);
    const orderId = sanitizeOrderId(body.orderId);
    const paymentMethod = String(body.paymentMethod || 'QRIS All Payment');
    const itemName = String(body.itemName || 'Top-Up Game');
    const customerPhone = String(body.customerPhone || '').trim();
    const returnUrl = String(body.returnUrl || '').trim();

    if (!orderId) {
      return res.status(400).json({ ok: false, error: 'orderId tidak valid' });
    }

    // Read order from RTDB when available to ensure authoritative total IDR
    const existingOrder = await fetchRtdbOrder(orderId);
    const rawAmount = existingOrder && existingOrder.total ? existingOrder.total : body.amount;
    const amountIdr = Math.max(0, Math.round(Number(rawAmount) || 0));

    if (amountIdr < 1000) {
      return res.status(400).json({ ok: false, error: 'Nominal minimal transaksi adalah Rp1.000' });
    }

    const channel = mapMethodToChannel(paymentMethod);
    let result;
    if (cfg.provider === 'xendit') {
      result = await createXenditPayment({
        orderId,
        amountIdr,
        channel,
        itemName,
        customerPhone,
        returnUrl
      });
    } else {
      result = await createMidtransPayment({
        orderId,
        amountIdr,
        channel,
        itemName,
        returnUrl
      });
    }

    await patchRtdbOrder(orderId, {
      gatewayProvider: result.provider,
      gatewayExternalId: result.externalId || '',
      gatewayOrderId: result.gatewayOrderId || orderId,
      gatewayChannel: result.channel || channel,
      gatewayStatus: String(result.status || 'PENDING').toUpperCase(),
      gatewayDeeplinkUrl: result.deeplinkUrl || '',
      gatewayCheckoutUrl: result.checkoutUrl || '',
      gatewayQrUrl: result.qrUrl || '',
      gatewayQrImageDataUrl: result.qrImageDataUrl || '',
      gatewayUpdatedAt: Date.now()
    });

    return res.status(200).json({
      ok: true,
      configured: true,
      sandbox: cfg.sandbox,
      ...result
    });
  } catch (err) {
    console.error('create-payment error:', err);
    return res.status(500).json({
      ok: false,
      error: (err && err.message) || 'Gagal membuat transaksi Payment Gateway'
    });
  }
}
