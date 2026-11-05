import React, { useState } from 'react';
import { PageId, Language } from '../types';
import { PROGRAMMES, PILLARS } from '../data';
import { Filter, MapPin, Users, Calendar, ArrowRight, Heart, Search, CheckCircle2 } from 'lucide-react';

interface OurWorkPageProps {
  onNavigate: (page: PageId, programmeId?: string) => void;
  language?: Language;
}

export const OurWorkPage: React.FC<OurWorkPageProps> = ({ onNavigate, language = 'en' }) => {
  const [selectedPillar, setSelectedPillar] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProgrammes = PROGRAMMES.filter((item) => {
    const pillarMatch = selectedPillar === 'All' || item.pillarName === selectedPillar;
    const searchMatch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return pillarMatch && searchMatch;
  });

  return (
    <div className="w-full bg-stone-50 text-slate-900 pb-20">
      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/20 inline-block">
            Groundwork & Field Campaigns
          </span>
          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Our Initiatives Across Rajasthan
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Discover our active and landmark development communication campaigns, frontline health training workshops, and grassroots research across Thar desert hamlets and rural districts.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Controls: Search & Filter Tabs */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          {/* Pillar Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-2 flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1" /> PILLAR:
            </span>
            <button
              onClick={() => setSelectedPillar('All')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedPillar === 'All'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
              }`}
            >
              All Pillars ({PROGRAMMES.length})
            </button>
            {PILLARS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPillar(p.title)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedPillar === p.title
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by district, topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-hidden focus:border-amber-500"
            />
          </div>
        </div>

        {/* Programme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProgrammes.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              {/* Image & District Badge */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                <span className="absolute top-4 left-4 bg-slate-900/90 text-amber-400 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                  {item.pillarName}
                </span>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-medium">
                  <span className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-md backdrop-blur-xs">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{item.district} District</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-md backdrop-blur-xs">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{item.reach}</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.summary}
                  </p>

                  {item.keyOutcomes && item.keyOutcomes.length > 0 && (
                    <div className="pt-2 space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Verified Outcome:
                      </span>
                      <div className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item.keyOutcomes[0]}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onNavigate('programme-detail', item.id)}
                    className="inline-flex items-center gap-1.5 font-bold text-xs text-slate-900 hover:text-amber-800 transition-colors cursor-pointer"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onNavigate('donate', item.id as any)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200/80 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                    <span>Sponsor This Cause</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProgrammes.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-3">
            <p className="text-slate-500 text-sm">No initiatives matched your search query.</p>
            <button
              onClick={() => { setSelectedPillar('All'); setSearchQuery(''); }}
              className="text-xs font-semibold text-amber-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
