import React, { useState } from 'react';
import { PageId } from '../types';
import { Heart, CheckCircle2 } from 'lucide-react';

interface GetInvolvedPageProps {
  onNavigate: (page: PageId) => void;
}

export const GetInvolvedPage: React.FC<GetInvolvedPageProps> = () => {
  const [pledgeType, setPledgeType] = useState<'Blood Donation' | 'Eye Donation'>('Blood Donation');
  const [pledgeSubmitted, setPledgeSubmitted] = useState(false);
  const [pledgeData, setPledgeData] = useState({ name: '', email: '', phone: '', city: 'Jaipur' });

  const [volSubmitted, setVolSubmitted] = useState<string | null>(null);

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPledgeSubmitted(true);
    setTimeout(() => {
      setPledgeSubmitted(false);
      setPledgeData({ name: '', email: '', phone: '', city: 'Jaipur' });
    }, 4000);
  };

  const handleCardFormSubmit = (cardType: string, e: React.FormEvent) => {
    e.preventDefault();
    setVolSubmitted(cardType);
    setTimeout(() => setVolSubmitted(null), 4000);
  };

  return (
    <div className="w-full bg-[#EFEDE6] text-[#14160F]">
      
      {/* Header Band */}
      <section className="bg-[#101C3A] text-[#EFEDE6] py-16 px-4 sm:px-8 hairline-b">
        <div className="max-w-7xl mx-auto space-y-3">
          <span className="font-mono text-xs text-[#8E9BB5] uppercase tracking-widest">
            COMMUNITY & INSTITUTIONAL PARTICIPATION
          </span>
          <h1 className="font-fraunces text-4xl sm:text-5xl font-bold text-[#EFEDE6]">
            Get Involved
          </h1>
          <p className="font-sans-devanagari text-base text-[#8E9BB5] max-w-2xl">
            Join LIFE's mission across Rajasthan as a volunteer, academic intern, or institutional partner.
          </p>
        </div>
      </section>

      {/* Main Content: Three Equal Columns on #EFEDE6 — Volunteer, Intern, Partner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-16">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Volunteer */}
          <div className="bg-white p-6 rounded-[4px] hairline-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase text-[#E39B2C] font-bold tracking-wider">
                OPTION 01
              </span>
              <h2 className="font-fraunces text-2xl font-bold text-[#101C3A]">
                Volunteer
              </h2>
              <p className="font-sans-devanagari text-sm text-[#14160F] leading-relaxed">
                Join our field caravans and community survey teams across Rajasthan districts to spread vital literacy and health messaging.
              </p>
            </div>

            {volSubmitted === 'Volunteer' ? (
              <div className="p-3 bg-[#101C3A] text-[#E39B2C] rounded-[4px] font-mono text-xs flex items-center space-x-2">
                <CheckCircle2 size={16} />
                <span>Volunteer enquiry received!</span>
              </div>
            ) : (
              <form onSubmit={(e) => handleCardFormSubmit('Volunteer', e)} className="space-y-3 font-sans-devanagari text-xs">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  className="w-full bg-[#EFEDE6] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  className="w-full bg-[#EFEDE6] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold"
                />
                <input
                  type="tel"
                  placeholder="Mobile Phone (+91)"
                  className="w-full bg-[#EFEDE6] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold font-mono"
                />
                <textarea
                  rows={2}
                  placeholder="Message / Availability..."
                  className="w-full bg-[#EFEDE6] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#101C3A] text-[#EFEDE6] font-bold rounded-[4px] hover:bg-[#E39B2C] hover:text-[#101C3A] transition-colors cursor-pointer"
                >
                  Submit Volunteer Request
                </button>
              </form>
            )}
          </div>

          {/* Column 2: Intern */}
          <div className="bg-white p-6 rounded-[4px] hairline-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase text-[#E39B2C] font-bold tracking-wider">
                OPTION 02
              </span>
              <h2 className="font-fraunces text-2xl font-bold text-[#101C3A]">
                Intern
              </h2>
              <p className="font-sans-devanagari text-sm text-[#14160F] leading-relaxed">
                Gain hands-on academic research experience evaluating government schemes and designing development communication media.
              </p>
            </div>

            {volSubmitted === 'Intern' ? (
              <div className="p-3 bg-[#101C3A] text-[#E39B2C] rounded-[4px] font-mono text-xs flex items-center space-x-2">
                <CheckCircle2 size={16} />
                <span>Internship application received!</span>
              </div>
            ) : (
              <form onSubmit={(e) => handleCardFormSubmit('Intern', e)} className="space-y-3 font-sans-devanagari text-xs">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  className="w-full bg-[#EFEDE6] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  className="w-full bg-[#EFEDE6] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold"
                />
                <input
                  type="tel"
                  placeholder="Mobile Phone (+91)"
                  className="w-full bg-[#EFEDE6] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold font-mono"
                />
                <textarea
                  rows={2}
                  placeholder="University / Specialization..."
                  className="w-full bg-[#EFEDE6] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#101C3A] text-[#EFEDE6] font-bold rounded-[4px] hover:bg-[#E39B2C] hover:text-[#101C3A] transition-colors cursor-pointer"
                >
                  Submit Internship Application
                </button>
              </form>
            )}
          </div>

          {/* Column 3: Partner */}
          <div className="bg-white p-6 rounded-[4px] hairline-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase text-[#E39B2C] font-bold tracking-wider">
                OPTION 03
              </span>
              <h2 className="font-fraunces text-2xl font-bold text-[#101C3A]">
                Partner
              </h2>
              <p className="font-sans-devanagari text-sm text-[#14160F] leading-relaxed">
                Commission independent field evaluation surveys or co-design CSR health and education communication campaigns.
              </p>
            </div>

            {volSubmitted === 'Partner' ? (
              <div className="p-3 bg-[#101C3A] text-[#E39B2C] rounded-[4px] font-mono text-xs flex items-center space-x-2">
                <CheckCircle2 size={16} />
                <span>Partnership proposal received!</span>
              </div>
            ) : (
              <form onSubmit={(e) => handleCardFormSubmit('Partner', e)} className="space-y-3 font-sans-devanagari text-xs">
                <input
                  type="text"
                  required
                  placeholder="Organisation / Institution *"
                  className="w-full bg-[#EFEDE6] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold"
                />
                <input
                  type="email"
                  required
                  placeholder="Official Email *"
                  className="w-full bg-[#EFEDE6] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold"
                />
                <input
                  type="tel"
                  placeholder="Contact Phone (+91)"
                  className="w-full bg-[#EFEDE6] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold font-mono"
                />
                <textarea
                  rows={2}
                  placeholder="Scope of collaboration..."
                  className="w-full bg-[#EFEDE6] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#101C3A] text-[#EFEDE6] font-bold rounded-[4px] hover:bg-[#E39B2C] hover:text-[#101C3A] transition-colors cursor-pointer"
                >
                  Send Partnership Proposal
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Full-width Block on #101C3A Headed "Pledge to donate blood or eyes" */}
        <div className="bg-[#101C3A] text-[#EFEDE6] p-8 sm:p-12 rounded-[4px] space-y-8">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <div className="w-12 h-12 bg-[#E39B2C] text-[#101C3A] rounded-full flex items-center justify-center mx-auto">
              <Heart size={24} />
            </div>
            <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-[#EFEDE6]">
              Pledge to donate blood or eyes
            </h2>
            <p className="font-sans-devanagari text-sm text-[#8E9BB5]">
              As part of LIFE's Health & Social Reform pillar, we maintain an active donor registry for emergency blood drives and eye donation awareness across Rajasthan.
            </p>
          </div>

          {/* Two Toggle Chips */}
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => setPledgeType('Blood Donation')}
              className={`px-6 py-2.5 rounded-[4px] font-mono text-xs font-bold border transition-all cursor-pointer ${
                pledgeType === 'Blood Donation'
                  ? 'bg-[#E39B2C] text-[#101C3A] border-[#E39B2C]'
                  : 'bg-[#101C3A] text-[#8E9BB5] border-[#8E9BB5]/40 hover:text-[#EFEDE6]'
              }`}
            >
              BLOOD DONATION PLEDGE
            </button>
            <button
              type="button"
              onClick={() => setPledgeType('Eye Donation')}
              className={`px-6 py-2.5 rounded-[4px] font-mono text-xs font-bold border transition-all cursor-pointer ${
                pledgeType === 'Eye Donation'
                  ? 'bg-[#E39B2C] text-[#101C3A] border-[#E39B2C]'
                  : 'bg-[#101C3A] text-[#8E9BB5] border-[#8E9BB5]/40 hover:text-[#EFEDE6]'
              }`}
            >
              EYE DONATION PLEDGE
            </button>
          </div>

          {/* Short Pledge Form */}
          {pledgeSubmitted ? (
            <div className="max-w-xl mx-auto p-4 bg-[#142348] border border-[#E39B2C] text-[#E39B2C] rounded-[4px] font-mono text-sm text-center flex items-center justify-center space-x-2">
              <CheckCircle2 size={18} />
              <span>Thank you! Your {pledgeType} pledge has been registered with LIFE Society.</span>
            </div>
          ) : (
            <form onSubmit={handlePledgeSubmit} className="max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans-devanagari text-xs">
              <div>
                <label className="block font-mono text-xs text-[#8E9BB5] mb-1">PLEDGER FULL NAME *</label>
                <input
                  type="text"
                  required
                  value={pledgeData.name}
                  onChange={(e) => setPledgeData({ ...pledgeData, name: e.target.value })}
                  placeholder="Enter name"
                  className="w-full bg-[#EFEDE6] text-[#14160F] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-[#8E9BB5] mb-1">EMAIL ADDRESS *</label>
                <input
                  type="email"
                  required
                  value={pledgeData.email}
                  onChange={(e) => setPledgeData({ ...pledgeData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full bg-[#EFEDE6] text-[#14160F] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-[#8E9BB5] mb-1">MOBILE NUMBER (+91) *</label>
                <input
                  type="tel"
                  required
                  value={pledgeData.phone}
                  onChange={(e) => setPledgeData({ ...pledgeData, phone: e.target.value })}
                  placeholder="9876543210"
                  className="w-full bg-[#EFEDE6] text-[#14160F] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold font-mono"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-[#8E9BB5] mb-1">CITY / DISTRICT</label>
                <input
                  type="text"
                  value={pledgeData.city}
                  onChange={(e) => setPledgeData({ ...pledgeData, city: e.target.value })}
                  placeholder="e.g. Jaipur"
                  className="w-full bg-[#EFEDE6] text-[#14160F] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold"
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#E39B2C] text-[#101C3A] font-bold text-sm rounded-[4px] hover:bg-[#e09117] transition-colors cursor-pointer"
                >
                  Register {pledgeType}
                </button>
              </div>
            </form>
          )}

        </div>

      </section>
    </div>
  );
};
