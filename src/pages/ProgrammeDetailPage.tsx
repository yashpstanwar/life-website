import React from 'react';
import { PageId } from '../types';
import { PROGRAMMES } from '../data';
import { DonationBand } from '../components/DonationBand';
import { MapPin, Calendar, Users, Building, Play } from 'lucide-react';

interface ProgrammeDetailPageProps {
  programmeId?: string;
  onNavigate: (page: PageId, extra?: unknown) => void;
}

export const ProgrammeDetailPage: React.FC<ProgrammeDetailPageProps> = ({ programmeId, onNavigate }) => {
  const item = PROGRAMMES.find((p) => p.id === programmeId) || PROGRAMMES[0];
  const relatedItems = PROGRAMMES.filter((p) => p.id !== item.id).slice(0, 3);

  return (
    <div className="w-full bg-[#EFEDE6] text-[#14160F]">
      
      {/* Full-bleed duotone image header with the title overlaid in Fraunces */}
      <section className="relative w-full h-[480px] bg-[#101C3A] flex items-end">
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 opacity-80"
        />
        <div className="absolute inset-0 bg-[#101C3A]/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101C3A] via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pb-12 w-full space-y-3">
          <span className="font-mono text-xs text-[#E39B2C] font-bold uppercase tracking-widest bg-[#101C3A]/80 px-3 py-1 rounded-[2px] inline-block">
            {item.pillarName}
          </span>
          <h1 className="font-fraunces text-3xl sm:text-5xl font-bold text-[#EFEDE6] leading-tight max-w-4xl">
            {item.title}
          </h1>
        </div>
      </section>

      {/* Main Content Layout: 680px Reading Column + Right Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* 680px Reading Column */}
          <div className="lg:col-span-8 max-w-[680px] space-y-8 font-sans-devanagari text-base text-[#14160F] leading-relaxed">
            
            {/* Drop-cap opening paragraph */}
            <p className="first-letter:font-fraunces first-letter:text-5xl first-letter:font-bold first-letter:text-[#101C3A] first-letter:mr-3 first-letter:float-left first-letter:leading-none">
              In the desert blocks of Western Rajasthan, severe information asymmetry between policymakers and community members often results in life-saving health and literacy initiatives going completely unutilized. LIFE designed this targeted communication project to bridge that exact divide.
            </p>

            <p>
              Working directly alongside local panchayats, frontline health workers, and traditional folk performers, the initiative translates dense bureaucratic documentation into engaging regional audio plays, street theatre enactments, and illustrated visual guides tailored specifically for low-literacy environments.
            </p>

            {/* Pull quote in Fraunces with hairline rules above and below */}
            <div className="py-8 my-8 border-t border-b border-[#8E9BB5]/40 text-center space-y-2">
              <blockquote className="font-fraunces text-2xl sm:text-3xl italic text-[#101C3A] leading-snug">
                "Communication is not what is spoken by the institute, but what is understood and acted upon by the last-mile villager."
              </blockquote>
              <cite className="font-mono text-xs text-[#8E9BB5] uppercase tracking-widest block not-italic">
                — Field Director, I.I.D.C. Rajasthan
              </cite>
            </div>

            <p>
              Over a multi-stage field deployment, trained volunteer teams visited over 120 remote villages, establishing community listening circles and distributing durable audio playback devices pre-loaded with maternal health modules.
            </p>

            {/* Inline image with caption */}
            <div className="space-y-2 py-4">
              <div className="relative h-[360px] rounded-[4px] overflow-hidden bg-[#101C3A] hairline-all">
                <img
                  src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=1000"
                  alt="Community listening circle session"
                  className="w-full h-full object-cover filter grayscale contrast-125 opacity-90"
                />
              </div>
              <p className="font-mono text-xs text-[#8E9BB5] italic">
                Fig 1. Community listening circle session in Barmer district.
              </p>
            </div>

            <p>
              Subsequent impact evaluations conducted three months post-deployment demonstrated a measurable 42% increase in institutional health registrations across participating panchayats.
            </p>

            {/* Embedded video block simulation */}
            <div className="space-y-2 py-4">
              <div className="relative h-[320px] rounded-[4px] overflow-hidden bg-[#101C3A] flex flex-col items-center justify-center text-[#EFEDE6] hairline-all">
                <div className="w-16 h-16 bg-[#E39B2C] text-[#101C3A] rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                  <Play size={28} className="ml-1" />
                </div>
                <span className="font-mono text-xs text-[#8E9BB5] mt-4 uppercase tracking-widest">
                  DOCUMENTARY SHORT FILM — COMING SOON
                </span>
              </div>
              <p className="font-mono text-xs text-[#8E9BB5] italic">
                Watch field documentary on grassroots health communication in Rajasthan.
              </p>
            </div>

          </div>

          {/* Right Sidebar: At-a-glance list */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-white p-6 rounded-[4px] hairline-all space-y-6">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#101C3A] border-b border-[#8E9BB5]/20 pb-2">
                AT A GLANCE
              </h3>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-start space-x-3">
                  <MapPin size={16} className="text-[#2C6E8F] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[#8E9BB5] block">DISTRICT</span>
                    <span className="text-[#101C3A] font-bold">{item.district}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar size={16} className="text-[#2C6E8F] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[#8E9BB5] block">DURATION</span>
                    <span className="text-[#101C3A] font-bold">{item.duration}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Building size={16} className="text-[#2C6E8F] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[#8E9BB5] block">PARTNERS</span>
                    <span className="text-[#101C3A] font-bold">{item.partners}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users size={16} className="text-[#2C6E8F] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[#8E9BB5] block">REACH / IMPACT</span>
                    <span className="text-[#101C3A] font-bold">{item.reach}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#8E9BB5]/20">
                <button
                  onClick={() => onNavigate('donate')}
                  className="w-full py-3 bg-[#E39B2C] text-[#101C3A] hover:bg-[#e09117] font-sans-devanagari font-bold text-sm rounded-[4px] text-center transition-colors cursor-pointer"
                >
                  Support This Work
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Ends with a three-card related-programmes row */}
        <div className="mt-20 border-t border-[#8E9BB5]/30 pt-12 space-y-8">
          <h3 className="font-fraunces text-2xl font-bold text-[#101C3A]">
            Related Programmes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedItems.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onNavigate('programme-detail', rel.id)}
                className="bg-white rounded-[4px] hairline-all overflow-hidden p-4 space-y-3 hover:bg-[#EFEDE6]/40 transition-colors cursor-pointer"
              >
                <span className="font-mono text-[11px] text-[#2C6E8F] font-bold uppercase">
                  {rel.pillarName}
                </span>
                <h4 className="font-fraunces text-lg font-bold text-[#101C3A]">
                  {rel.title}
                </h4>
                <p className="font-sans-devanagari text-xs text-[#8E9BB5] line-clamp-2">
                  {rel.summary}
                </p>
                <div className="font-mono text-[11px] text-[#8E9BB5] pt-2 border-t border-[#8E9BB5]/20">
                  {rel.district} · {rel.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compact donation band on #101C3A */}
      <DonationBand onNavigate={onNavigate} />
    </div>
  );
};
