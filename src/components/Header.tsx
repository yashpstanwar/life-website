import React, { useState } from 'react';
import { PageId, Language } from '../types';
import { Menu, X } from 'lucide-react';

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
    { id: 'training', labelEn: 'Training', labelHi: 'प्रशिक्षण' },
    { id: 'about', labelEn: 'About', labelHi: 'हमारे बारे में' },
    { id: 'get-involved', labelEn: 'Get Involved', labelHi: 'जुड़ें' },
    { id: 'contact', labelEn: 'Contact', labelHi: 'संपर्क' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#101C3A] text-[#EFEDE6] hairline-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
        {/* Brand logo */}
        <button
          onClick={() => {
            onNavigate('home');
            setMobileMenuOpen(false);
          }}
          className="text-left font-fraunces text-2xl font-bold tracking-tight text-[#EFEDE6] hover:opacity-90 transition-opacity"
        >
          LIFE
          <span className="block font-mono text-[10px] tracking-widest text-[#8E9BB5] font-normal uppercase">
            I.I.D.C. Jaipur
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`font-sans-devanagari text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#E39B2C] border-b-2 border-[#E39B2C] pb-0.5'
                    : 'text-[#8E9BB5] hover:text-[#EFEDE6]'
                }`}
              >
                {language === 'en' ? item.labelEn : item.labelHi}
              </button>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Language Toggle F2 Requirement: Change LANGUAGE label to a toggle reading EN / हिं */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center bg-[#101C3A] border border-[#8E9BB5]/40 rounded-[4px] px-2.5 py-1 text-xs font-mono tracking-wider text-[#8E9BB5] hover:border-[#E39B2C] hover:text-[#EFEDE6] transition-all cursor-pointer"
            title="Toggle Language / भाषा बदलें"
          >
            <span className={language === 'en' ? 'text-[#E39B2C] font-bold' : ''}>EN</span>
            <span className="mx-1 text-[#8E9BB5]/50">/</span>
            <span className={language === 'hi' ? 'text-[#E39B2C] font-bold' : ''}>हिं</span>
          </button>

          {/* Donate Button */}
          <button
            onClick={() => onNavigate('donate')}
            className="bg-[#E39B2C] text-[#101C3A] hover:bg-[#e09117] px-4 py-2 rounded-[4px] font-sans-devanagari font-semibold text-sm transition-colors cursor-pointer"
          >
            {language === 'en' ? 'Donate' : 'दान करें'}
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={onToggleLanguage}
            className="bg-[#101C3A] border border-[#8E9BB5]/40 rounded-[4px] px-2 py-1 text-xs font-mono text-[#8E9BB5]"
          >
            {language === 'en' ? 'EN / हिं' : 'हिं / EN'}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-[#8E9BB5] hover:text-[#EFEDE6]"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#101C3A] hairline-b px-4 py-4 space-y-3">
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className={`block w-full text-left py-2 font-sans-devanagari text-base ${
              activePage === 'home' ? 'text-[#E39B2C] font-bold' : 'text-[#8E9BB5]'
            }`}
          >
            {language === 'en' ? 'Home' : 'मुख्य पृष्ठ'}
          </button>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 font-sans-devanagari text-base ${
                activePage === item.id ? 'text-[#E39B2C] font-bold' : 'text-[#8E9BB5]'
              }`}
            >
              {language === 'en' ? item.labelEn : item.labelHi}
            </button>
          ))}

          <button
            onClick={() => {
              onNavigate('donate');
              setMobileMenuOpen(false);
            }}
            className="w-full mt-2 bg-[#E39B2C] text-[#101C3A] font-bold py-2.5 rounded-[4px] text-center font-sans-devanagari text-sm"
          >
            {language === 'en' ? 'Donate' : 'दान करें'}
          </button>
        </div>
      )}
    </header>
  );
};
