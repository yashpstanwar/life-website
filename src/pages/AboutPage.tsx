import React from 'react';
import { PageId, Language } from '../types';
import { OBJECTIVES, ORG, MILESTONES, IMPACT_STATS, FINANCIAL_BREAKDOWN } from '../data';
import { Download, FileText, CheckCircle2, ShieldCheck, Award, Users, HeartHandshake, MapPin } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  language?: Language;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, language = 'en' }) => {
  const reportsList = [
    { year: '2025–2026', title: 'Audited Financial Accounts & Annual Dispatch', size: '3.4 MB PDF' },
    { year: '2024–2025', title: 'Audited Financial Statements & Field Outcomes', size: '2.9 MB PDF' },
    { year: '2023–2024', title: 'Annual Report & External Evaluation Survey', size: '3.1 MB PDF' },
    { year: '2022–2023', title: 'Consolidated Audited Accounts & Balance Sheet', size: '2.7 MB PDF' },
  ];

  return (
    <div className="w-full bg-stone-50 text-slate-900 pb-20">
      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>Serving Rajasthan Since 1994</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
            {language === 'en'
              ? 'Over 30 Years of Carrying Development the Last Mile'
              : 'विकास को अंतिम व्यक्ति तक पहुँचाने का ३० वर्षों का अनुभव'}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            The Indian Institute of Development and Communication (I.I.D.C.), known as LIFE, is an autonomous, non-profit society founded in Jaipur to ensure government policy translates into genuine human dignity.
          </p>
        </div>
      </section>

      {/* Story & Authentic Office Photography Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">
              Our Founding Story & Philosophy
            </span>

            <h2 className="font-serif-display text-2xl sm:text-4xl font-bold text-slate-900 leading-tight">
              &ldquo;Change doesn't arrive on its own. Someone has to carry it.&rdquo;
            </h2>

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                In 1994, a group of dedicated communicators, social researchers, and public welfare advocates founded I.I.D.C. in Jaipur. They noticed a painful paradox: India’s governments were designing well-funded welfare programs for maternal survival, child literacy, and clean water, yet rural communities remained trapped in poverty simply because the information never reached them in an understandable, trustworthy form.
              </p>
              <p>
                Bureaucratic jargon, literacy gaps, and geographic isolation in the Thar desert created a wall between citizens and their rights. LIFE was founded to tear down that wall.
              </p>
              <p>
                Over three decades, we have deployed battery-powered audio cassettes, puppet caravans, radio dramas in Marwari and Mewari, and trained over 1,750 village master educators to bridge that last mile.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                <span className="font-serif-display text-2xl font-bold text-slate-900 block">1994</span>
                <span className="text-xs text-slate-500">Year Founded in Jaipur</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                <span className="font-serif-display text-2xl font-bold text-amber-800 block">87+</span>
                <span className="text-xs text-slate-500">Villages Transformed</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                <span className="font-serif-display text-2xl font-bold text-emerald-800 block">100%</span>
                <span className="text-xs text-slate-500">Non-Profit & Secular</span>
              </div>
            </div>
          </div>

          {/* Real Office Photos Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
              <img
                src="/images/office-1.jpg"
                alt="LIFE IIDC Jaipur Office & Training Facility"
                className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-3 bg-white border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>LIFE Headquarters & Audio Studio, Jhotwara, Jaipur</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
              <img
                src="/images/office-2.jpg"
                alt="LIFE Institute Field Meeting Room"
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-3 bg-white border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Field Planning, Resource Center & Master Trainer Wing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 30-Year Milestones Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">
              Historical Timeline
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900">
              Three Decades of Grassroots Commitment
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Key moments that shaped development communication across Western Rajasthan
            </p>
          </div>

          <div className="relative border-l-2 border-amber-300 ml-4 sm:ml-32 space-y-8">
            {MILESTONES.map((m, idx) => (
              <div key={m.year} className="relative pl-6 sm:pl-8 group">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-amber-500 border-4 border-white shadow-xs" />
                
                <div className="sm:absolute sm:-left-32 sm:top-1 sm:text-right sm:w-24">
                  <span className="font-serif-display text-lg font-bold text-amber-900 block">
                    {m.year}
                  </span>
                </div>

                <div className="bg-stone-50 rounded-xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                  <h4 className="font-serif-display text-lg font-bold text-slate-900">
                    {m.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Objectives (Mandate 1-14) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">
            Institutional Mandate
          </span>
          <h2 className="font-serif-display text-3xl font-bold text-slate-900">
            Our 14 Core Objectives
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Enshrined in the Constitution of the Indian Institute of Development and Communication
          </p>
        </div>

        <div className="divide-y divide-slate-100 rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-xs">
          {OBJECTIVES.map((obj, index) => {
            const numStr = (index + 1).toString().padStart(2, '0');
            return (
              <div key={index} className="flex items-start p-4 sm:p-5 hover:bg-stone-50 transition-colors">
                <span className="font-serif-display text-base font-bold text-amber-800 w-10 shrink-0 pt-0.5">
                  {numStr}
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {obj}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Transparency, Regulatory Compliance & Downloadable Reports */}
      <section className="bg-slate-950 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Financial Accountability & Governance
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-white">
              Transparency, Audited Accounts & Certifications
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl">
              As an 80G registered society, our accounts are audited annually by certified Chartered Accountants and submitted to regulatory authorities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Credentials Card (5 cols) */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="font-serif-display text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Statutory Registrations</span>
              </h3>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Society Registration Number:</span>
                  <span className="font-mono text-white font-bold">{ORG.registrationNumber}</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Rajasthan Societies Registration Act, 1958</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Permanent Account Number (PAN):</span>
                  <span className="font-mono text-amber-400 font-bold">{ORG.panNumber}</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Income Tax Exemption Status:</span>
                  <span className="font-bold text-emerald-400">{ORG.taxExemption}</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">NITI Aayog NGO Darpan Enrolment:</span>
                  <span className="font-mono text-white">{ORG.nitiAayogId}</span>
                </div>
              </div>
            </div>

            {/* Audited Reports Downloads (7 cols) */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="font-serif-display text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <span>Download Audited Dispatches & Reports</span>
              </h3>

              <div className="space-y-2.5">
                {reportsList.map((rep) => (
                  <div
                    key={rep.year}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <span className="text-xs font-bold text-amber-400 block">{rep.year}</span>
                      <h4 className="text-xs sm:text-sm font-semibold text-white">{rep.title}</h4>
                      <span className="text-[11px] text-slate-500">{rep.size}</span>
                    </div>

                    <button
                      onClick={() => alert(`Downloading ${rep.title} for ${rep.year}...`)}
                      className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
