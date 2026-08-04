import React from 'react';
import { PageId } from '../types';
import { OBJECTIVES, GOVERNING_BODY } from '../data';
import { Download, FileText, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = () => {
  const reportsList = [
    { year: '2025–2026', title: 'Annual Report & Audited Accounts', size: '3.4 MB PDF' },
    { year: '2024–2025', title: 'Annual Report & Audited Accounts', size: '2.9 MB PDF' },
    { year: '2023–2024', title: 'Annual Report & Audited Accounts', size: '3.1 MB PDF' },
    { year: '2022–2023', title: 'Annual Report & Audited Accounts', size: '2.7 MB PDF' },
  ];

  return (
    <div className="w-full bg-[#EFEDE6] text-[#14160F]">
      
      {/* Page Header (No hero photography as per A1 specification) */}
      <section className="bg-[#101C3A] text-[#EFEDE6] py-16 px-4 sm:px-8 hairline-b">
        <div className="max-w-7xl mx-auto space-y-3">
          <span className="font-mono text-xs text-[#8E9BB5] uppercase tracking-widest">
            INSTITUTIONAL PROFILE
          </span>
          <h1 className="font-fraunces text-4xl sm:text-5xl font-bold text-[#EFEDE6]">
            About & Objectives
          </h1>
          <p className="font-sans-devanagari text-base text-[#8E9BB5] max-w-2xl">
            Indian Institute of Development and Communication (I.I.D.C.) — Registered Society, Jaipur, Rajasthan.
          </p>
        </div>
      </section>

      {/* A1: Section "Who we are" (680px reading column) */}
      <section className="py-16 px-4 sm:px-8 hairline-b bg-[#EFEDE6]">
        <div className="max-w-[680px] mx-auto space-y-6">
          <span className="font-mono text-xs text-[#8E9BB5] uppercase tracking-widest block">
            WHO WE ARE
          </span>
          <h2 className="font-fraunces text-3xl font-bold text-[#101C3A]">
            Carrying development communication the last mile.
          </h2>
          
          <div className="space-y-4 font-sans-devanagari text-base text-[#14160F] leading-relaxed">
            <p>
              The Indian Institute of Development and Communication (I.I.D.C.), known as LIFE, is an autonomous, non-profit society established in Jaipur, Rajasthan [placeholder]. Founded to bridge the critical gap between development policy formulation and grassroots execution, the institute specializes in designing culturally resonant audio-visual communication campaigns, conducting independent socio-economic field research, and training rural health and literacy workers across Rajasthan and neighboring regions.
            </p>
            <p>
              Operating without political affiliation and dedicated strictly to non-profit social reform, I.I.D.C. collaborates with government departments, educational bodies, and civil society institutions to ensure public welfare schemes reach deprived communities with clarity, empathy, and measurable impact [placeholder].
            </p>
          </div>
        </div>
      </section>

      {/* A1 & A2: Section "Our objectives" (Numbered rows 1 to 14) */}
      <section className="py-16 px-4 sm:px-8 bg-[#EFEDE6] hairline-b">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <span className="font-mono text-xs text-[#8E9BB5] uppercase tracking-widest block">
              INSTITUTIONAL MANDATE
            </span>
            <h2 className="font-fraunces text-3xl font-bold text-[#101C3A] mt-1">
              Our Objectives
            </h2>
            <div className="w-16 h-0.5 bg-[#E39B2C] mt-2"></div>
          </div>

          <div className="divide-y divide-[#8E9BB5]/30 hairline-all rounded-[4px] bg-white overflow-hidden">
            {OBJECTIVES.map((obj, index) => {
              const numStr = (index + 1).toString().padStart(2, '0');
              return (
                <div key={index} className="flex items-start p-4 sm:p-5 hover:bg-[#EFEDE6]/40 transition-colors">
                  <span className="font-mono text-sm font-bold text-[#E39B2C] w-12 flex-shrink-0 pt-0.5">
                    {numStr}
                  </span>
                  <p className="font-sans-devanagari text-sm sm:text-base text-[#14160F] leading-relaxed">
                    {obj}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* A2: Section "Governing body" (Four-across portrait grid) */}
      <section className="py-16 px-4 sm:px-8 bg-[#EFEDE6] hairline-b">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <span className="font-mono text-xs text-[#8E9BB5] uppercase tracking-widest block">
              LEADERSHIP & AUDIT
            </span>
            <h2 className="font-fraunces text-3xl font-bold text-[#101C3A] mt-1">
              Governing Body
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GOVERNING_BODY.map((member, i) => (
              <div key={i} className="bg-white p-6 rounded-[4px] hairline-all space-y-3">
                {/* Silhouette portrait placeholder */}
                <div className="w-16 h-16 bg-[#101C3A]/10 text-[#101C3A] rounded-[4px] flex items-center justify-center font-mono font-bold text-lg">
                  [P{i+1}]
                </div>
                <div>
                  <h3 className="font-fraunces text-lg font-bold text-[#101C3A]">
                    {member.name}
                  </h3>
                  <p className="font-mono text-xs text-[#E39B2C] uppercase tracking-wider">
                    {member.role}
                  </p>
                </div>
                <p className="font-sans-devanagari text-xs text-[#8E9BB5] leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A3: Transparency Section on #101C3A */}
      <section className="bg-[#101C3A] text-[#EFEDE6] py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div>
            <span className="font-mono text-xs text-[#8E9BB5] uppercase tracking-widest block">
              FINANCIAL ACCOUNTABILITY & GOVERNANCE
            </span>
            <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-[#EFEDE6] mt-1">
              Transparency & Regulatory Compliance
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 7 Cols: Year-by-year list of annual reports */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#8E9BB5]">
                ANNUAL AUDITED REPORTS & FINANCIALS
              </h3>
              <div className="divide-y divide-[#8E9BB5]/30 border-t border-b border-[#8E9BB5]/30">
                {reportsList.map((item, idx) => (
                  <div key={idx} className="py-3.5 flex items-center justify-between hover:bg-[#142348] px-2 transition-colors">
                    <div>
                      <span className="font-mono text-xs text-[#E39B2C] mr-3">{item.year}</span>
                      <span className="font-sans-devanagari text-sm text-[#EFEDE6]">{item.title}</span>
                    </div>
                    <div className="flex items-center space-x-3 font-mono text-xs text-[#8E9BB5]">
                      <span>{item.size}</span>
                      <button
                        onClick={() => alert(`Downloading ${item.title} (${item.year})`)}
                        className="text-[#2C6E8F] hover:text-[#E39B2C] p-1 cursor-pointer"
                        title="Download Document"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: Certificates block */}
            <div className="lg:col-span-5 bg-[#142348] p-6 rounded-[4px] border border-[#8E9BB5]/30 space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#E39B2C]">
                INSTITUTIONAL CERTIFICATES
              </h3>
              <div className="space-y-3 font-mono text-xs text-[#8E9BB5]">
                <div className="flex items-center justify-between p-3 bg-[#101C3A] rounded-[4px] border border-[#8E9BB5]/20">
                  <div className="flex items-center space-x-2">
                    <FileText size={16} className="text-[#2C6E8F]" />
                    <span className="text-[#EFEDE6]">Society Registration Certificate</span>
                  </div>
                  <span>Reg. No. [placeholder]</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#101C3A] rounded-[4px] border border-[#8E9BB5]/20">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-[#2C6E8F]" />
                    <span className="text-[#EFEDE6]">Income Tax 12A Certificate</span>
                  </div>
                  <span>12A [placeholder]</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#101C3A] rounded-[4px] border border-[#8E9BB5]/20">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-[#2C6E8F]" />
                    <span className="text-[#EFEDE6]">Tax Exemption 80G Approval</span>
                  </div>
                  <span>80G [placeholder]</span>
                </div>
              </div>
            </div>
          </div>

          {/* "Where your money goes" — horizontal 100% stacked bar in #E39B2C, #2C6E8F, #8E9BB5 */}
          <div className="space-y-4 border-t border-[#8E9BB5]/30 pt-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#8E9BB5]">
              WHERE YOUR MONEY GOES (ANNUAL BUDGET UTILIZATION)
            </h3>
            
            {/* 100% stacked bar */}
            <div className="w-full h-8 bg-[#142348] rounded-[4px] flex overflow-hidden border border-[#8E9BB5]/30">
              <div style={{ width: '78%' }} className="bg-[#E39B2C] h-full flex items-center justify-center font-mono text-[11px] font-bold text-[#101C3A]" title="78% Programmes">
                78%
              </div>
              <div style={{ width: '15%' }} className="bg-[#2C6E8F] h-full flex items-center justify-center font-mono text-[11px] font-bold text-[#EFEDE6]" title="15% Training">
                15%
              </div>
              <div style={{ width: '7%' }} className="bg-[#8E9BB5] h-full flex items-center justify-center font-mono text-[11px] font-bold text-[#101C3A]" title="7% Admin">
                7%
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-6 font-mono text-xs text-[#8E9BB5]">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#E39B2C] rounded-[1px]"></div>
                <span>Direct Field Programmes & Campaigns: [placeholder]%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#2C6E8F] rounded-[1px]"></div>
                <span>Volunteer & Master Training: [placeholder]%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#8E9BB5] rounded-[1px]"></div>
                <span>Administration & Governance: [placeholder]%</span>
              </div>
            </div>
          </div>

          {/* Definition List */}
          <div className="border-t border-[#8E9BB5]/30 pt-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#8E9BB5] mb-4">
              REGISTERED LEGAL DEFINITION
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-3 bg-[#142348] rounded-[4px] space-y-1">
                <span className="text-[#8E9BB5] block">REGISTERED NAME</span>
                <span className="text-[#EFEDE6] font-bold">Indian Institute of Development and Communication (I.I.D.C.)</span>
              </div>
              <div className="p-3 bg-[#142348] rounded-[4px] space-y-1">
                <span className="text-[#8E9BB5] block">LEGAL ENTITY</span>
                <span className="text-[#EFEDE6]">Registered Society, Jaipur, Rajasthan</span>
              </div>
              <div className="p-3 bg-[#142348] rounded-[4px] space-y-1">
                <span className="text-[#8E9BB5] block">REGISTRATION NUMBER</span>
                <span className="text-[#EFEDE6] font-bold">Reg. No. [placeholder]</span>
              </div>
              <div className="p-3 bg-[#142348] rounded-[4px] space-y-1">
                <span className="text-[#8E9BB5] block">TAX EXEMPTION STATUS</span>
                <span className="text-[#EFEDE6] font-bold">12A & 80G [placeholder]</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
