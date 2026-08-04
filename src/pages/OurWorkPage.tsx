import React, { useState } from 'react';
import { PageId, PillarId } from '../types';
import { PROGRAMMES, PILLARS } from '../data';
import { Filter } from 'lucide-react';

interface OurWorkPageProps {
  onNavigate: (page: PageId, programmeId?: string) => void;
}

export const OurWorkPage: React.FC<OurWorkPageProps> = ({ onNavigate }) => {
  const [selectedPillar, setSelectedPillar] = useState<string>('All');


  const filteredProgrammes = PROGRAMMES.filter((item) => {
    const pillarMatch = selectedPillar === 'All' || item.pillarName === selectedPillar;
    return pillarMatch;
  });

  return (
    <div className="w-full bg-[#EFEDE6] text-[#14160F]">
      {/* Header Band on #101C3A */}
      <section className="bg-[#101C3A] text-[#EFEDE6] py-16 px-4 sm:px-8 hairline-b">
        <div className="max-w-7xl mx-auto space-y-3">
          <span className="font-mono text-xs text-[#8E9BB5] uppercase tracking-widest">
            FIELD INITIATIVES & CAMPAIGNS
          </span>
          <h1 className="font-fraunces text-4xl sm:text-5xl font-bold text-[#EFEDE6]">
            Our Work
          </h1>
          <p className="font-sans-devanagari text-base text-[#8E9BB5] max-w-2xl">
            Explore active and completed communication, research, and training initiatives across Rajasthan.
          </p>
        </div>
      </section>

      {/* Main Content Area on #EFEDE6 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-8">
        {/* Filter chips */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#8E9BB5]/20 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-[#8E9BB5] mr-2 flex items-center">
              <Filter size={14} className="mr-1" /> PILLAR:
            </span>
            <button
              onClick={() => setSelectedPillar('All')}
              className={`px-3 py-1.5 rounded-[4px] font-mono text-xs transition-colors ${
                selectedPillar === 'All'
                  ? 'bg-[#E39B2C] text-[#101C3A] font-bold'
                  : 'bg-white text-[#14160F] border border-[#8E9BB5]/40 hover:border-[#E39B2C]'
              }`}
            >
              All
            </button>
            {PILLARS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPillar(p.title)}
                className={`px-3 py-1.5 rounded-[4px] font-mono text-xs transition-colors ${
                  selectedPillar === p.title
                    ? 'bg-[#E39B2C] text-[#101C3A] font-bold'
                    : 'bg-white text-[#14160F] border border-[#8E9BB5]/40 hover:border-[#E39B2C]'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        {/* Two-Column Grid of Programme Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProgrammes.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate('programme-detail', item.id)}
              className="bg-white rounded-[4px] hairline-all overflow-hidden hover:bg-[#EFEDE6]/40 transition-all cursor-pointer group flex flex-col justify-between"
            >
              {/* Duotone Image */}
              <div className="relative h-64 bg-[#101C3A] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-[#101C3A]/30 mix-blend-multiply pointer-events-none" />
                <span className="absolute top-3 left-3 bg-[#101C3A] text-[#E39B2C] px-2.5 py-1 rounded-[2px] font-mono text-[11px] font-bold uppercase tracking-wider">
                  {item.pillarName}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h2 className="font-fraunces text-2xl font-bold text-[#101C3A] group-hover:text-[#2C6E8F] transition-colors">
                    {item.title}
                  </h2>
                  <p className="font-sans-devanagari text-sm text-[#14160F] line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* Mono metadata for district and year */}
                <div className="pt-4 border-t border-[#8E9BB5]/20 flex justify-between items-center font-mono text-xs text-[#8E9BB5]">
                  <span>DISTRICT: {item.district}</span>
                  <span>YEAR: {item.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
