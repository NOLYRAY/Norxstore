import { getVapidPublicKey, applyCorsHeaders } from './_pushStore.js';

export default async function handler(req, res) {
  applyCorsHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ publicKey: getVapidPublicKey() });
}
