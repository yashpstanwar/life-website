export interface PaymentConfig {
  paymentsEnabled: boolean;
  keyId: string | null;
  mode: 'live' | 'test' | 'disabled';
  orgName: string;
}

export interface DonationPayload {
  amount: number;
  frequency: 'one-time' | 'monthly';
  programme: string;
  coverFees: boolean;
  fullName: string;
  email: string;
  mobile: string;
  pan: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  isCitizen: boolean;
  isAnonymous: boolean;
  receiveUpdates: boolean;
}

export interface VerifiedReceipt {
  verified: true;
  paymentId: string;
  orderId: string | null;
  amount: number | null;
  method: string | null;
  receiptNumber: string | null;
  donorName: string | null;
  programme: string | null;
  frequency: string;
  date: string;
}

export class DonationError extends Error {
  fieldErrors: Record<string, string>;
  code: string;
  constructor(message: string, code = 'error', fieldErrors: Record<string, string> = {}) {
    super(message);
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}

let configCache: PaymentConfig | null = null;

export async function getPaymentConfig(): Promise<PaymentConfig> {
  if (configCache) return configCache;
  try {
    const res = await fetch('/api/config');
    if (!res.ok) throw new Error('config unavailable');
    configCache = (await res.json()) as PaymentConfig;
  } catch {
    // Running `vite dev` without the Vercel CLI means /api doesn't exist.
    // Treat that as "payments off" rather than crashing the donate page.
    configCache = { paymentsEnabled: false, keyId: null, mode: 'disabled', orgName: 'LIFE (I.I.D.C.)' };
  }
  return configCache;
}

let scriptPromise: Promise<void> | null = null;

function loadCheckoutScript(): Promise<void> {
  if (typeof window !== 'undefined' && (window as any).Razorpay) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const el = document.createElement('script');
    el.src = 'https://checkout.razorpay.com/v1/checkout.js';
    el.async = true;
    el.onload = () => resolve();
    el.onerror = () => {
      scriptPromise = null;
      reject(new DonationError('Could not load the payment gateway. Check your connection.', 'script_failed'));
    };
    document.body.appendChild(el);
  });

  return scriptPromise;
}

/**
 * Full donation flow: create order server-side, open checkout, verify the
 * signature server-side, and only then resolve with a receipt.
 */
export async function startDonation(payload: DonationPayload): Promise<VerifiedReceipt> {
  const config = await getPaymentConfig();
  if (!config.paymentsEnabled || !config.keyId) {
    throw new DonationError(
      'Online donations are not switched on yet. Please use bank transfer or UPI below.',
      'payments_not_configured',
    );
  }

  const orderRes = await fetch('/api/donations/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const order = await orderRes.json();

  if (!orderRes.ok) {
    if (order?.error === 'validation_failed') {
      throw new DonationError('Please correct the highlighted fields.', 'validation_failed', order.errors ?? {});
    }
    throw new DonationError(order?.message ?? 'Could not start the payment.', order?.error ?? 'error');
  }

  await loadCheckoutScript();

  return new Promise<VerifiedReceipt>((resolve, reject) => {
    const options: Record<string, unknown> = {
      key: config.keyId,
      name: 'LIFE (I.I.D.C.)',
      description: `${payload.frequency === 'monthly' ? 'Monthly' : 'One-time'} donation — ${payload.programme}`,
      image: '/logo-mark.svg',
      prefill: order.prefill,
      notes: { receipt_number: order.receiptNumber },
      theme: { color: '#E39B2C', backdrop_color: '#101C3A' },
      retry: { enabled: false },
      modal: {
        ondismiss: () => reject(new DonationError('Payment was cancelled.', 'cancelled')),
        escape: true,
        confirm_close: true,
      },
      handler: async (response: Record<string, string>) => {
        try {
          const verifyRes = await fetch('/api/donations/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });
          const verified = await verifyRes.json();
          if (!verifyRes.ok || !verified.verified) {
            reject(
              new DonationError(
                'Your payment went through but we could not verify it automatically. Please email us with your payment id and we will confirm your receipt.',
                'verification_failed',
              ),
            );
            return;
          }
          resolve(verified as VerifiedReceipt);
        } catch {
          reject(new DonationError('Could not confirm the payment. Please contact us before retrying.', 'verify_error'));
        }
      },
    };

    if (order.type === 'subscription') {
      options.subscription_id = order.subscriptionId;
    } else {
      options.order_id = order.orderId;
      options.amount = order.amount * 100;
      options.currency = order.currency;
    }

    const rzp = new (window as any).Razorpay(options);
    rzp.on('payment.failed', (resp: any) => {
      reject(new DonationError(resp?.error?.description ?? 'The payment did not go through.', 'payment_failed'));
    });
    rzp.open();
  });
}
