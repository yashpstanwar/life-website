import React from 'react';
import { PageId, Language } from '../types';
import { PILLARS, ORG } from '../data';

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
  return (
    <footer className="w-full bg-[#101C3A] text-[#8E9BB5] hairline-t py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand & Mission Statement */}
        <div className="space-y-4">
          <button
            onClick={() => onNavigate('home')}
            className="text-left font-fraunces text-3xl font-bold text-[#EFEDE6] hover:opacity-90"
          >
            LIFE
          </button>
          <p className="font-sans-devanagari text-xs text-[#8E9BB5] leading-relaxed">
            Indian Institute of Development and Communication (I.I.D.C.)
          </p>
          <p className="font-fraunces text-base text-[#EFEDE6]/90 leading-snug italic max-w-xs">
            {ORG.motto}
          </p>

          <div className="pt-2">
            <button
              onClick={onToggleLanguage}
              className="inline-flex items-center bg-[#101C3A] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-1 text-xs font-mono text-[#8E9BB5] hover:border-[#E39B2C] hover:text-[#EFEDE6]"
            >
              LANGUAGE: <span className="ml-1 text-[#E39B2C]">EN / हिं</span>
            </button>
          </div>
        </div>

        {/* Column 1: Programmes (F2 requirement) */}
        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-[#EFEDE6] mb-4">
            Programmes
          </h4>
          <ul className="space-y-2 text-xs font-sans-devanagari">
            {PILLARS.map((pillar) => (
              <li key={pillar.id}>
                <button
                  onClick={() => onNavigate('work')}
                  className="hover:text-[#E39B2C] transition-colors text-left"
                >
                  {language === 'en' ? pillar.title : pillar.titleHi}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Contact (F2 requirement) */}
        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-[#EFEDE6] mb-4">
            Contact
          </h4>
          <div className="space-y-2 text-xs font-sans-devanagari">
            <p className="text-[#8E9BB5] leading-relaxed">
              {ORG.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <div className="space-y-1 pt-1">
              {ORG.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="block font-mono text-[11px] text-[#8E9BB5] hover:text-[#E39B2C]"
                >
                  {phone}
                </a>
              ))}
            </div>
            <a
              href={`mailto:${ORG.email}`}
              className="block font-mono text-[11px] text-[#8E9BB5] hover:text-[#E39B2C] break-all"
            >
              {ORG.email}
            </a>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="text-[#2C6E8F] font-mono hover:underline"
              >
                Send Enquiry →
              </button>
            </div>
          </div>
        </div>

        {/* Column 3: Quick Links & Legal */}
        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-[#EFEDE6] mb-4">
            Organization
          </h4>
          <ul className="space-y-2 text-xs font-sans-devanagari">
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-[#E39B2C]">
                About & Objectives
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('training')} className="hover:text-[#E39B2C]">
                Training & Institute
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('get-involved')} className="hover:text-[#E39B2C]">
                Get Involved & Volunteer
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-[#E39B2C]">
                Audited Transparency Reports
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto pt-6 hairline-t flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-[#8E9BB5] gap-3">
        <div>
          © 2026 LIFE (I.I.D.C.)
        </div>
        <div>
          Registered Society · Jaipur, Rajasthan
        </div>
      </div>
    </footer>
  );
};
