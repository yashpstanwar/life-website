import React, { useState } from 'react';
import { PageId, Language } from '../types';
import { Menu, X, Heart, Phone, MessageSquare, ShieldCheck, ChevronRight, Globe } from 'lucide-react';
import { ORG } from '../data';

interface HeaderProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  language: Language;
  onToggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigate,
  language,
  onToggleLanguage
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; labelEn: string; labelHi: string }[] = [
    { id: 'work', labelEn: 'Our Work', labelHi: 'हमारा कार्य' },
    { id: 'training', labelEn: 'Master Institute', labelHi: 'प्रशिक्षण संस्थान' },
    { id: 'about', labelEn: 'About Us', labelHi: 'हमारे बारे में' },
    { id: 'get-involved', labelEn: 'Get Involved', labelHi: 'सहयोग करें' },
    { id: 'contact', labelEn: 'Contact', labelHi: 'संपर्क' },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Trust & Helpline Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {language === 'en'
                ? 'Empowering 87+ Desert & Rural Villages across Rajasthan'
                : 'राजस्थान के 87+ सुदूर रेगिस्तानी और ग्रामीण गांवों में सक्रिय'}
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {language === 'en'
                ? 'Registered NGO (80G Tax Exemption Certified)'
                : 'पंजीकृत संस्था • 80G आयकर छूट उपलब्ध'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+917014778387"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>+91 70147 78387</span>
            </a>
            <a
              href="https://wa.me/917014778387"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-50 w-full glass-header border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 text-left group cursor-pointer focus:outline-hidden"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-bold text-xl shadow-md group-hover:scale-105 transition-transform duration-200">
              L
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-display text-2xl font-bold tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                  LIFE
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-amber-100 text-amber-900 border border-amber-200/60 hidden xs:inline-block">
                  ESTD 1994
                </span>
              </div>
              <span className="block text-[11px] font-medium text-slate-500 tracking-tight leading-none mt-0.5">
                Indian Institute of Development & Communication
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-50 text-amber-900 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/70'
                  }`}
                >
                  {language === 'en' ? item.labelEn : item.labelHi}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs & Language Switcher */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Language Switcher Pill */}
            <button
              onClick={onToggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-950 transition-all cursor-pointer"
              title="Toggle English / हिन्दी"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span className={language === 'en' ? 'text-amber-700 font-bold' : 'text-slate-500'}>
                EN
              </span>
              <span className="text-slate-300">|</span>
              <span className={language === 'hi' ? 'text-amber-700 font-bold font-sans-devanagari' : 'text-slate-500 font-sans-devanagari'}>
                हिन्दी
              </span>
            </button>

            {/* High-Converting Donate Button */}
            <button
              onClick={() => handleNavClick('donate')}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <Heart className="w-4 h-4 text-slate-950 fill-slate-950 group-hover:scale-110 transition-transform" />
              <span>{language === 'en' ? 'Donate Now' : 'सहयोग करें'}</span>
              <span className="hidden xl:inline-block text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-slate-950/15 text-slate-950">
                80G
              </span>
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/98 border-b border-slate-200 shadow-xl px-4 pt-4 pb-6 space-y-4">
            <div className="grid grid-cols-1 gap-1">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-amber-50 text-amber-900 font-semibold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{language === 'en' ? item.labelEn : item.labelHi}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-3">
              <button
                onClick={() => handleNavClick('donate')}
                className="w-full py-3.5 rounded-xl font-bold text-center flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20"
              >
                <Heart className="w-4 h-4 fill-slate-950" />
                <span>{language === 'en' ? 'Donate Now (80G Tax Exemption)' : 'सहयोग करें (80G आयकर छूट)'}</span>
              </button>

              <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-600 pt-1">
                <a
                  href="tel:+917014778387"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-700" />
                  <span>Call Helpline</span>
                </a>
                <a
                  href="https://wa.me/917014778387"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
