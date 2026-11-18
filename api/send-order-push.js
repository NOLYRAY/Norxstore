import {
  getAllSubscriptionsMap,
  sendWebPushToTargets,
  sendNtfyPush,
  sanitizeNtfyTopic,
  applyCorsHeaders,
  readJsonBody
} from './_pushStore.js';

const RTDB_ORDERS_BASE = 'https://norxstore-id-default-rtdb.asia-southeast1.firebasedatabase.app/norxstore/orders';

async function resolveOrderCustomerNtfyTopic(orderId, explicitTopic) {
  const clean = sanitizeNtfyTopic(explicitTopic);
  if (clean) return clean;
  if (!orderId) return '';
  try {
    const res = await fetch(`${RTDB_ORDERS_BASE}/${encodeURIComponent(String(orderId))}/customerNtfyTopic.json`, {
      signal: typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(2500) : undefined
    });
    if (res.ok) {
      const val = await res.json();
      return sanitizeNtfyTopic(val);
    }
  } catch (e) {}
  return '';
}

export default async function handler(req, res) {
  applyCorsHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const reqBody = await readJsonBody(req);
    const { orderId, status, estimate, itemName, title, body, customerNtfyTopic, mode } = reqBody || {};

    if (mode === 'ntfy_test') {
      const cleanTopic = sanitizeNtfyTopic(customerNtfyTopic);
      if (!cleanTopic) {
        return res.status(400).json({ error: 'Topik ntfy pelanggan masih kosong' });
      }
      const ntfyRes = await sendNtfyPush({
        topic: cleanTopic,
        title: title || '🔔 Tes Notif Pesanan Pelanggan - NORXSTORE',
        body: body || 'Berhasil! Status pesanan Anda (Diproses / Selesai) akan otomatis muncul & berbunyi di sini meski web/app ditutup.',
        url: 'https://norxstore.vercel.app/',
        priority: 5,
        tags: ['bell', 'white_check_mark']
      });
      return res.status(200).json({ success: true, ...ntfyRes });
    }

    if (!orderId && !title) {
      return res.status(400).json({ error: 'Missing orderId or title' });
    }

    let notifTitle = title;
    let notifBody = body;

    if (!notifTitle) {
      if (status === 'done') {
        notifTitle = '🎉 Pesanan Selesai - NORXSTORE';
        notifBody = `Layanan "${itemName || 'Pesanan Anda'}" telah selesai diproses! Silakan cek pesanan Anda.`;
      } else if (status === 'processing') {
        notifTitle = '⚡ Pesanan Diproses - NORXSTORE';
        notifBody = `Layanan "${itemName || 'Pesanan Anda'}" sedang diproses.${estimate ? ' Estimasi: ' + estimate : ''}`;
      } else {
        notifTitle = '📦 Update Pesanan - NORXSTORE';
        notifBody = `Status pesanan Anda telah diperbarui: ${status}`;
      }
    }

    const payload = {
      title: notifTitle,
      body: notifBody,
      url: '/',
      tag: 'order-' + (orderId || 'update')
    };

    const [allMap, resolvedNtfyTopic] = await Promise.all([
      getAllSubscriptionsMap(),
      resolveOrderCustomerNtfyTopic(orderId, customerNtfyTopic)
    ]);

    const targets = Object.values(allMap).filter((s) => {
      if (!s || !s.subscription) return false;
      if (!orderId) return true;
      return Array.isArray(s.orderIds) && s.orderIds.includes(String(orderId));
    });

    const ntfyTags = status === 'done' ? ['tada', 'bell'] : ['zap', 'bell'];
    const [result, ntfyRes] = await Promise.all([
      sendWebPushToTargets(targets, payload),
      resolvedNtfyTopic
        ? sendNtfyPush({
            topic: resolvedNtfyTopic,
            title: notifTitle,
            body: notifBody,
            url: 'https://norxstore.vercel.app/',
            priority: 5,
            tags: ntfyTags
          })
        : Promise.resolve({ ntfySent: false })
    ]);

    return res.status(200).json({
      success: true,
      ...result,
      ntfySent: !!(ntfyRes && ntfyRes.ntfySent),
      ntfyTopic: resolvedNtfyTopic || ''
    });
  } catch (err) {
    console.error('send-order-push error:', err);
    return res.status(500).json({ error: err.message || 'Customer push failed' });
  }
}
