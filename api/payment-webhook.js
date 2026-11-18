import { applyCorsHeaders, readJsonBody } from './_pushStore.js';
import {
  sanitizeOrderId,
  verifyMidtransSignature,
  markOrderPaidAndNotifyAdmin
} from './_paymentGateway.js';

export default async function handler(req, res) {
  applyCorsHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = await readJsonBody(req);

    // 1. Midtrans Webhook Notification
    if (body && body.signature_key && body.order_id) {
      if (!verifyMidtransSignature(body)) {
        return res.status(403).json({ ok: false, error: 'Invalid Midtrans signature' });
      }
      const orderId = sanitizeOrderId(body.order_id);
      const txStatus = String(body.transaction_status || '').toLowerCase();
      const fraudStatus = String(body.fraud_status || '').toLowerCase();
      const isPaid =
        txStatus === 'settlement' || (txStatus === 'capture' && fraudStatus !== 'deny');

      if (isPaid && orderId) {
        await markOrderPaidAndNotifyAdmin(orderId, {
          provider: 'midtrans',
          externalId: body.transaction_id || ''
        });
      }
      return res.status(200).json({ ok: true, provider: 'midtrans', paid: isPaid });
    }

    // 2. Xendit Webhook (eWallet Charge / QR Code / Invoice)
    const expectedToken = String(process.env.XENDIT_CALLBACK_TOKEN || '').trim();
    if (expectedToken) {
      const incomingToken = String(req.headers['x-callback-token'] || '').trim();
      if (incomingToken !== expectedToken) {
        return res.status(403).json({ ok: false, error: 'Invalid Xendit callback token' });
      }
    }

    // Xendit QRIS / eWallet callback wraps payload in `data` or sends top-level Invoice fields
    const eventName = String(body.event || '').toLowerCase();
    const payload = body && body.data && typeof body.data === 'object' ? body.data : body;
    const rawOrderId =
      payload.reference_id || payload.external_id || body.external_id || '';
    const orderId = sanitizeOrderId(rawOrderId);
    const statusUpper = String(payload.status || body.status || '').toUpperCase();

    const isXenditPaid =
      statusUpper === 'SUCCEEDED' ||
      statusUpper === 'PAID' ||
      statusUpper === 'SETTLED' ||
      statusUpper === 'COMPLETED' ||
      eventName === 'qr.payment';

    if (isXenditPaid && orderId) {
      await markOrderPaidAndNotifyAdmin(orderId, {
        provider: 'xendit',
        externalId: payload.id || body.id || ''
      });
    }

    return res.status(200).json({
      ok: true,
      provider: 'xendit',
      orderId,
      paid: isXenditPaid
    });
  } catch (err) {
    console.error('payment-webhook error:', err);
    return res.status(500).json({ ok: false, error: err.message || 'Webhook error' });
  }
}
