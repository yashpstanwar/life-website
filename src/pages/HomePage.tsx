import React, { useState } from 'react';
import { PageId, Language } from '../types';
import { PILLARS, IMPACT_STATS, PARTNERS, DISTRICTS, STORIES, FINANCIAL_BREAKDOWN, MEDIA_FEATURES, ORG } from '../data';
import { DonationBand } from '../components/DonationBand';
import { TrustBadgesBar } from '../components/TrustBadgesBar';
import {
  Heart,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Play,
  Pause,
  Volume2,
  Users,
  Award,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  BookOpen,
  Megaphone,
  HeartPulse,
  BarChart3,
  GraduationCap
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId, extra?: unknown) => void;
  language: Language;
}

const PillarIcon: React.FC<{ icon: string; className?: string }> = ({ icon, className = 'w-6 h-6' }) => {
  switch (icon) {
    case 'Megaphone':
      return <Megaphone className={className} />;
    case 'HeartPulse':
      return <HeartPulse className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'BarChart3':
      return <BarChart3 className={className} />;
    case 'GraduationCap':
      return <GraduationCap className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, language }) => {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('barmer');
  const [activeStoryIndex, setActiveStoryIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(38);

  const selectedDistrict = DISTRICTS.find((d) => d.id === selectedDistrictId) || DISTRICTS[0];
  const activeStory = STORIES[activeStoryIndex] || STORIES[0];

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      setAudioProgress(45);
    }
  };

  return (
    <div className="w-full bg-stone-50 text-slate-900">
      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white overflow-hidden">
        {/* Background Image with Warm Duotone Scrim */}
        <div className="absolute inset-0 z-0">
          <picture>
            <source media="(max-width: 640px)" srcSet="/hero-mobile.jpg" />
            <img
              src="/hero.jpg"
              alt="LIFE field communication session with desert villagers in Rajasthan"
              className="w-full h-full object-cover object-[60%_center] opacity-40 scale-105 transform motion-safe:transition-transform motion-safe:duration-1000"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent hidden lg:block" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36 min-h-[580px] sm:min-h-[680px] flex flex-col justify-end">
          <div className="max-w-3xl space-y-6">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>
                {language === 'en'
                  ? '30+ Years of Proven Last-Mile Impact in Rajasthan'
                  : 'राजस्थान के सुदूर क्षेत्रों में 30+ वर्षों का विश्वसनीय कार्य'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight text-white">
              {language === 'en' ? (
                <>
                  Where roads end, <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
                    life-saving awareness
                  </span>{' '}
                  begins.
                </>
              ) : (
                <>
                  जहाँ सड़कें खत्म होती हैं, <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
                    संवाद और जीवन रक्षा
                  </span>{' '}
                  वहाँ से शुरू होती है।
                </>
              )}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
              {language === 'en'
                ? 'A government scheme unknown helps nobody. Since 1994, LIFE (I.I.D.C.) has deployed localized audio dramas, puppet caravans, and certified master trainers to carry health, literacy, and rights to Rajasthan’s most isolated desert hamlets.'
                : 'जिस योजना की जानकारी न हो, वह किसी काम की नहीं। 1994 से, LIFE लोक नाटकों, ऑडियो संदेशों और मास्टर प्रशिक्षकों के माध्यम से राजस्थान के दूरदराज इलाकों तक स्वास्थ्य, शिक्षा और अधिकार पहुँचा रहा है।'}
            </p>

            {/* Dual High-Converting CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
              <button
                onClick={() => onNavigate('donate')}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 text-slate-950 shadow-xl shadow-amber-500/25 hover:shadow-2xl hover:shadow-amber-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Heart className="w-5 h-5 fill-slate-950 group-hover:scale-110 transition-transform" />
                <span>{language === 'en' ? 'Support Our Work (80G Tax Exempt)' : 'दान करें (80G आयकर छूट)'}</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('work')}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/15 text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer"
              >
                <span>{language === 'en' ? 'Explore 6 Programme Pillars' : 'हमारे ६ कार्यक्षेत्र देखें'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Fast reassurance metrics */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                80G & 12A Certified Society
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-300">
                <Award className="w-4 h-4 text-amber-400" />
                Commended by Governor of Rajasthan
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-300">
                <Users className="w-4 h-4 text-sky-400" />
                160,000+ Beneficiaries
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Global Trust Strip */}
      <TrustBadgesBar />

      {/* Live Animated Impact Counter Strip */}
      <section className="bg-white border-b border-slate-200/80 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {IMPACT_STATS.map((stat, idx) => (
              <div key={stat.label} className={`pt-4 sm:pt-0 ${idx > 0 ? 'sm:pl-6' : ''}`}>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                    {stat.value}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-800 mt-1">
                  {stat.label}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {stat.subtext}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Rajasthan District Impact Explorer (Competitive Showcase) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Interactive Field Geographic Map</span>
              </div>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                {language === 'en' ? 'Active Field Groundwork Across Rajasthan' : 'राजस्थान में हमारे सक्रिय फील्ड अभियान'}
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                {language === 'en'
                  ? 'Each district of Rajasthan presents unique challenges — from extreme desert distances in Barmer to tribal literacy in Udaipur. Select a district below to see live interventions.'
                  : 'राजस्थान का प्रत्येक जिला विशिष्ट चुनौतियों से घिरा है। नीचे किसी भी जिले का चयन कर हमारे धरातलीय कार्य देखें।'}
              </p>
            </div>

            <button
              onClick={() => onNavigate('work')}
              className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-sm font-semibold self-start md:self-end"
            >
              <span>View All Past Initiatives</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* District Tabs Selector */}
          <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
            {DISTRICTS.map((dist) => {
              const isSelected = dist.id === selectedDistrictId;
              return (
                <button
                  key={dist.id}
                  onClick={() => setSelectedDistrictId(dist.id)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-bold scale-[1.02]'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>{dist.name}</span>
                  <span className="text-[10px] opacity-75 font-sans-devanagari">({dist.nameHi})</span>
                </button>
              );
            })}
          </div>

          {/* District Highlight Card */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0 backdrop-blur-md">
            {/* Image Column */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
              <img
                src={selectedDistrict.image}
                alt={selectedDistrict.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900" />
              <div className="absolute bottom-4 left-4 right-4 lg:hidden">
                <span className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider">
                  {selectedDistrict.name}
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
                    District Focus Profile
                  </span>
                  <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                    {selectedDistrict.stats.activePrograms} Active Grassroots Schemes
                  </span>
                </div>

                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
                  {selectedDistrict.keyInitiative}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {selectedDistrict.description}
                </p>
              </div>

              {/* District Stat Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-700/60">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                  <span className="block font-serif-display text-xl sm:text-2xl font-bold text-amber-400">
                    {selectedDistrict.stats.villages}
                  </span>
                  <span className="block text-[11px] text-slate-400 mt-0.5">Villages Covered</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                  <span className="block font-serif-display text-xl sm:text-2xl font-bold text-emerald-400">
                    {selectedDistrict.stats.beneficiaries}
                  </span>
                  <span className="block text-[11px] text-slate-400 mt-0.5">Citizens Reached</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                  <span className="block font-serif-display text-xl sm:text-2xl font-bold text-sky-400">
                    100%
                  </span>
                  <span className="block text-[11px] text-slate-400 mt-0.5">Local Dialects</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('work')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  <span>Read Field Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onNavigate('donate')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sponsor a Caravan in {selectedDistrict.name}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 6 Programme Pillars */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-amber-800 text-xs font-bold uppercase tracking-widest">
              Comprehensive Strategic Framework
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Our 6 Pillars of Intervention
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We do not believe in one-off aid. We build institutional communication capacity, research-backed policies, and community leadership that lasts generations.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                onClick={() => onNavigate('work')}
                className="group bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-4">
                  {/* Icon & Metric Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300 shadow-xs">
                      <PillarIcon icon={pillar.iconName} className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-sm text-slate-900">
                        {pillar.metric}
                      </span>
                      <span className="block text-[10px] text-slate-500">
                        {pillar.metricLabel}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif-display text-xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                    {language === 'en' ? pillar.title : pillar.titleHi}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {language === 'en' ? pillar.description : pillar.descriptionHi}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-800 group-hover:text-amber-900">
                  <span>Explore Initiatives</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaign Deep Dive with Audio Story Simulator */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Documentary Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=1000"
                alt="Maternal Health Caravan in Barmer"
                className="w-full h-[440px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-500 text-slate-950 inline-block">
                  Flagship Field Initiative
                </span>
                <h4 className="font-serif-display text-xl font-bold">
                  Maternal Health Literacy & Audio Drama Caravan
                </h4>
                <p className="text-xs text-slate-300">
                  Barmer District • 45,000 Mothers Empowered • Institutional Deliveries Up 42%
                </p>
              </div>
            </div>

            {/* Audio Broadcast Player Preview Simulator */}
            <div className="mt-4 p-4 rounded-xl bg-slate-900 text-white border border-slate-800 shadow-xl flex items-center gap-4">
              <button
                onClick={toggleAudio}
                className="w-12 h-12 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md transition-transform hover:scale-105 cursor-pointer"
                title={isPlayingAudio ? 'Pause broadcast' : 'Play audio snippet'}
              >
                {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>

              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-semibold text-slate-200">
                      Radio Drama Snippet: Kavita Ki Kahani (Marwari)
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">0:45 / 1:20</span>
                </div>

                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${audioProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
              <span>Why Communication Matters</span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              A ₹6,000 welfare grant is worthless if the mother has never heard of it.
            </h2>

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                In the desert blocks of Barmer, government hospitals had prepared free delivery rooms and cash incentives under the Janani Suraksha Yojana. Yet, neonatal complications remained severe because families didn’t trust bureaucratic circulars.
              </p>
              <p>
                LIFE built a localized communication campaign: folk puppet dramas, solar audio broadcasts under village banyan trees, and trained woman-to-woman peer counselors speaking Marwari.
              </p>
              <p>
                Within six months, institutional hospital deliveries in participating desert panchayats jumped by <strong>42%</strong>. When communication is designed for the recipient instead of the bureaucrat, development works.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('programme-detail', 'barmer-maternal-health')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors cursor-pointer"
              >
                <span>Read Full Campaign Methodology</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('donate', { amount: 1500, frequency: 'one-time' })}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100 font-semibold text-sm transition-colors cursor-pointer"
              >
                <Heart className="w-4 h-4 text-amber-600 fill-amber-600" />
                <span>Sponsor a Village Caravan (₹1,500)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Voices of the Grassroots (Stories of Transformation) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-100/60">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-amber-800 text-xs font-bold uppercase tracking-widest">
              Real Lives, Real Impact
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900">
              Voices from the Grassroots
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Listen to the community members whose lives were altered through timely information and empowerment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STORIES.map((story, idx) => (
              <div
                key={story.id}
                onClick={() => setActiveStoryIndex(idx)}
                className={`bg-white rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                  activeStoryIndex === idx
                    ? 'border-amber-400 shadow-xl ring-2 ring-amber-400/20'
                    : 'border-slate-200/80 shadow-xs hover:shadow-md'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-amber-400/60"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{story.name}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-500" />
                        <span>{story.location}</span>
                      </p>
                    </div>
                  </div>

                  <p className="font-serif-display text-base text-slate-800 italic leading-snug">
                    &ldquo;{story.quote}&rdquo;
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {story.story}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{story.impactMetric}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Transparency & 100% Trust Meter */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-amber-800 text-xs font-bold uppercase tracking-widest">
              Uncompromising Accountability
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900">
              Where Every Rupee of Your Donation Goes
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              We honor every donor’s trust. We publish audited balance sheets and ensure maximum efficiency directly on the ground.
            </p>
          </div>

          {/* Progress Bar Breakdown */}
          <div className="space-y-4">
            <div className="h-5 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
              <div
                style={{ width: '88%' }}
                className="bg-emerald-500 h-full flex items-center justify-center text-[10px] text-white font-bold"
                title="88% Direct Program Outreach"
              >
                88%
              </div>
              <div
                style={{ width: '7%' }}
                className="bg-amber-500 h-full flex items-center justify-center text-[10px] text-slate-950 font-bold"
                title="7% Field Research & Monitoring"
              >
                7%
              </div>
              <div
                style={{ width: '5%' }}
                className="bg-indigo-600 h-full flex items-center justify-center text-[10px] text-white font-bold"
                title="5% Admin & Governance"
              >
                5%
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {FINANCIAL_BREAKDOWN.map((item) => (
                <div key={item.category} className="p-4 rounded-xl border border-slate-200/70 bg-stone-50">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="font-serif-display text-xl font-bold text-slate-900">
                      {item.percentage}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">
                    {item.category}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* High-Converting Donation Band */}
      <DonationBand onNavigate={onNavigate} />

      {/* Institutional Endorsements & Partners */}
      <section className="bg-stone-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Trusted By State & National Institutions
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Collaborating with academic bodies, public health forums, and international agencies
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-xs text-xs font-semibold text-slate-800 flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-amber-500" />
                <span>{partner.name}</span>
                <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  {partner.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
