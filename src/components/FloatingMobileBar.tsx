import React from 'react';
import { PageId } from '../types';
import { Heart, Phone, MessageSquare, ShieldCheck } from 'lucide-react';

interface FloatingMobileBarProps {
  onNavigate: (page: PageId) => void;
  activePage: PageId;
}

export const FloatingMobileBar: React.FC<FloatingMobileBarProps> = ({ onNavigate, activePage }) => {
  if (activePage === 'donate' || activePage === 'donate-success' || activePage === 'donate-failure') {
    return null;
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-2xl p-2.5 sm:hidden flex items-center gap-2">
      <a
        href="tel:+917014778387"
        className="p-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors shrink-0"
        aria-label="Call Helpline"
      >
        <Phone className="w-5 h-5 text-slate-800" />
      </a>

      <a
        href="https://wa.me/917014778387"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors shrink-0 border border-emerald-200/60"
        aria-label="WhatsApp Helpline"
      >
        <MessageSquare className="w-5 h-5 text-emerald-600" />
      </a>

      <button
        onClick={() => onNavigate('donate')}
        className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-98 transition-transform cursor-pointer"
      >
        <Heart className="w-4 h-4 fill-slate-950" />
        <span>Donate (80G Exempt)</span>
      </button>
    </div>
  );
};
