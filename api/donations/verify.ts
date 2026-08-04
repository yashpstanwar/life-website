import crypto from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { safeEqual } from '../_lib/donation.js';

/**
 * Verifies the signature Razorpay's checkout returns to the browser.
 *
 * Skipping this step is how donation sites get defrauded: without it,
 * anyone can POST a fabricated payment id and be shown a valid receipt.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return res.status(503).json({ error: 'payments_not_configured' });

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    razorpay_subscription_id,
  } = (req.body ?? {}) as Record<string, string>;

  if (!razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: 'missing_fields' });
  }

  // One-time: sha256(order_id|payment_id). Subscription: sha256(payment_id|subscription_id).
  const payload = razorpay_subscription_id
    ? `${razorpay_payment_id}|${razorpay_subscription_id}`
    : `${razorpay_order_id}|${razorpay_payment_id}`;

  const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');

  if (!safeEqual(expected, razorpay_signature)) {
    console.warn('Signature mismatch for payment', razorpay_payment_id);
    return res.status(400).json({ verified: false, error: 'signature_mismatch' });
  }

  // Fetch the authoritative payment record so the receipt shows what was
  // actually captured, not what the browser claims was captured.
  let payment: Record<string, unknown> | null = null;
  const auth = `Basic ${Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${secret}`).toString('base64')}`;
  try {
    const r = await fetch(`https://api.razorpay.com/v1/payments/${razorpay_payment_id}`, {
      headers: { Authorization: auth },
    });
    if (r.ok) payment = await r.json();
  } catch (err) {
    console.error('Could not fetch payment record', err);
  }

  const notes = (payment?.notes ?? {}) as Record<string, string>;

  return res.status(200).json({
    verified: true,
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id ?? null,
    amount: payment?.amount ? Number(payment.amount) / 100 : null,
    method: payment?.method ?? null,
    receiptNumber: notes.receipt_number ?? null,
    donorName: notes.anonymous === 'yes' ? 'Anonymous' : notes.donor_name ?? null,
    programme: notes.programme ?? null,
    frequency: notes.frequency ?? 'one-time',
    date: payment?.created_at
      ? new Date(Number(payment.created_at) * 1000).toISOString()
      : new Date().toISOString(),
  });
}
