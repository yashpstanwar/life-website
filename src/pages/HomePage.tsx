import React from 'react';
import { PageId, Language } from '../types';
import { PILLARS, IMPACT_STATS, PARTNERS } from '../data';
import { DonationBand } from '../components/DonationBand';
import { SignalBars } from '../components/SignalBars';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId, donationPreset?: { amount: number; frequency: 'one-time' | 'monthly' }) => void;
  language: Language;
}

/**
 * Renders the hero photograph, falling back to a composed placeholder if the
 * file is missing — so a half-finished deploy never shows a broken image icon.
 * Drop your own photo at public/hero.jpg and it appears automatically.
 */
const HeroImage: React.FC = () => {
  const [failed, setFailed] = React.useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#54637f] bg-[#16233f]">
        <ImageIcon size={30} strokeWidth={1.5} aria-hidden="true" />
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-center px-6">
          Add your field photograph
          <span className="block mt-1 normal-case tracking-normal text-[#43506a]">public/hero.jpg</span>
        </span>
      </div>
    );
  }

  return (
    <picture>
      <source media="(max-width: 640px)" srcSet="/hero-mobile.jpg" />
      <img
        src="/hero.jpg"
        alt="A LIFE field worker standing under a tree, explaining a government welfare scheme to a seated group of villagers."
        onError={() => setFailed(true)}
        className="absolute inset-0 w-full h-full object-cover object-[62%_center] sm:object-center"
        loading="eager"
        fetchPriority="high"
      />
    </picture>
  );
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, language }) => {
  return (
    <div className="w-full bg-[#EFEDE6]">
      {/* Hero — full bleed photograph, statement over it */}
      <section className="relative bg-[#101C3A] text-[#EFEDE6] hairline-b overflow-hidden">
        <div className="relative min-h-[520px] sm:min-h-[600px] lg:min-h-[calc(100vh-72px)] lg:max-h-[760px] flex items-end">
          <HeroImage />

          {/* Two-stop scrim: heavy at the base where the text sits, light at the
              top so the tree and the speaker's face stay visible. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#101C3A] via-[#101C3A]/80 to-[#101C3A]/25"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#101C3A]/75 via-[#101C3A]/20 to-transparent"
          />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pb-12 sm:pb-16 lg:pb-20">
            <div className="mb-7">
              <SignalBars count={12} heightLevel={4} className="h-9" isAnimated={true} />
            </div>

            <h1 className="font-fraunces text-[2rem] leading-[1.12] sm:text-5xl sm:leading-[1.1] lg:text-[3.4rem] lg:leading-[1.08] font-bold max-w-[16ch] text-[#EFEDE6]">
              {language === 'en'
                ? 'The scheme exists. Knowing about it is what we help with.'
                : 'योजना मौजूद है। उसकी जानकारी पहुँचाना हमारा काम है।'}
            </h1>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-9">
              <button
                onClick={() => onNavigate('donate')}
                className="px-8 py-4 bg-[#E39B2C] text-[#101C3A] font-sans-devanagari font-bold rounded-[4px] hover:bg-[#e09117] transition-colors cursor-pointer"
              >
                {language === 'en' ? 'Support our work' : 'हमारा सहयोग करें'}
              </button>
              <button
                onClick={() => onNavigate('work')}
                className="px-8 py-4 bg-transparent text-[#EFEDE6] border border-[#EFEDE6]/50 font-sans-devanagari rounded-[4px] hover:border-[#E39B2C] hover:text-[#E39B2C] transition-colors cursor-pointer backdrop-blur-[2px]"
              >
                {language === 'en' ? 'See our work' : 'हमारा कार्य देखें'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact strip — figures live in src/data.ts */}
      <section className="bg-[#EFEDE6] hairline-b py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#8E9BB5]/30">
          {IMPACT_STATS.map((stat) => (
            <div key={stat.label} className="pt-4 md:pt-0 md:px-4 text-center md:text-left">
              <span className="block font-mono text-3xl sm:text-4xl font-bold text-[#101C3A] mb-1">
                {stat.value}
              </span>
              <span className="font-mono text-xs text-[#8E9BB5] uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
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
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#8E9BB5]">
            {PARTNERS.map((partner) => (
              <span
                key={partner}
                className="border border-[#8E9BB5]/40 px-4 py-2 rounded-[4px] uppercase tracking-wider"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
