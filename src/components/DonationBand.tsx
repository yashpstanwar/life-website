import React, { useState } from 'react';
import { PageId } from '../types';
import { Heart, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { DONATION_TIERS } from '../data';

interface DonationBandProps {
  onNavigate: (page: PageId, donationPreset?: { amount: number; frequency: 'one-time' | 'monthly' }) => void;
}

export const DonationBand: React.FC<DonationBandProps> = ({ onNavigate }) => {
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedAmount, setSelectedAmount] = useState<number>(1500);

  const selectedTier = DONATION_TIERS.find((t) => t.amount === selectedAmount) || DONATION_TIERS[1];

  const handleProceed = () => {
    onNavigate('donate', { amount: selectedAmount, frequency });
  };

  return (
    <section className="w-full bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center space-y-8">
        {/* Badge & Title */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Every Rupee Directly Empowers a Desert Village</span>
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Carry the Change Forward Today
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Choose a giving tier below to see the tangible grassroots impact your contribution unlocks in Rajasthan.
          </p>
        </div>

        {/* Frequency Switcher */}
        <div className="inline-flex p-1 rounded-xl bg-slate-800/80 border border-slate-700/60 backdrop-blur-md">
          <button
            onClick={() => setFrequency('one-time')}
            className={`px-5 py-2 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer ${
              frequency === 'one-time'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            ONE-TIME GIFT
          </button>
          <button
            onClick={() => setFrequency('monthly')}
            className={`relative px-5 py-2 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
              frequency === 'monthly'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>MONTHLY SUSTAINER</span>
            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-bold">
              3x Impact
            </span>
          </button>
        </div>

        {/* Amount Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-3xl mx-auto">
          {DONATION_TIERS.map((tier) => {
            const isSelected = selectedAmount === tier.amount;
            return (
              <button
                key={tier.amount}
                onClick={() => setSelectedAmount(tier.amount)}
                className={`relative p-3.5 rounded-xl border text-center transition-all cursor-pointer group ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400 text-white shadow-lg shadow-amber-500/10 scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-xs">
                    Popular
                  </span>
                )}
                <span className="block text-lg font-bold tracking-tight text-white">
                  ₹{tier.amount.toLocaleString('en-IN')}
                </span>
                <span className="block text-[11px] text-slate-400 mt-0.5 truncate">
                  {tier.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Tier Impact Highlight Box */}
        <div className="max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md text-left flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1 space-y-1">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Tangible Outcome of ₹{selectedAmount.toLocaleString('en-IN')} {frequency === 'monthly' ? '/ month' : ''}:
            </span>
            <p className="text-slate-200 text-sm font-medium leading-relaxed">
              {selectedTier.impact}
            </p>
          </div>
        </div>

        {/* CTA Button & Trust Badges */}
        <div className="space-y-4 pt-2">
          <button
            onClick={handleProceed}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Heart className="w-5 h-5 fill-slate-950" />
            <span>Proceed to Donate ₹{selectedAmount.toLocaleString('en-IN')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-2">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Tax Deductible (80G Receipt)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              Instant UPI / GPay / Cards / NetBanking
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              256-Bit Bank Grade Security
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
