import { getAllSubscriptionsMap, getSubKey, sendWebPushToTargets, applyCorsHeaders, readJsonBody } from './_pushStore.js';

export default async function handler(req, res) {
  applyCorsHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = await readJsonBody(req);
    const {
      orderId,
      itemName,
      total,
      paymentMethod,
      serviceType,
      topupUid,
      topupServer,
      mode,
      delayMs,
      directSubscription,
      deviceId
    } = body || {};
    if (!orderId && !itemName) {
      return res.status(400).json({ error: 'Missing orderId or itemName' });
    }

    const waitMs = Math.min(Math.max(Number(delayMs) || 0, 0), 5000);
    const subsPromise = (mode === 'test' && directSubscription && directSubscription.endpoint)
      ? Promise.resolve({})
      : getAllSubscriptionsMap();

    const [allMap] = await Promise.all([
      subsPromise,
      waitMs > 0 ? new Promise((r) => setTimeout(r, waitMs)) : Promise.resolve()
    ]);

    const priceStr = total ? ('Rp' + Math.round(Number(total) || 0).toLocaleString('id-ID')) : '';
    const srvStr = topupServer ? ` (${topupServer})` : '';
    const typeLabel = serviceType === 'topup'
      ? (`Top-Up${topupUid ? ' UID: ' + topupUid + srvStr : ''}`)
      : 'Joki / Akun';

    let notifTitle = '🛎️ Pesanan Baru Masuk! - NORXSTORE';
    if (mode === 'paid') {
      notifTitle = '💳 Pelanggan Sudah Transfer! - NORXSTORE';
    } else if (mode === 'test') {
      notifTitle = '🛎️ Tes Push Masuk (App Ditutup) - NORXSTORE';
    }

    const notifBody = `${typeLabel}: ${itemName || 'Pesanan'} · ${priceStr}${paymentMethod ? ' (' + paymentMethod + ')' : ''}`;

    const payload = {
      title: notifTitle,
      body: notifBody,
      url: '/',
      serviceType: serviceType || 'topup',
      tag: 'admin-new-order-' + (orderId || Date.now())
    };

    const adminTargets = Object.values(allMap || {}).filter((s) => s && s.isAdmin === true);
    if (directSubscription && directSubscription.endpoint) {
      adminTargets.unshift({
        key: getSubKey(directSubscription.endpoint),
        subscription: directSubscription,
        deviceId: deviceId || 'direct',
        isAdmin: true,
        updatedAt: Date.now()
      });
    }

    const result = await sendWebPushToTargets(adminTargets, payload);

    return res.status(200).json({ success: true, ...result });
  } catch (err) {
    console.error('send-admin-order-push error:', err);
    return res.status(500).json({ error: err.message || 'Push send failed' });
  }
}
