import React from 'react';
import { PageId, Language } from '../types';
import { PROGRAMMES, ORG } from '../data';
import { DonationBand } from '../components/DonationBand';
import {
  MapPin,
  Calendar,
  Users,
  Building,
  Play,
  ArrowLeft,
  Heart,
  CheckCircle2,
  Share2,
  FileText,
  ShieldCheck
} from 'lucide-react';

interface ProgrammeDetailPageProps {
  programmeId?: string;
  onNavigate: (page: PageId, extra?: unknown) => void;
  language?: Language;
}

export const ProgrammeDetailPage: React.FC<ProgrammeDetailPageProps> = ({
  programmeId,
  onNavigate,
  language = 'en'
}) => {
  const item = PROGRAMMES.find((p) => p.id === programmeId) || PROGRAMMES[0];
  const relatedItems = PROGRAMMES.filter((p) => p.id !== item.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.summary,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Initiative link copied to clipboard!');
    }
  };

  return (
    <div className="w-full bg-stone-50 text-slate-900 pb-20">
      {/* Hero Header with Imagery */}
      <section className="relative w-full min-h-[460px] bg-slate-950 flex items-end overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover opacity-45 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-4">
          <button
            onClick={() => onNavigate('work')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Initiatives</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-amber-500 text-slate-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {item.pillarName}
            </span>
            <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-medium border border-slate-700">
              {item.year}
            </span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-white leading-tight max-w-4xl">
            {item.title}
          </h1>

          {/* Quick Metrics Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{item.district} District, Rajasthan</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>{item.reach}</span>
            </span>
            {item.duration && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-sky-400" />
                <span>{item.duration}</span>
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Editorial Narrative (8 cols) */}
          <div className="lg:col-span-8 space-y-8 leading-relaxed text-slate-700">
            
            {/* Overview Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-xs font-bold text-amber-800 uppercase tracking-widest">
                Executive Overview
              </h2>
              <p className="font-serif-display text-lg sm:text-xl text-slate-900 leading-snug">
                {item.summary}
              </p>
            </div>

            {/* Problem Statement */}
            <div className="space-y-3">
              <h3 className="font-serif-display text-2xl font-bold text-slate-900">
                The Grassroots Problem
              </h3>
              <p className="text-sm sm:text-base leading-relaxed">
                {item.problemStatement ||
                  'In the desert blocks of Western Rajasthan, severe information asymmetry between policymakers and rural families often results in vital welfare schemes remaining unutilized. Low functional literacy, dialect differences, and mistrust of complex paperwork keep communities in cycles of preventable deprivation.'}
              </p>
            </div>

            {/* Pull Quote */}
            <div className="my-8 p-6 rounded-2xl bg-amber-50/70 border-l-4 border-amber-500 space-y-2">
              <blockquote className="font-serif-display text-lg sm:text-xl italic text-slate-900 leading-snug">
                &ldquo;Communication is not what is published in state government circulars, but what is understood, trusted, and acted upon by the last-mile villager under a desert tree.&rdquo;
              </blockquote>
              <cite className="block text-xs font-bold text-amber-900 not-italic">
                — Field Operations Director, LIFE (I.I.D.C.) Jaipur
              </cite>
            </div>

            {/* Intervention Methodology */}
            <div className="space-y-3">
              <h3 className="font-serif-display text-2xl font-bold text-slate-900">
                Our Communication Intervention
              </h3>
              <p className="text-sm sm:text-base leading-relaxed">
                {item.interventionMethod ||
                  'LIFE deployed mobile caravan teams equipped with portable audio sound systems, staged interactive puppet plays in local Marwari, and distributed illustrated Devanagari cards. Frontline village peer-educators were coached to moderate community listening circles.'}
              </p>
            </div>

            {/* Key Outcomes Checklist */}
            {item.keyOutcomes && item.keyOutcomes.length > 0 && (
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 space-y-4">
                <h4 className="font-serif-display text-lg font-bold text-emerald-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Verified Field Outcomes & Milestones</span>
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800">
                  {item.keyOutcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Media Simulation */}
            <div className="space-y-2">
              <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-900 flex flex-col items-center justify-center text-white border border-slate-800 shadow-md">
                <div className="w-16 h-16 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-lg">
                  <Play className="w-7 h-7 ml-1" />
                </div>
                <span className="text-xs text-slate-400 mt-4 uppercase tracking-widest font-bold">
                  Field Video & Audio Documentary Preview
                </span>
                <p className="text-[11px] text-slate-500 mt-1">4-Minute Field Report from {item.district}</p>
              </div>
            </div>
          </div>

          {/* Right Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Sponsor Campaign Action Box */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-lg space-y-5">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-widest block">
                Direct Field Sponsorship
              </span>
              <h3 className="font-serif-display text-xl font-bold text-slate-900 leading-snug">
                Help Expand This Campaign to More Villages
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your donation directly funds sound equipment, travel caravans, and learning materials for this initiative.
              </p>

              <button
                onClick={() => onNavigate('donate', { amount: 1500, frequency: 'one-time' })}
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Heart className="w-4 h-4 fill-slate-950" />
                <span>Sponsor a Village Session (₹1,500)</span>
              </button>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>80G Tax Deductible</span>
                </span>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 hover:text-slate-900 font-semibold cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Initiative Metadata Card */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-slate-200/80 text-xs space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider">
                Initiative Metadata
              </h4>
              <div className="space-y-2 text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span>Implementing Body:</span>
                  <span className="font-semibold text-slate-900">{ORG.brandName} Field Team</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span>Key Partners:</span>
                  <span className="font-semibold text-slate-900 text-right max-w-[160px] truncate">{item.partners || 'State Departments'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span>Target Terrain:</span>
                  <span className="font-semibold text-slate-900">{item.district} District</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Evaluation Status:</span>
                  <span className="font-bold text-emerald-700">Verified & Monitored</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Programmes */}
        <div className="mt-16 pt-12 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-display text-2xl font-bold text-slate-900">
              Related Field Initiatives
            </h3>
            <button
              onClick={() => onNavigate('work')}
              className="text-xs font-bold text-amber-600 hover:underline"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedItems.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onNavigate('programme-detail', rel.id)}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3"
              >
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-sm uppercase">
                  {rel.district}
                </span>
                <h4 className="font-serif-display text-base font-bold text-slate-900 hover:text-amber-800 transition-colors">
                  {rel.title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {rel.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DonationBand onNavigate={onNavigate} />
    </div>
  );
};
