import crypto from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { safeEqual } from '../_lib/donation.js';

/**
 * Razorpay webhook receiver — this, not the browser redirect, is the source
 * of truth for whether a donation succeeded. Donors close tabs mid-payment,
 * lose signal, and background their browsers; the webhook still arrives.
 *
 * Signature is computed over the RAW body, so Vercel's JSON body parser is
 * disabled here. Parsing first and re-stringifying will change key order and
 * break verification.
 */
export const config = { api: { bodyParser: false } };

function readRawBody(req: VercelRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    console.error('RAZORPAY_WEBHOOK_SECRET is not set');
    return res.status(503).end();
  }

  const raw = await readRawBody(req);
  const received = String(req.headers['x-razorpay-signature'] ?? '');
  const expected = crypto.createHmac('sha256', secret).update(raw).digest('hex');

  if (!received || !safeEqual(expected, received)) {
    console.warn('Rejected webhook with bad signature');
    return res.status(400).json({ error: 'invalid_signature' });
  }

  let event: any;
  try {
    event = JSON.parse(raw);
  } catch {
    return res.status(400).json({ error: 'invalid_json' });
  }

  const entity = event?.payload?.payment?.entity ?? event?.payload?.subscription?.entity ?? {};
  const notes = entity.notes ?? {};

  const record = {
    event: event.event,
    paymentId: entity.id ?? null,
    orderId: entity.order_id ?? null,
    amountInr: entity.amount ? Number(entity.amount) / 100 : null,
    status: entity.status ?? null,
    method: entity.method ?? null,
    receiptNumber: notes.receipt_number ?? null,
    donorName: notes.donor_name ?? null,
    donorEmail: notes.donor_email ?? null,
    donorPan: notes.donor_pan ?? null,
    programme: notes.programme ?? null,
    receivedAt: new Date().toISOString(),
  };

  switch (event.event) {
    case 'payment.captured':
      console.log('DONATION_CAPTURED', JSON.stringify(record));
      // TODO once a database is connected: persist `record`, generate the 80G
      // receipt PDF, and email it. See docs/schema.sql for the target table.
      break;
    case 'payment.failed':
      console.log('DONATION_FAILED', JSON.stringify(record));
      break;
    case 'subscription.charged':
      console.log('SUBSCRIPTION_CHARGED', JSON.stringify(record));
      break;
    case 'subscription.cancelled':
      console.log('SUBSCRIPTION_CANCELLED', JSON.stringify(record));
      break;
    default:
      console.log('UNHANDLED_WEBHOOK', event.event);
  }

  // Always 200 on a verified event. A non-2xx makes Razorpay retry, and
  // retrying a business-logic failure just produces duplicate log entries.
  return res.status(200).json({ received: true });
}
