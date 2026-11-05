import React, { useState } from 'react';
import { PageId, Language } from '../types';
import { PILLARS, ORG } from '../data';
import { Heart, ShieldCheck, Mail, Phone, MapPin, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  language: Language;
  onToggleLanguage: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  language,
  onToggleLanguage
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes('@')) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* 100% Transparency Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base">
                {language === 'en' ? 'Our 100% Grassroots Promise' : 'हमारा 100% धरातलीय संकल्प'}
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
                {language === 'en'
                  ? '88% of your donation directly funds rural audio caravans, literacy kits, and frontline health workers. All gifts receive an official 80G tax certificate.'
                  : 'आपके दान का 88% सीधे ग्रामीण ऑडियो अभियानों, साक्षरता किटों और फील्ड कार्यकर्ताओं तक पहुँचता है। सभी दानों पर 80G कर छूट प्रमाणपत्र जारी किया जाता है।'}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('donate')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-md shadow-amber-500/10 transition-all shrink-0 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-slate-950" />
            <span>{language === 'en' ? 'Support Our Cause' : 'सहयोग प्रदान करें'}</span>
          </button>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold text-lg shadow-md">
                L
              </div>
              <div>
                <span className="font-serif-display text-2xl font-bold text-white tracking-tight">
                  LIFE
                </span>
                <span className="block text-xs text-slate-400">
                  {ORG.registeredName}
                </span>
              </div>
            </div>

            <p className="font-serif-display text-lg text-slate-200 italic leading-snug">
              &ldquo;{language === 'en' ? ORG.motto : ORG.mottoHi}&rdquo;
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A registered non-profit society (Estd. 1994, Jaipur) dedicated to eradicating information poverty and bringing vital welfare schemes, education, and healthcare to Rajasthan's most vulnerable desert communities.
            </p>

            {/* Registration Metadata Chips */}
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-slate-400">
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">
                {ORG.registrationNumber}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400 font-medium">
                80G & 12A Certified
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">
                NITI Aayog: {ORG.nitiAayogId}
              </span>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-3 max-w-md">
              <span className="block text-xs font-semibold text-slate-300 mb-2">
                Subscribe to Grassroots Field Dispatches
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Thank you! You are subscribed to our monthly impact reports.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 text-white text-xs rounded-lg px-3.5 py-2.5 focus:outline-hidden focus:border-amber-500 placeholder:text-slate-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors shrink-0 cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 3: Focus Pillars */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              {language === 'en' ? 'Core Pillars' : 'प्रमुख कार्यक्षेत्र'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              {PILLARS.map((pillar) => (
                <li key={pillar.id}>
                  <button
                    onClick={() => onNavigate('work')}
                    className="text-slate-400 hover:text-amber-400 transition-colors text-left"
                  >
                    {language === 'en' ? pillar.title : pillar.titleHi}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => onNavigate('training')}
                  className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1"
                >
                  <span>Master Training Institute</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Navigation */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              {language === 'en' ? 'Quick Links' : 'त्वरित लिंक'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">
                  {language === 'en' ? 'Our 30-Year History' : 'हमारा ३० वर्षों का सफर'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('get-involved')} className="hover:text-amber-400 transition-colors">
                  {language === 'en' ? 'Volunteer Opportunities' : 'स्वयंसेवक बनें'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('get-involved')} className="hover:text-amber-400 transition-colors">
                  {language === 'en' ? 'Corporate CSR Partnerships' : 'सीएसआर भागीदारी'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('donate')} className="hover:text-amber-400 transition-colors">
                  {language === 'en' ? '80G Tax Exemption Guide' : '80G आयकर छूट विवरण'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('legal')} className="hover:text-amber-400 transition-colors">
                  {language === 'en' ? 'Transparency & Legal' : 'पारदर्शिता व नीतियां'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-amber-400 transition-colors">
                  {language === 'en' ? 'Grievance & Contact' : 'शिकायत एवं संपर्क'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Headquarters & Contact */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              {language === 'en' ? 'Head Office' : 'मुख्यालय'}
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed">
                  {ORG.addressLines[0]}<br />
                  {ORG.addressLines[1]}
                </address>
              </div>

              <div className="space-y-1.5 pt-1">
                {ORG.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-2 hover:text-amber-400 transition-colors font-mono text-[11px]"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>{phone}</span>
                  </a>
                ))}
              </div>

              <a
                href={`mailto:${ORG.email}`}
                className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors pt-1"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{ORG.email}</span>
              </a>

              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=19+Shri+Ram+Nagar-B+Kanta+Jhotwara+Jaipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors text-xs font-medium"
                >
                  <span>View on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="mt-14 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 1994–2026 {ORG.registeredName}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <button onClick={() => onNavigate('legal')} className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('legal')} className="hover:text-slate-400 transition-colors">
              Terms & Conditions
            </button>
            <button onClick={() => onNavigate('legal')} className="hover:text-slate-400 transition-colors">
              Refund & Cancellation
            </button>
            <button
              onClick={onToggleLanguage}
              className="text-amber-400 hover:underline cursor-pointer"
            >
              {language === 'en' ? 'हिन्दी में पढ़ें' : 'Read in English'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
