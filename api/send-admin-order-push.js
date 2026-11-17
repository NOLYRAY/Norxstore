import {
  getAllSubscriptionsMap,
  getSubKey,
  sendWebPushToTargets,
  getAdminNtfyConfig,
  sanitizeNtfyTopic,
  resolveNtfyTopicsForService,
  sendNtfyPush,
  sendTelegramAdminAlert,
  applyCorsHeaders,
  readJsonBody
} from './_pushStore.js';

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
      deviceId,
      ntfyTopic,
      ntfyJokiTopic,
      ntfyTopupTopic
    } = body || {};
    if (!orderId && !itemName) {
      return res.status(400).json({ error: 'Missing orderId or itemName' });
    }

    const waitMs = Math.min(Math.max(Number(delayMs) || 0, 0), 5000);
    const subsPromise = (mode === 'test' && directSubscription && directSubscription.endpoint)
      ? Promise.resolve({})
      : (mode === 'ntfy_test' ? Promise.resolve({}) : getAllSubscriptionsMap());

    const needsCloudNtfy = !ntfyTopic && !ntfyJokiTopic && !ntfyTopupTopic;
    const ntfyCfgPromise = needsCloudNtfy
      ? getAdminNtfyConfig()
      : Promise.resolve({
          topic: sanitizeNtfyTopic(ntfyTopic),
          jokiTopic: sanitizeNtfyTopic(ntfyJokiTopic),
          topupTopic: sanitizeNtfyTopic(ntfyTopupTopic)
        });

    const [allMap, resolvedNtfyCfg] = await Promise.all([
      subsPromise,
      ntfyCfgPromise,
      waitMs > 0 ? new Promise((r) => setTimeout(r, waitMs)) : Promise.resolve()
    ]);

    const normalizedSide = (serviceType === 'joki') ? 'joki' : ((serviceType === 'topup') ? 'topup' : ((serviceType === 'all') ? 'all' : ''));
    const priceStr = total ? ('Rp' + Math.round(Number(total) || 0).toLocaleString('id-ID')) : '';
    const srvStr = topupServer ? ` (${topupServer})` : '';
    const typeLabel = normalizedSide === 'topup'
      ? (`Jasa Top Up${topupUid ? ' · UID: ' + topupUid + srvStr : ''}`)
      : (normalizedSide === 'all' ? 'Semua Jasa (Joki & Top Up)' : 'Jasa Joki & Akun');

    let notifTitle = normalizedSide === 'joki'
      ? '⚔️ Order Jasa Joki/Akun Baru! - NORXSTORE'
      : (normalizedSide === 'all' ? '🔔 Order Baru Masuk! - NORXSTORE' : '💎 Order Jasa Top Up Baru! - NORXSTORE');
    if (mode === 'paid') {
      notifTitle = normalizedSide === 'joki'
        ? '💳 Pembayaran Jasa Joki Masuk! - NORXSTORE'
        : '💳 Pembayaran Top Up Masuk! - NORXSTORE';
    } else if (mode === 'test' || mode === 'ntfy_test') {
      notifTitle = normalizedSide === 'joki'
        ? '⚔️ Tes Notif Jasa Joki & Akun - NORXSTORE'
        : (normalizedSide === 'all' ? '🔔 Tes Notif Gabungan (Semua Jasa) - NORXSTORE' : '💎 Tes Notif Jasa Top Up - NORXSTORE');
    }

    const notifBody = `${typeLabel} → ${itemName || 'Pesanan'} · ${priceStr}${paymentMethod ? ' (' + paymentMethod + ')' : ''}`;
    const ntfyTags = normalizedSide === 'joki'
      ? ['crossed_swords', 'moneybag']
      : (normalizedSide === 'all' ? ['bell', 'moneybag'] : ['gem', 'zap']);

    const targetNtfyTopics = resolveNtfyTopicsForService(resolvedNtfyCfg, normalizedSide);

    const payload = {
      title: notifTitle,
      body: notifBody,
      url: 'https://norxstore.vercel.app/',
      serviceType: normalizedSide === 'joki' ? 'joki' : 'topup',
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

    const ntfySendPromise = targetNtfyTopics.length > 0
      ? Promise.all(
          targetNtfyTopics.map((t) =>
            sendNtfyPush({
              topic: t,
              title: notifTitle,
              body: notifBody,
              url: payload.url,
              priority: 5,
              tags: ntfyTags
            })
          )
        ).then((results) => ({
          ntfySent: results.some((r) => r && r.ntfySent),
          ntfyTopics: targetNtfyTopics,
          ntfyResults: results
        }))
      : Promise.resolve({ ntfySent: false, ntfyTopics: [] });

    const [webRes, ntfyRes, tgRes] = await Promise.all([
      (mode === 'ntfy_test' || adminTargets.length === 0)
        ? Promise.resolve({ sent: 0, targetCount: 0, removedStale: 0 })
        : sendWebPushToTargets(adminTargets, payload),
      ntfySendPromise,
      (mode === 'ntfy_test')
        ? Promise.resolve({ tgSent: false })
        : sendTelegramAdminAlert({ title: notifTitle, body: notifBody })
    ]);

    return res.status(200).json({
      success: true,
      ...webRes,
      ntfySent: !!ntfyRes.ntfySent,
      ntfyTopics: ntfyRes.ntfyTopics || [],
      tgSent: !!tgRes.tgSent,
      totalDelivered: (webRes.sent || 0) + (ntfyRes.ntfySent ? 1 : 0) + (tgRes.tgSent ? 1 : 0)
    });
  } catch (err) {
    console.error('send-admin-order-push error:', err);
    return res.status(500).json({ error: err.message || 'Push send failed' });
  }
}
