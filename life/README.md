# LIFE (I.I.D.C.) — website

React + Vite + Tailwind front end, with Vercel serverless functions handling Razorpay.
Everything below runs on free tiers.

---

## What changed from the Stitch export

| | Before | Now |
|---|---|---|
| Navigation | React state only — one URL for the whole site | Real routes; `/donate` is linkable and shareable |
| Payment | `setTimeout` simulating success | Real Razorpay orders with server-side signature verification |
| Receipt page | Hardcoded ₹1,000 | Reads the verified payment from the server |
| Legal pages | None | Privacy, Terms, Refund — all three required by Razorpay |
| Dev artifacts | A "D4 SPECIFICATION TESTING" panel visible to visitors | Removed |
| SEO | None | Meta tags, Open Graph, JSON-LD, sitemap, robots.txt |
| Accessibility | No focus states or skip link | Skip link, focus rings, reduced-motion support |
| Dependencies | Included `@google/genai`, `express`, `dotenv` unused | Removed |

---

## Part 1 — Run it on your machine

You need [Node.js 20+](https://nodejs.org). Check with `node -v`.

```bash
npm install
npm run dev
```

Open http://localhost:3000. The donate page will show "Online donations opening soon"
because there are no Razorpay keys yet — that is the correct behaviour, not a bug.

To test the `/api` functions locally you need the Vercel CLI instead:

```bash
npm i -g vercel
vercel dev
```

---

## Part 2 — Push to GitHub

1. Create an account at [github.com](https://github.com) if you don't have one.
2. Create a new repository — name it `life-website`, set it to **Private**, and do
   **not** tick "Add a README".
3. In this folder, run:

```bash
git init
git add .
git commit -m "LIFE website: initial version"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/life-website.git
git push -u origin main
```

If GitHub asks for a password, it wants a Personal Access Token, not your login
password: GitHub → Settings → Developer settings → Personal access tokens → Tokens
(classic) → Generate new token, tick `repo`, copy it, paste it as the password.

**Never commit `.env`.** It is already in `.gitignore`. If a secret key ever reaches
GitHub, treat it as compromised and regenerate it in Razorpay immediately.

---

## Part 3 — Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up **with your GitHub account**.
2. Click **Add New → Project**, and import `life-website`.
3. Vercel will detect Vite automatically. Leave the build settings alone.
4. Click **Deploy**. About a minute later you'll have a live URL like
   `life-website.vercel.app`.

Every `git push` from now on redeploys automatically. Pushing to a branch other than
`main` gives you a preview URL, which is the safe way to test changes.

---

## Part 4 — Connect your domain

1. In Vercel: your project → **Settings → Domains → Add**.
2. Enter your domain (both `yourdomain.org` and `www.yourdomain.org`).
3. Vercel shows you DNS records. In your registrar's DNS panel, add them:
   - Root domain: an **A record** pointing to `76.76.21.21`
   - `www`: a **CNAME** pointing to `cname.vercel-dns.com`
4. Wait for propagation — usually minutes, occasionally a few hours. Vercel issues
   the HTTPS certificate automatically once DNS resolves.

Then find-and-replace `REPLACE-WITH-YOUR-DOMAIN` across `index.html`,
`public/robots.txt` and `public/sitemap.xml`, and push again.

---

## Part 5 — Razorpay

### 5a. Before you apply

Have these ready. Approval is the slow part, not the code:

- Society registration certificate
- PAN card of the society (not your personal PAN)
- 12A and 80G certificates
- Cancelled cheque or bank statement for an account **in the society's name**
- Address proof for the registered office
- The website live at your domain, with Privacy, Terms, Refund and Contact pages
  reachable — Razorpay's reviewers check this, and it is a common rejection reason.
  Those four pages are already built at `/privacy`, `/terms`, `/refund-policy`
  and `/contact`.

Apply at [razorpay.com](https://razorpay.com) and ask for the **NGO / donations**
category, which generally attracts lower fees than standard e-commerce.

### 5b. Get your keys

Razorpay Dashboard → Settings → API Keys → Generate. You get a Key Id
(`rzp_test_…` or `rzp_live_…`) and a Key Secret shown **once**. Copy both.

Start in **Test Mode**. Test card: `4111 1111 1111 1111`, any future expiry, any CVV.

### 5c. Add them to Vercel

Project → Settings → Environment Variables. Add each for all environments:

| Name | Value |
|---|---|
| `RAZORPAY_KEY_ID` | your key id |
| `RAZORPAY_KEY_SECRET` | your key secret |
| `RAZORPAY_WEBHOOK_SECRET` | a long random string you invent |

Redeploy after adding them (Deployments → ⋯ → Redeploy). Environment variables are
only read at build and runtime, so an existing deployment won't pick them up.

The donate page switches from "opening soon" to a live pay button the moment
`RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are both present. Nothing else to change.

### 5d. Set up the webhook

Razorpay Dashboard → Settings → Webhooks → Add New Webhook:

- URL: `https://yourdomain.org/api/webhooks/razorpay`
- Secret: the exact same string you set as `RAZORPAY_WEBHOOK_SECRET`
- Events: `payment.captured`, `payment.failed`, `subscription.charged`,
  `subscription.cancelled`

The webhook — not the browser redirect — is the source of truth for whether a
donation succeeded. Donors close tabs mid-payment; the webhook still arrives.

### 5e. Monthly giving (optional, later)

Razorpay Dashboard → Subscriptions → Plans. Create a monthly plan per amount, then
add the plan ids to Vercel as `RAZORPAY_PLAN_MONTHLY_500`,
`RAZORPAY_PLAN_MONTHLY_1000` and so on. Until you do, monthly gifts are processed as
one-time payments rather than failing.

---

## Part 6 — Before you go live

- [ ] Replace every `[placeholder]` — search the codebase for the string. They are
      concentrated in `src/data.ts`, `src/components/Footer.tsx` and
      `src/pages/LegalPage.tsx`.
- [ ] Fill in the real registration number, 12A and 80G numbers in the footer.
- [ ] Decide the impact-strip figures on the home page. **They currently read `[0]`.**
      If you can't evidence a number, delete the tile rather than estimating.
- [ ] Have your CA read `/privacy`, `/terms` and `/refund-policy`.
- [ ] Replace the placeholder programme photographs.
- [ ] Add real bank / UPI details in the donate page's "Other ways to give" panel.
- [ ] Switch Razorpay from Test to Live keys, and make one real ₹100 donation to
      yourself end to end before announcing the site.

---

## Where things live

```
api/
  config.ts                  tells the browser whether payments are switched on
  donations/create-order.ts  validates the gift server-side, creates the order
  donations/verify.ts        HMAC signature verification — the anti-fraud step
  webhooks/razorpay.ts       source of truth for completed payments
  _lib/donation.ts           validation rules, receipt numbering, 80G logic
src/
  App.tsx                    routes
  lib/payments.ts            checkout flow in the browser
  pages/                     one file per screen
  data.ts                    all site content — edit here, not in the components
docs/schema.sql              database schema for when you outgrow Razorpay's export
```

To change wording, programme descriptions, courses or research listings, edit
`src/data.ts`. You should not need to touch the page components for content edits.

---

## Cost

| | Free tier | When you'd pay |
|---|---|---|
| GitHub | Unlimited private repos | Never, at this scale |
| Vercel Hobby | 100 GB bandwidth/month | Well beyond an NGO site's traffic |
| Razorpay | No monthly fee | Roughly 2% + GST per transaction |
| Domain | — | You already have one |

Vercel's Hobby tier is intended for non-commercial use. A registered non-profit
accepting donations sits inside that, but if Vercel ever queries it, Pro is
$20/month.
