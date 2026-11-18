import { applyCorsHeaders } from './_pushStore.js';
import {
  sanitizeOrderId,
  fetchRtdbOrder,
  queryMidtransOrderStatus,
  queryXenditEwalletStatus,
  markOrderPaidAndNotifyAdmin
} from './_paymentGateway.js';

export default async function handler(req, res) {
  applyCorsHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const orderId = sanitizeOrderId(req.query && req.query.orderId);
    if (!orderId) {
      return res.status(400).json({ ok: false, error: 'Missing orderId' });
    }

    const ord = await fetchRtdbOrder(orderId);
    if (!ord) {
      return res.status(404).json({ ok: false, error: 'Order not found' });
    }

    if (ord.gatewayPaid === true || ord.status === 'done' || ord.status === 'selesai') {
      return res.status(200).json({
        ok: true,
        paid: true,
        status: ord.status,
        gatewayStatus: 'PAID',
        provider: ord.gatewayProvider || ''
      });
    }

    // Active status verification fallback when webhook hasn't arrived yet
    if (ord.gatewayProvider === 'midtrans') {
      const mStatus = await queryMidtransOrderStatus(ord.gatewayOrderId || orderId);
      const txStatus = String((mStatus && mStatus.transaction_status) || '').toLowerCase();
      const fraudStatus = String((mStatus && mStatus.fraud_status) || '').toLowerCase();
      const isPaid =
        txStatus === 'settlement' || (txStatus === 'capture' && fraudStatus !== 'deny');
      if (isPaid) {
        await markOrderPaidAndNotifyAdmin(orderId, {
          provider: 'midtrans',
          externalId: mStatus.transaction_id || ''
        });
        return res.status(200).json({
          ok: true,
          paid: true,
          status: 'processing',
          gatewayStatus: 'PAID',
          provider: 'midtrans'
        });
      }
    } else if (ord.gatewayProvider === 'xendit' && ord.gatewayExternalId && String(ord.gatewayExternalId).startsWith('ewc_')) {
      const xStatus = await queryXenditEwalletStatus(ord.gatewayExternalId);
      if (xStatus && String(xStatus.status || '').toUpperCase() === 'SUCCEEDED') {
        await markOrderPaidAndNotifyAdmin(orderId, {
          provider: 'xendit',
          externalId: xStatus.id || ord.gatewayExternalId
        });
        return res.status(200).json({
          ok: true,
          paid: true,
          status: 'processing',
          gatewayStatus: 'PAID',
          provider: 'xendit'
        });
      }
    }

    return res.status(200).json({
      ok: true,
      paid: false,
      status: ord.status || 'pending',
      gatewayStatus: ord.gatewayStatus || 'PENDING',
      provider: ord.gatewayProvider || ''
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message || 'Status check failed' });
  }
}
