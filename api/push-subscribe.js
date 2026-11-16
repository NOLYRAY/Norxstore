import { upsertSubscription, getAllSubscriptionsMap, applyCorsHeaders, readJsonBody } from './_pushStore.js';

export default async function handler(req, res) {
  applyCorsHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = await readJsonBody(req);
    const { subscription, orderIds, deviceId, isAdmin } = body || {};
    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ error: 'Invalid subscription' });
    }
    const saved = await upsertSubscription({ subscription, orderIds, deviceId, isAdmin });
    const allMap = await getAllSubscriptionsMap();
    return res.status(200).json({
      success: true,
      key: saved.key,
      isAdmin: saved.isAdmin,
      count: Object.keys(allMap).length
    });
  } catch (err) {
    console.error('push-subscribe error:', err);
    return res.status(500).json({ error: err.message || 'Subscribe failed' });
  }
}
