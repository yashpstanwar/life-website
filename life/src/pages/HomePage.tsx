import React from 'react';
import { PageId, Language } from '../types';
import { PILLARS } from '../data';
import { DonationBand } from '../components/DonationBand';
import { SignalBars } from '../components/SignalBars';
import { ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId, donationPreset?: { amount: number; frequency: 'one-time' | 'monthly' }) => void;
  language: Language;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, language }) => {
  return (
    <div className="w-full bg-[#EFEDE6]">
      {/* Hero Section */}
      <section className="relative bg-[#101C3A] text-[#EFEDE6] py-24 sm:py-32 px-4 sm:px-8 overflow-hidden hairline-b">
        {/* Signal Bars graphic */}
        <div className="max-w-7xl mx-auto flex flex-col items-start relative z-10">
          <div className="mb-6">
            <SignalBars count={32} heightLevel={4} className="h-10 opacity-80" isAnimated={true} />
          </div>

          <p className="font-mono text-xs uppercase tracking-widest text-[#8E9BB5] mb-3">
            REGISTERED SOCIETY · JAIPUR, RAJASTHAN
          </p>

          <h1 className="font-fraunces text-4xl sm:text-6xl font-bold leading-tight max-w-4xl mb-6 text-[#EFEDE6]">
            {language === 'en'
              ? 'A scheme nobody hears about helps nobody.'
              : 'जिस योजना के बारे में कोई नहीं सुनता, वह किसी की मदद नहीं करती।'}
          </h1>

          <p className="font-sans-devanagari text-lg text-[#8E9BB5] max-w-2xl mb-8 leading-relaxed">
            {language === 'en'
              ? 'LIFE builds the campaigns, research and training that carry development work the last mile — across Rajasthan and beyond.'
              : 'लाइफ (LIFE) राजस्थान और उससे आगे विकास कार्यों को अंतिम मील तक ले जाने वाले अभियान, अनुसंधान और प्रशिक्षण का निर्माण करता है।'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onNavigate('donate')}
              className="px-8 py-3.5 bg-[#E39B2C] text-[#101C3A] font-sans-devanagari font-bold rounded-[4px] hover:bg-[#e09117] transition-colors cursor-pointer"
            >
              {language === 'en' ? 'Donate' : 'दान करें'}
            </button>
            <button
              onClick={() => onNavigate('work')}
              className="px-8 py-3.5 bg-transparent text-[#EFEDE6] border border-[#8E9BB5]/40 font-sans-devanagari rounded-[4px] hover:border-[#E39B2C] hover:text-[#E39B2C] transition-colors cursor-pointer"
            >
              {language === 'en' ? 'See our work' : 'हमारा कार्य देखें'}
            </button>
          </div>
        </div>
      </section>

      {/* F1: Impact Strip — Numbers replaced with [0], keeping labels */}
      <section className="bg-[#EFEDE6] hairline-b py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#8E9BB5]/30">
          <div className="pt-4 md:pt-0 md:px-4 text-center md:text-left">
            <span className="block font-mono text-3xl sm:text-4xl font-bold text-[#101C3A] mb-1">
              [0]
            </span>
            <span className="font-mono text-xs text-[#8E9BB5] uppercase tracking-widest">
              VILLAGES REACHED
            </span>
          </div>

          <div className="pt-4 md:pt-0 md:px-4 text-center md:text-left">
            <span className="block font-mono text-3xl sm:text-4xl font-bold text-[#101C3A] mb-1">
              [0]
            </span>
            <span className="font-mono text-xs text-[#8E9BB5] uppercase tracking-widest">
              PEOPLE TRAINED
            </span>
          </div>

          <div className="pt-4 md:pt-0 md:px-4 text-center md:text-left">
            <span className="block font-mono text-3xl sm:text-4xl font-bold text-[#101C3A] mb-1">
              [0]
            </span>
            <span className="font-mono text-xs text-[#8E9BB5] uppercase tracking-widest">
              CAMPAIGNS PRODUCED
            </span>
          </div>

          <div className="pt-4 md:pt-0 md:px-4 text-center md:text-left">
            <span className="block font-mono text-3xl sm:text-4xl font-bold text-[#101C3A] mb-1">
              [0]
            </span>
            <span className="font-mono text-xs text-[#8E9BB5] uppercase tracking-widest">
              YEARS OF WORK
            </span>
          </div>
        </div>
      </section>

      {/* F1: Programme Pillars Section */}
      <section className="py-20 px-4 sm:px-8 bg-[#EFEDE6]">
        <div className="max-w-7xl mx-auto space-y-10">
          <div>
            <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-[#101C3A] mb-2">
              Programme Pillars
            </h2>
            <div className="w-16 h-0.5 bg-[#E39B2C]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                onClick={() => onNavigate('work')}
                className="bg-[#EFEDE6] border-t-2 border-[#E39B2C] hairline-all p-6 rounded-[4px] hover:bg-white/60 transition-colors cursor-pointer space-y-3"
              >
                <h3 className="font-fraunces text-xl font-bold text-[#101C3A]">
                  {language === 'en' ? pillar.title : pillar.titleHi}
                </h3>
                <p className="font-sans-devanagari text-sm text-[#14160F] leading-relaxed">
                  {language === 'en' ? pillar.description : pillar.descriptionHi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaign (F2 fix: Remove stray search field on the campaign image) */}
      <section className="bg-[#EFEDE6] hairline-t hairline-b py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Duotone B&W Documentary Image without any stray search overlay */}
          <div className="relative h-[420px] rounded-[4px] overflow-hidden hairline-all bg-[#101C3A]">
            <img
              src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=1000"
              alt="Maternal Health Literacy in Barmer"
              className="w-full h-full object-cover filter grayscale contrast-125 opacity-85"
            />
            <div className="absolute inset-0 bg-[#101C3A]/30 mix-blend-multiply pointer-events-none" />
          </div>

          <div className="space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#8E9BB5]">
              FEATURED CAMPAIGN
            </span>
            <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-[#101C3A] leading-tight">
              Maternal Health Literacy in Barmer
            </h2>
            <div className="space-y-4 font-sans-devanagari text-sm text-[#14160F] leading-relaxed">
              <p>
                In the remote districts of Barmer, critical maternal health schemes often go unutilized due to severe information asymmetry. Expectant mothers are frequently unaware of their entitlements, leading to tragic, preventable outcomes.
              </p>
              <p>
                Our recent campaign deployed localized audio dramas and trained peer-educators to break down these barriers. By stripping away bureaucratic jargon and utilizing regional storytelling traditions, we made the information actionable.
              </p>
              <p>
                Over six months, clinic registrations in targeted blocks increased by 42%. It proves that when communication is designed for the recipient, rather than the sender, development works.
              </p>
            </div>
            <div>
              <button
                onClick={() => onNavigate('programme-detail')}
                className="inline-flex items-center text-[#2C6E8F] font-sans-devanagari font-bold text-sm hover:underline space-x-1"
              >
                <span>Read more about this project</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* F3: Rebuilt Donation Band */}
      <DonationBand onNavigate={onNavigate} />

      {/* Supported By Logos strip */}
      <section className="bg-[#EFEDE6] py-12 px-4 border-t border-[#8E9BB5]/20">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-[#8E9BB5]">
            SUPPORTED BY INSTITUTIONS & PARTNERS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 filter grayscale text-xs font-mono text-[#8E9BB5]">
            <span className="border border-[#8E9BB5]/40 px-4 py-2 rounded-[4px]">Government of Rajasthan [placeholder]</span>
            <span className="border border-[#8E9BB5]/40 px-4 py-2 rounded-[4px]">UNICEF Rajasthan [placeholder]</span>
            <span className="border border-[#8E9BB5]/40 px-4 py-2 rounded-[4px]">Jaipur Academic Council [placeholder]</span>
            <span className="border border-[#8E9BB5]/40 px-4 py-2 rounded-[4px]">State Literacy Mission [placeholder]</span>
          </div>
        </div>
      </section>
    </div>
  );
};
