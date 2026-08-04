import React from 'react';

type Doc = 'privacy' | 'terms' | 'refund';

interface Section {
  heading: string;
  body: string[];
}

interface LegalDoc {
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
}

/**
 * Razorpay will not activate a merchant account until a privacy policy,
 * terms of service, refund policy and contact page are publicly reachable
 * on the registered domain. These are drafted for an Indian registered
 * society accepting 80G-eligible donations.
 *
 * Have the trustees or your CA read these through before launch — they are a
 * working draft, not legal advice.
 */
const DOCS: Record<Doc, LegalDoc> = {
  privacy: {
    title: 'Privacy Policy',
    updated: '5 August 2026',
    intro:
      'LIFE, the Indian Institute of Development and Communication (I.I.D.C.), a society registered in Jaipur, Rajasthan, collects personal information only where it is needed to deliver our programmes, issue tax receipts, and meet our statutory reporting duties.',
    sections: [
      {
        heading: 'What we collect',
        body: [
          'When you donate: your name, email address, mobile number, postal address and PAN. PAN is collected because the Income Tax Department requires it for donations reported under Section 80G.',
          'When you apply to volunteer, intern, or train with us: your name, contact details, organisation and the information you enter in the application form.',
          'When you contact us: whatever you choose to include in your message.',
          'We do not collect card numbers, UPI credentials, bank credentials or CVVs at any point. Payment details are entered directly into Razorpay\u2019s hosted checkout and are never transmitted to or stored on our servers.',
        ],
      },
      {
        heading: 'How we use it',
        body: [
          'To process your donation and issue an 80G receipt.',
          'To file the annual statement of donations (Form 10BD) and issue donor certificates (Form 10BE) as required by the Income Tax Act.',
          'To respond to your enquiry or application.',
          'To send you programme updates, only if you explicitly opted in. Every email carries an unsubscribe link.',
        ],
      },
      {
        heading: 'Who we share it with',
        body: [
          'Razorpay Software Private Limited, our payment processor, receives the details necessary to process your transaction.',
          'The Income Tax Department, in the statutory filings described above.',
          'Our statutory auditors, under confidentiality.',
          'We do not sell, rent or trade donor information. We do not share it with any political party, candidate or affiliated body.',
        ],
      },
      {
        heading: 'How long we keep it',
        body: [
          'Donation records are retained for at least eight financial years, as required for income tax assessment and audit. Enquiry and application records are retained for three years and then deleted.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'You may ask us for a copy of the information we hold about you, ask us to correct it, ask us to stop contacting you, or ask us to delete it where we are not legally required to retain it. Write to lifengo.org@gmail.com and we will respond within 30 days.',
          'Donating anonymously is supported: tick the anonymous option and your name will be withheld from all published donor lists, though we must still retain it in our statutory records.',
        ],
      },
      {
        heading: 'Cookies',
        body: [
          'This website sets no advertising or tracking cookies. Your language preference is stored locally in your browser and is never transmitted to us.',
        ],
      },
      {
        heading: 'Contact',
        body: [
          'Indian Institute of Development and Communication (I.I.D.C.), 19, Shri Ram Nagar-B, Kanta, Jhotwara, Jaipur, Rajasthan 302012. Email lifengo.org@gmail.com. Phone +91 70147 78387.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    updated: '5 August 2026',
    intro:
      'These terms govern your use of this website and any donation you make through it. By using the site you accept them.',
    sections: [
      {
        heading: 'About us',
        body: [
          'This site is operated by the Indian Institute of Development and Communication (I.I.D.C.), operating publicly as LIFE, a society registered under the Rajasthan Societies Registration Act, with its registered office at 19, Shri Ram Nagar-B, Kanta, Jhotwara, Jaipur, Rajasthan 302012.',
        ],
      },
      {
        heading: 'Donations',
        body: [
          'All donations are voluntary and are made in Indian Rupees. A donation is not a purchase and confers no goods, services, membership or entitlement.',
          'We accept donations only from Indian citizens and residents. LIFE does not currently hold registration under the Foreign Contribution (Regulation) Act, and cannot accept foreign contributions.',
          'Donations are applied to the programme you designate where practicable. Where a designated programme is fully funded or discontinued, we will apply your gift to the closest related work.',
          'Tax exemption under Section 80G is available subject to our registration remaining valid and to your furnishing a correct PAN. We issue receipts electronically.',
        ],
      },
      {
        heading: 'Payments',
        body: [
          'Payments are processed by Razorpay. Your use of the checkout is additionally subject to Razorpay\u2019s own terms. We are not liable for failures, delays or errors originating with the payment gateway, your bank or your card issuer.',
          'You are responsible for the accuracy of the details you enter. A donation made with incorrect details may delay or prevent issuance of your receipt.',
        ],
      },
      {
        heading: 'Use of this site',
        body: [
          'You may not attempt to gain unauthorised access to the site, interfere with its operation, or use it to transmit unlawful or harmful material.',
          'Content on this site, including text, photographs and reports, belongs to LIFE unless stated otherwise. You may quote and share it with attribution; you may not present it as your own or use it commercially without written permission.',
        ],
      },
      {
        heading: 'Accuracy',
        body: [
          'We take care to keep programme information and published figures accurate, but the site is provided as-is. Statistics and reports are correct as at the date stated on them.',
        ],
      },
      {
        heading: 'Governing law',
        body: [
          'These terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of the courts at Jaipur, Rajasthan.',
        ],
      },
    ],
  },
  refund: {
    title: 'Refund & Cancellation Policy',
    updated: '5 August 2026',
    intro:
      'Donations to LIFE are voluntary contributions and are generally non-refundable, because funds are committed to programme work shortly after receipt. We recognise that genuine mistakes happen, and we handle them as set out below.',
    sections: [
      {
        heading: 'When we will refund',
        body: [
          'A duplicate transaction caused by a technical error or a repeated submission.',
          'An amount entered in error — for example ₹50,000 instead of ₹5,000 — where you notify us promptly.',
          'A transaction you did not authorise.',
          'A transaction that was debited from your account but not received by us.',
        ],
      },
      {
        heading: 'How to request one',
        body: [
          'Email lifengo.org@gmail.com within 7 days of the transaction with your payment id, the date, the amount and a short explanation. We will acknowledge within 3 working days.',
          'Approved refunds are returned to the original payment method within 7 to 10 working days. The timing of the credit reaching your account depends on your bank.',
        ],
      },
      {
        heading: 'When we cannot refund',
        body: [
          'Where an 80G receipt has already been issued and the corresponding donation has been reported to the Income Tax Department in Form 10BD, a refund is not possible, because the statutory filing cannot be reversed. Contact us before your receipt is filed if you believe there is an error.',
          'A change of mind after the funds have been committed to programme expenditure.',
        ],
      },
      {
        heading: 'Cancelling monthly giving',
        body: [
          'Monthly donations can be cancelled at any time and take effect before the next scheduled deduction. Email lifengo.org@gmail.com or use the cancellation link in your Razorpay subscription confirmation. Cancellation stops future deductions; it does not refund past ones.',
        ],
      },
      {
        heading: 'Contact',
        body: ['Email lifengo.org@gmail.com · Phone +91 70147 78387 · Jaipur, Rajasthan.'],
      },
    ],
  },
};

export const LegalPage: React.FC<{ doc: Doc }> = ({ doc }) => {
  const content = DOCS[doc];

  return (
    <div className="w-full bg-[#EFEDE6]">
      <section className="bg-[#101C3A] text-[#EFEDE6] px-4 sm:px-8 py-16">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="font-mono text-xs uppercase tracking-widest text-[#8E9BB5]">Legal</div>
          <h1 className="font-fraunces text-4xl sm:text-5xl font-bold">{content.title}</h1>
          <div className="font-mono text-xs text-[#8E9BB5]">LAST UPDATED — {content.updated}</div>
        </div>
      </section>

      <section className="px-4 sm:px-8 py-14">
        <article className="max-w-[680px] mx-auto space-y-10">
          <p className="text-lg leading-relaxed text-[#14160F]">{content.intro}</p>

          {content.sections.map((section) => (
            <div key={section.heading} className="space-y-4">
              <h2 className="font-fraunces text-2xl font-bold text-[#101C3A] border-b border-[#8E9BB5]/25 pb-2">
                {section.heading}
              </h2>
              {section.body.map((para, i) => (
                <p key={i} className="text-[#14160F]/85 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          ))}


        </article>
      </section>
    </div>
  );
};
