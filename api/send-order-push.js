import { getAllSubscriptionsMap, sendWebPushToTargets, applyCorsHeaders, readJsonBody } from './_pushStore.js';

export default async function handler(req, res) {
  applyCorsHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const reqBody = await readJsonBody(req);
    const { orderId, status, estimate, itemName, title, body } = reqBody || {};
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

    const allMap = await getAllSubscriptionsMap();
    const targets = Object.values(allMap).filter((s) => {
      if (!s || !s.subscription) return false;
      if (!orderId) return true;
      return Array.isArray(s.orderIds) && s.orderIds.includes(String(orderId));
    });

    const result = await sendWebPushToTargets(targets, payload);
    return res.status(200).json({ success: true, ...result });
  } catch (err) {
    console.error('send-order-push error:', err);
    return res.status(500).json({ error: err.message || 'Customer push failed' });
  }
}
