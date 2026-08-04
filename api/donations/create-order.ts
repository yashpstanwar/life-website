import type { VercelRequest, VercelResponse } from '@vercel/node';
import { validateDonation, toRazorpayNotes, razorpayAuthHeader } from '../_lib/donation.js';

/**
 * Creates a Razorpay order. The amount is taken from THIS function's
 * validation, never from the request body as-is, so a tampered client
 * cannot open a ₹1 checkout for a ₹5,000 receipt.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const auth = razorpayAuthHeader();
  if (!auth) {
    return res.status(503).json({
      error: 'payments_not_configured',
      message: 'Online donations are not enabled yet. Please use bank transfer or UPI.',
    });
  }

  const result = validateDonation(req.body);
  if (!result.ok || !result.value) {
    return res.status(400).json({ error: 'validation_failed', errors: result.errors });
  }

  const donation = result.value;

  // Monthly giving uses the Subscriptions API, which needs plans created in
  // the Razorpay dashboard first. Until RAZORPAY_PLAN_MONTHLY_<amount> is set,
  // fall back to a one-time order rather than failing the donor's gift.
  const planId = process.env[`RAZORPAY_PLAN_MONTHLY_${donation.amount}`];
  if (donation.frequency === 'monthly' && planId) {
    const subRes = await fetch('https://api.razorpay.com/v1/subscriptions', {
      method: 'POST',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan_id: planId,
        total_count: 120,
        quantity: 1,
        customer_notify: 1,
        notes: toRazorpayNotes(donation),
      }),
    });
    const sub = await subRes.json();
    if (!subRes.ok) {
      return res.status(502).json({ error: 'razorpay_error', message: sub?.error?.description });
    }
    return res.status(200).json({
      type: 'subscription',
      subscriptionId: sub.id,
      amount: donation.amount,
      receiptNumber: donation.receiptNumber,
      prefill: { name: donation.fullName, email: donation.email, contact: donation.mobile },
    });
  }

  const orderRes = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: { Authorization: auth, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: donation.amount * 100, // paise
      currency: 'INR',
      receipt: donation.receiptNumber,
      notes: toRazorpayNotes(donation),
    }),
  });

  const order = await orderRes.json();
  if (!orderRes.ok) {
    console.error('Razorpay order creation failed', order);
    return res.status(502).json({
      error: 'razorpay_error',
      message: order?.error?.description || 'Could not reach the payment gateway.',
    });
  }

  return res.status(200).json({
    type: 'order',
    orderId: order.id,
    amount: donation.amount,
    currency: 'INR',
    receiptNumber: donation.receiptNumber,
    prefill: { name: donation.fullName, email: donation.email, contact: donation.mobile },
  });
}
