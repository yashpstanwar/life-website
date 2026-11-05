import React from 'react';
import { ShieldCheck, FileCheck, Award, HeartHandshake } from 'lucide-react';
import { ORG } from '../data';

export const TrustBadgesBar: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 border-y border-slate-800 text-slate-300 py-3 px-4 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong className="text-white">80G Tax Exemption:</strong> 50% deduction on all gifts under Section 80G
          </span>
        </div>

        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-white">Government Reg:</strong> {ORG.registrationNumber} • PAN: {ORG.panNumber}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <Award className="w-4 h-4 text-sky-400 shrink-0" />
          <span>
            <strong className="text-white">30+ Years Proven:</strong> Serving rural Rajasthan since 1994
          </span>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-rose-400 shrink-0" />
          <span className="text-slate-400">100% Transparency Guarantee</span>
        </div>
      </div>
    </div>
  );
};
