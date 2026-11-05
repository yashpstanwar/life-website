import React, { useState } from 'react';
import { PageId, Language } from '../types';
import { VOLUNTEER_ROLES, ORG } from '../data';
import { Heart, CheckCircle2, Users, Building, HeartHandshake, Sparkles, ArrowRight, ShieldCheck, Mail, Phone } from 'lucide-react';

interface GetInvolvedPageProps {
  onNavigate: (page: PageId) => void;
  language?: Language;
}

export const GetInvolvedPage: React.FC<GetInvolvedPageProps> = ({ onNavigate, language = 'en' }) => {
  const [activeTab, setActiveTab] = useState<'volunteer' | 'csr' | 'pledge'>('volunteer');

  const [volSubmitted, setVolSubmitted] = useState(false);
  const [volData, setVolData] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Jaipur',
    role: VOLUNTEER_ROLES[0].title,
    availability: 'Part-Time (Weekends)',
    message: ''
  });

  const [csrSubmitted, setCsrSubmitted] = useState(false);
  const [csrData, setCsrData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    budgetRange: '₹5 Lakhs – ₹25 Lakhs',
    focusArea: 'Maternal & Child Health in Desert Blocks',
    notes: ''
  });

  const [pledgeSubmitted, setPledgeSubmitted] = useState(false);
  const [pledgeData, setPledgeData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: 'B+',
    type: 'Blood & Eye Donation Pledge',
    city: 'Jaipur'
  });

  const handleVolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVolSubmitted(true);
    setTimeout(() => {
      setVolSubmitted(false);
      setVolData({
        name: '',
        email: '',
        phone: '',
        city: 'Jaipur',
        role: VOLUNTEER_ROLES[0].title,
        availability: 'Part-Time (Weekends)',
        message: ''
      });
    }, 4500);
  };

  const handleCsrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCsrSubmitted(true);
    setTimeout(() => {
      setCsrSubmitted(false);
      setCsrData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        budgetRange: '₹5 Lakhs – ₹25 Lakhs',
        focusArea: 'Maternal & Child Health in Desert Blocks',
        notes: ''
      });
    }, 4500);
  };

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPledgeSubmitted(true);
    setTimeout(() => {
      setPledgeSubmitted(false);
      setPledgeData({
        name: '',
        email: '',
        phone: '',
        bloodGroup: 'B+',
        type: 'Blood & Eye Donation Pledge',
        city: 'Jaipur'
      });
    }, 4500);
  };

  return (
    <div className="w-full bg-stone-50 text-slate-900 pb-20">
      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs font-semibold">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Community Action & Institutional Partnerships</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
            {language === 'en'
              ? 'Stand With Rajasthan’s Remote Communities'
              : 'राजस्थान के सुदूर समुदायों के साथ खड़े हों'}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Whether as a field fellow, translation contributor, corporate CSR partner, or blood donor, your participation accelerates dignity and access.
          </p>
        </div>
      </section>

      {/* Track Selector Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('volunteer')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'volunteer'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Volunteer & Fellowships</span>
          </button>

          <button
            onClick={() => setActiveTab('csr')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'csr'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Corporate CSR Partnerships</span>
          </button>

          <button
            onClick={() => setActiveTab('pledge')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'pledge'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Blood & Eye Donation Pledge</span>
          </button>
        </div>
      </section>

      {/* TRACK 1: VOLUNTEERING */}
      {activeTab === 'volunteer' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          {/* Volunteer Roles Catalog */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block">
                Current Opportunities
              </span>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Open Volunteer & Fellowship Roles
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {VOLUNTEER_ROLES.map((role) => (
                <div
                  key={role.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
                        {role.department}
                      </span>
                      <span className="text-slate-500 font-medium">
                        {role.location}
                      </span>
                    </div>

                    <h3 className="font-serif-display text-xl font-bold text-slate-900">
                      {role.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {role.description}
                    </p>

                    <div className="space-y-1 pt-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Desired Profile:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {role.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Commitment: {role.commitment}</span>
                    <a
                      href="#vol-form"
                      onClick={() => setVolData((prev) => ({ ...prev, role: role.title }))}
                      className="font-bold text-amber-600 hover:underline cursor-pointer"
                    >
                      Apply Now →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Volunteer Application Form */}
          <div id="vol-form" className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-xl space-y-6">
            <div className="text-center space-y-2 border-b border-slate-100 pb-5">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">
                Volunteer Enrollment Form
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-slate-900">
                Join the Grassroots Movement
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm">
                Receive training, field exposure, and an official Certificate of Community Contribution.
              </p>
            </div>

            {volSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif-display text-xl font-bold text-emerald-950">Thank You, {volData.name}!</h4>
                <p className="text-xs sm:text-sm text-emerald-800">
                  Your volunteer application has been received. Our coordinator will reach out to discuss orientation and onboarding.
                </p>
              </div>
            ) : (
              <form onSubmit={handleVolSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={volData.name}
                      onChange={(e) => setVolData({ ...volData, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={volData.email}
                      onChange={(e) => setVolData({ ...volData, email: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Mobile Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={volData.phone}
                      onChange={(e) => setVolData({ ...volData, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Current City / District</label>
                    <input
                      type="text"
                      placeholder="Jaipur / Jodhpur / Barmer"
                      value={volData.city}
                      onChange={(e) => setVolData({ ...volData, city: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Preferred Track *</label>
                    <select
                      value={volData.role}
                      onChange={(e) => setVolData({ ...volData, role: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-hidden focus:border-amber-500"
                    >
                      {VOLUNTEER_ROLES.map((r) => (
                        <option key={r.id} value={r.title}>{r.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Availability</label>
                    <select
                      value={volData.availability}
                      onChange={(e) => setVolData({ ...volData, availability: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-hidden focus:border-amber-500"
                    >
                      <option value="Part-Time (Weekends)">Part-Time (Weekends)</option>
                      <option value="Full-Time (Field Fellow)">Full-Time (Field Fellow)</option>
                      <option value="Remote / Flexible Hours">Remote / Flexible Hours</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Relevant Skills or Prior Social Work Experience</label>
                    <textarea
                      rows={3}
                      placeholder="Languages spoken, media skills, community experience..."
                      value={volData.message}
                      onChange={(e) => setVolData({ ...volData, message: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm hover:from-amber-400 hover:to-amber-500 shadow-md transition-all cursor-pointer"
                >
                  Submit Volunteer Application
                </button>
              </form>
            )}
          </div>
        </section>
      )}

      {/* TRACK 2: CORPORATE CSR PARTNERSHIPS */}
      {activeTab === 'csr' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">
                Section 135 Compliant
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                Partner With Us for High-Accountability CSR Initiatives
              </h2>
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  LIFE offers Indian corporations, philanthropic foundations, and PSUs a fully compliant, high-integrity implementation vehicle under Section 135 of the Companies Act, 2013.
                </p>
                <p>
                  With active 80G and 12A certifications, NITI Aayog NGO Darpan registration, and 30 years of audited financial history, we co-create bespoke grassroots projects with measurable KPIs, quarterly field audits, and third-party impact assessments.
                </p>
              </div>

              <div className="space-y-2 pt-2 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Comprehensive Quarterly Utilization Certificates (UC)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Geo-tagged beneficiary tracking and photography</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Employee engagement & field volunteering opportunities</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xl space-y-5">
              <h3 className="font-serif-display text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                Corporate CSR Inquiry Desk
              </h3>

              {csrSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-emerald-950 text-base">Inquiry Received</h4>
                  <p className="text-xs text-emerald-800">
                    Our Institutional Partnerships Director will contact {csrData.contactPerson} within 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCsrSubmit} className="space-y-3.5 text-xs sm:text-sm">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Company / Entity Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Enterprises Ltd."
                      value={csrData.companyName}
                      onChange={(e) => setCsrData({ ...csrData, companyName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Contact Person *</label>
                      <input
                        type="text"
                        required
                        placeholder="CSR Lead / Director"
                        value={csrData.contactPerson}
                        onChange={(e) => setCsrData({ ...csrData, contactPerson: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Official Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="csr@company.com"
                        value={csrData.email}
                        onChange={(e) => setCsrData({ ...csrData, email: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91..."
                        value={csrData.phone}
                        onChange={(e) => setCsrData({ ...csrData, phone: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Annual CSR Budget</label>
                      <select
                        value={csrData.budgetRange}
                        onChange={(e) => setCsrData({ ...csrData, budgetRange: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-hidden focus:border-amber-500"
                      >
                        <option value="₹5 Lakhs – ₹25 Lakhs">₹5 Lakhs – ₹25 Lakhs</option>
                        <option value="₹25 Lakhs – ₹1 Crore">₹25 Lakhs – ₹1 Crore</option>
                        <option value="₹1 Crore+">₹1 Crore+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Thematic Focus Area</label>
                    <select
                      value={csrData.focusArea}
                      onChange={(e) => setCsrData({ ...csrData, focusArea: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-hidden focus:border-amber-500"
                    >
                      <option value="Maternal & Child Health in Desert Blocks">Maternal & Child Health in Desert Blocks</option>
                      <option value="Grassroots Literacy & Education Caravans">Grassroots Literacy & Education Caravans</option>
                      <option value="Women Self-Reliance & Financial Literacy">Women Self-Reliance & Financial Literacy</option>
                      <option value="Water Conservation in Jaisalmer">Water Conservation in Jaisalmer</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Request CSR Concept Deck & Proposal
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      {/* TRACK 3: BLOOD & EYE DONATION PLEDGE */}
      {activeTab === 'pledge' && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-xl space-y-6">
            <div className="text-center space-y-2 border-b border-slate-100 pb-5">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">
                Health & Social Reform
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900">
                Pledge for Blood & Eye Donation in Rajasthan
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm max-w-lg mx-auto">
                Join our statewide emergency donor network connecting life-saving donors with rural patients in government hospitals.
              </p>
            </div>

            {pledgeSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif-display text-xl font-bold text-emerald-950">Pledge Enrolled!</h4>
                <p className="text-xs sm:text-sm text-emerald-800">
                  Thank you, {pledgeData.name}. Your details have been registered into the LIFE Community Volunteer Donor Registry.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePledgeSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Donor Name"
                      value={pledgeData.name}
                      onChange={(e) => setPledgeData({ ...pledgeData, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Blood Group *</label>
                    <select
                      value={pledgeData.bloodGroup}
                      onChange={(e) => setPledgeData({ ...pledgeData, bloodGroup: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-hidden focus:border-amber-500"
                    >
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Mobile Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91..."
                      value={pledgeData.phone}
                      onChange={(e) => setPledgeData({ ...pledgeData, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">City / Town *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jaipur / Bikaner / Barmer"
                      value={pledgeData.city}
                      onChange={(e) => setPledgeData({ ...pledgeData, city: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold text-sm hover:from-rose-600 hover:to-red-700 shadow-md shadow-rose-500/20 transition-all cursor-pointer"
                >
                  Record My Lifesaving Pledge
                </button>
              </form>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
