import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Public runtime config. The browser needs to know whether live payments are
 * switched on yet, and the publishable key id. The key SECRET is never sent.
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const keyId = process.env.RAZORPAY_KEY_ID || null;
  const hasSecret = Boolean(process.env.RAZORPAY_KEY_SECRET);

  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300');
  return res.status(200).json({
    paymentsEnabled: Boolean(keyId && hasSecret),
    keyId,
    mode: keyId?.startsWith('rzp_live') ? 'live' : keyId ? 'test' : 'disabled',
    orgName: 'LIFE (I.I.D.C.)',
  });
}
