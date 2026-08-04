import crypto from 'node:crypto';

/**
 * Server-side donation validation and record shaping.
 *
 * Nothing here trusts the browser. The amount, the programme and the
 * donor fields are all re-validated before an order is created, because
 * the client can send anything it likes.
 */

export const MIN_AMOUNT_INR = 100;
export const MAX_AMOUNT_INR = 500000;

export const PROGRAMMES = [
  'Development Communication',
  'Research & Evaluation',
  'Training & Institute',
  'Education & Literacy',
  "Women's Empowerment",
  'Health & Social Reform',
  "Where it's needed most",
] as const;

export type Programme = (typeof PROGRAMMES)[number];
export type Frequency = 'one-time' | 'monthly';

export interface DonationInput {
  amount: number;
  frequency: Frequency;
  programme: string;
  coverFees?: boolean;
  fullName: string;
  email: string;
  mobile: string;
  pan?: string;
  address?: string;
  city?: string;
  state?: string;
  pinCode?: string;
  isCitizen: boolean;
  isAnonymous?: boolean;
  receiveUpdates?: boolean;
}

export interface ValidationResult {
  ok: boolean;
  errors: Record<string, string>;
  value?: Required<Pick<DonationInput, 'amount' | 'frequency' | 'fullName' | 'email' | 'mobile'>> &
    DonationInput & { receiptNumber: string };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MOBILE_RE = /^[6-9]\d{9}$/;
const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const PIN_RE = /^\d{6}$/;

/** Receipt numbers must be unique and sequential-ish for Form 10BD filing. */
export function generateReceiptNumber(): string {
  const now = new Date();
  const fy = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
  const fyLabel = `${String(fy).slice(2)}${String(fy + 1).slice(2)}`;
  const rand = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `LIFE/${fyLabel}/${rand}`;
}

export function validateDonation(raw: unknown): ValidationResult {
  const errors: Record<string, string> = {};
  const body = (raw ?? {}) as Record<string, unknown>;

  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || !Number.isInteger(amount)) {
    errors.amount = 'Amount must be a whole number of rupees.';
  } else if (amount < MIN_AMOUNT_INR) {
    errors.amount = `Minimum donation is ₹${MIN_AMOUNT_INR}.`;
  } else if (amount > MAX_AMOUNT_INR) {
    errors.amount = `For gifts above ₹${MAX_AMOUNT_INR.toLocaleString('en-IN')}, please contact us directly.`;
  }

  const frequency = String(body.frequency ?? 'one-time');
  if (frequency !== 'one-time' && frequency !== 'monthly') {
    errors.frequency = 'Invalid frequency.';
  }

  const programme = String(body.programme ?? '');
  if (!PROGRAMMES.includes(programme as Programme)) {
    errors.programme = 'Select a valid programme.';
  }

  const fullName = String(body.fullName ?? '').trim();
  if (fullName.length < 2) errors.fullName = 'Enter your full name.';
  if (fullName.length > 120) errors.fullName = 'Name is too long.';

  const email = String(body.email ?? '').trim().toLowerCase();
  if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.';

  const mobile = String(body.mobile ?? '').replace(/\D/g, '').slice(-10);
  if (!MOBILE_RE.test(mobile)) errors.mobile = 'Enter a valid 10-digit Indian mobile number.';

  const pan = String(body.pan ?? '').trim().toUpperCase();
  if (pan && !PAN_RE.test(pan)) {
    errors.pan = 'Enter a valid 10-character PAN.';
  }
  // Without PAN we cannot report the donor in Form 10BD, so 80G is not claimable.
  if (!pan && amount >= 2000) {
    errors.pan = 'PAN is required to issue an 80G receipt for gifts of ₹2,000 and above.';
  }

  const pinCode = String(body.pinCode ?? '').trim();
  if (pinCode && !PIN_RE.test(pinCode)) errors.pinCode = 'Enter a valid 6-digit PIN code.';

  // FCRA: foreign contributions require separate registration and a designated
  // SBI New Delhi account. Until LIFE holds one, only resident gifts are accepted.
  if (body.isCitizen !== true) {
    errors.isCitizen = 'LIFE can currently accept donations from Indian citizens and residents only.';
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const coverFees = body.coverFees === true;
  const finalAmount = coverFees ? Math.round(amount * 1.02) : amount;

  return {
    ok: true,
    errors: {},
    value: {
      amount: finalAmount,
      frequency: frequency as Frequency,
      programme,
      coverFees,
      fullName,
      email,
      mobile,
      pan,
      address: String(body.address ?? '').trim().slice(0, 240),
      city: String(body.city ?? '').trim().slice(0, 80),
      state: String(body.state ?? '').trim().slice(0, 80),
      pinCode,
      isCitizen: true,
      isAnonymous: body.isAnonymous === true,
      receiveUpdates: body.receiveUpdates === true,
      receiptNumber: generateReceiptNumber(),
    },
  };
}

/**
 * Razorpay `notes` are capped at 15 keys and 256 chars per value, and they
 * come back on every webhook and dashboard export — which makes them a
 * serviceable donation ledger before a real database exists.
 */
export function toRazorpayNotes(d: NonNullable<ValidationResult['value']>) {
  return {
    receipt_number: d.receiptNumber,
    donor_name: d.fullName.slice(0, 250),
    donor_email: d.email.slice(0, 250),
    donor_mobile: d.mobile,
    donor_pan: d.pan || 'NOT_PROVIDED',
    programme: d.programme,
    frequency: d.frequency,
    address: `${d.address}, ${d.city}, ${d.state} ${d.pinCode}`.slice(0, 250),
    anonymous: d.isAnonymous ? 'yes' : 'no',
    consent_updates: d.receiveUpdates ? 'yes' : 'no',
    fees_covered: d.coverFees ? 'yes' : 'no',
    citizen_declaration: 'indian_resident',
  };
}

export function razorpayAuthHeader(): string | null {
  const id = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!id || !secret) return null;
  return `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`;
}

/** Constant-time comparison — a plain === here is a timing oracle. */
export function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}
