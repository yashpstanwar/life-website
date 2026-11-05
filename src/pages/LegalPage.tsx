import React, { useState } from 'react';
import { ShieldCheck, FileText, ArrowLeft, ExternalLink } from 'lucide-react';
import { ORG } from '../data';

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

const DOCS: Record<Doc, LegalDoc> = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'October 2026',
    intro:
      'LIFE, the Indian Institute of Development and Communication (I.I.D.C.), a registered non-profit society in Jaipur, Rajasthan, collects personal information solely to deliver our social development programmes, issue statutory 80G tax receipts, and meet statutory regulatory compliance under Indian Law.',
    sections: [
      {
        heading: '1. What Information We Collect',
        body: [
          'When you donate: your full name, email address, mobile telephone number, postal address, and Permanent Account Number (PAN). PAN is mandated by the Income Tax Department of India for all donations claimed under Section 80G.',
          'When you apply to volunteer or train: your contact details, education, organizational affiliation, and relevant skills.',
          'When you contact our helpline: details you voluntarily provide in correspondence.',
          'We DO NOT store or process payment card numbers, UPI PINs, or banking passwords. All financial transactions are securely processed via 256-bit SSL encrypted PCI-DSS Level 1 certified gateways (Razorpay).',
        ],
      },
      {
        heading: '2. How Your Data Is Utilized',
        body: [
          'To generate, authenticate, and email your official 80G tax exemption receipt.',
          'To file statutory annual statements of donations (Form 10BD) with the Income Tax Department to ensure automatic credit in your AIS / Form 26AS.',
          'To communicate field impact reports and dispatches if you have opted in.',
          'We strictly never sell, rent, monetize, or trade donor records with any commercial or political entity.',
        ],
      },
      {
        heading: '3. Data Security & Storage',
        body: [
          'Data is stored on encrypted, access-restricted institutional databases adhering to Indian information technology regulations.',
          'You may request review or deletion of non-statutory communication records at any time by writing to our Jaipur secretariat.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    updated: 'October 2026',
    intro:
      'These terms govern your use of the website of the Indian Institute of Development and Communication (I.I.D.C. / LIFE). By browsing, applying, or donating, you accept these terms in full.',
    sections: [
      {
        heading: '1. Institutional Identity',
        body: [
          'LIFE is the registered operational identity of the Indian Institute of Development and Communication (I.I.D.C.), a society registered under the Rajasthan Societies Registration Act, 1958 (Registration No. 78/Jaipur/1994-95).',
          'Headquarters: 19, Shri Ram Nagar-B, Kanta, Jhotwara, Jaipur, Rajasthan 302012, India.',
        ],
      },
      {
        heading: '2. Charitable Contributions',
        body: [
          'All donations are voluntary, non-refundable gifts toward charitable social development, public health awareness, literacy promotion, and women empowerment.',
          'Donations are accepted from Indian bank accounts and domestic payment modes in Indian Rupees (INR).',
          'Donors are issued official 80G tax exemption certificates in accordance with Section 80G(5)(vi) of the Income Tax Act, 1961.',
        ],
      },
      {
        heading: '3. Intellectual Property & Research Materials',
        body: [
          'Audio spots, research surveys, training handbooks, and visual content created by LIFE are protected under non-profit copyright. Educational fair use is permitted with explicit credit attribution to LIFE (I.I.D.C.) Jaipur.',
        ],
      },
    ],
  },
  refund: {
    title: 'Refund & Cancellation Policy',
    updated: 'October 2026',
    intro:
      'As a registered charitable institution relying on voluntary contributions to fund immediate field operations in desert villages, we uphold clear guidelines regarding donation adjustments.',
    sections: [
      {
        heading: '1. Charitable Contributions',
        body: [
          'Under standard circumstances, donations made to charitable societies are voluntary contributions and non-refundable once deployed into field programs.',
          'If an accidental duplicate transaction occurs due to gateway network interruptions or banking errors, please contact us within 7 days at lifengo.org@gmail.com with your transaction reference (UTR) and payment screenshot.',
          'Verified duplicate deductions are refunded to the originating source account within 5 to 7 business banking days.',
        ],
      },
      {
        heading: '2. Recurring Sustainer Cancellations',
        body: [
          'Monthly sustainer contributions can be paused, modified, or cancelled at any time by notifying our donor desk prior to the next billing cycle.',
        ],
      },
      {
        heading: '3. Grievance Contact',
        body: [
          'For any assistance with payment reconciliation or 80G receipt queries, reach out to our Jaipur Accounts Desk at lifengo.org@gmail.com or call +91 70147 78387.',
        ],
      },
    ],
  },
};

export const LegalPage: React.FC<{ doc?: Doc }> = ({ doc: initialDoc = 'privacy' }) => {
  const [activeDoc, setActiveDoc] = useState<Doc>(initialDoc);
  const current = DOCS[activeDoc];

  return (
    <div className="w-full bg-stone-50 text-slate-900 pb-24">
      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/20 inline-block">
            Compliance & Policies
          </span>
          <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-white">
            {current.title}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Last Updated: {current.updated} • Indian Institute of Development and Communication
          </p>
        </div>
      </section>

      {/* Tabs & Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Document Switcher Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
          {(['privacy', 'terms', 'refund'] as const).map((d) => (
            <button
              key={d}
              onClick={() => setActiveDoc(d)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeDoc === d
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {DOCS[d].title}
            </button>
          ))}
        </div>

        {/* Policy Body */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-8">
          <p className="font-serif-display text-base sm:text-lg text-slate-800 leading-relaxed border-b border-slate-100 pb-6">
            {current.intro}
          </p>

          <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
            {current.sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="font-serif-display text-lg sm:text-xl font-bold text-slate-900">
                  {section.heading}
                </h3>
                <div className="space-y-2">
                  {section.body.map((para, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <span>Registered Office: {ORG.addressOneLine}</span>
            <a href={`mailto:${ORG.email}`} className="text-amber-800 font-semibold hover:underline">
              Questions? Contact {ORG.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
