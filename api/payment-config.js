import { applyCorsHeaders } from './_pushStore.js';
import { getGatewayRuntimeConfig } from './_paymentGateway.js';

export default async function handler(req, res) {
  applyCorsHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const cfg = getGatewayRuntimeConfig();
  return res.status(200).json({
    ok: true,
    ...cfg
  });
}
