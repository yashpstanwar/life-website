import React, { useState } from 'react';
import { PageId } from '../types';
import { SignalBars } from './SignalBars';
import { Lock } from 'lucide-react';

interface DonationBandProps {
  onNavigate: (page: PageId, donationPreset?: { amount: number; frequency: 'one-time' | 'monthly' }) => void;
}

export const DonationBand: React.FC<DonationBandProps> = ({ onNavigate }) => {
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedChip, setSelectedChip] = useState<number | 'Other'>(1000);

  // Funding text mapping
  const fundingText: Record<number | 'Other', string> = {
    500: '₹500 prints 200 Hindi awareness leaflets',
    1000: '₹1,000 trains one village volunteer for a day',
    2500: '₹2,500 produces one district radio spot',
    5000: '₹5,000 funds a training camp for ten workers',
    Other: 'Your custom contribution powers grassroot communication where needed most'
  };

  const levelMap: Record<number | 'Other', number> = {
    500: 1,
    1000: 2,
    2500: 3,
    5000: 4,
    Other: 5
  };

  const handleDonateClick = () => {
    const numericAmount = typeof selectedChip === 'number' ? selectedChip : 1000;
    onNavigate('donate', { amount: numericAmount, frequency });
  };

  return (
    <section className="w-full bg-[#101C3A] text-[#EFEDE6] py-20 px-4">
      <div className="max-w-[720px] mx-auto text-center space-y-6">
        {/* Heading */}
        <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-[#EFEDE6]">
          Support
        </h2>

        {/* One-time / Monthly Segmented Toggle */}
        <div className="inline-flex bg-[#14160F] p-1 rounded-[4px] border border-[#8E9BB5]/30">
          <button
            onClick={() => setFrequency('one-time')}
            className={`px-6 py-2 rounded-[4px] font-mono text-xs font-semibold tracking-wider transition-all cursor-pointer ${
              frequency === 'one-time'
                ? 'bg-[#E39B2C] text-[#101C3A]'
                : 'text-[#8E9BB5] hover:text-[#EFEDE6]'
            }`}
          >
            ONE-TIME
          </button>
          <button
            onClick={() => setFrequency('monthly')}
            className={`px-6 py-2 rounded-[4px] font-mono text-xs font-semibold tracking-wider transition-all cursor-pointer ${
              frequency === 'monthly'
                ? 'bg-[#E39B2C] text-[#101C3A]'
                : 'text-[#8E9BB5] hover:text-[#EFEDE6]'
            }`}
          >
            MONTHLY
          </button>
        </div>

        {/* Five Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {([500, 1000, 2500, 5000, 'Other'] as const).map((chip) => {
            const isSelected = selectedChip === chip;
            return (
              <button
                key={chip}
                onClick={() => setSelectedChip(chip)}
                className={`px-5 py-2.5 rounded-[4px] font-mono text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#E39B2C] text-[#101C3A] border-[#E39B2C]'
                    : 'bg-[#101C3A] text-[#8E9BB5] border-[#8E9BB5]/30 hover:border-[#E39B2C] hover:text-[#EFEDE6]'
                }`}
              >
                {typeof chip === 'number' ? `₹${chip.toLocaleString('en-IN')}` : 'Other'}
              </button>
            );
          })}
        </div>

        {/* Muted line showing what selected amount funds */}
        <p className="font-sans-devanagari text-sm text-[#8E9BB5] min-h-[24px]">
          {fundingText[selectedChip]}
        </p>

        {/* Nine thin marigold bars that rise in height with the amount */}
        <div className="flex justify-center py-2">
          <SignalBars
            count={9}
            heightLevel={levelMap[selectedChip]}
            className="h-10"
          />
        </div>

        {/* Marigold Button */}
        <div>
          <button
            onClick={handleDonateClick}
            className="w-full sm:w-auto px-10 py-3.5 bg-[#E39B2C] text-[#101C3A] hover:bg-[#e09117] font-sans-devanagari font-bold text-base rounded-[4px] transition-colors cursor-pointer"
          >
            Continue to donate
          </button>
        </div>

        {/* 13px muted line with lock icon */}
        <div className="flex items-center justify-center space-x-1.5 text-[13px] text-[#8E9BB5] font-mono pt-2">
          <Lock size={13} className="text-[#8E9BB5]" />
          <span>Payments secured by Razorpay</span>
        </div>
      </div>
    </section>
  );
};
