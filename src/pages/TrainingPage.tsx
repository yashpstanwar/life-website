import React, { useState } from 'react';
import { PageId, Language } from '../types';
import { COURSES, ORG } from '../data';
import { Users, CheckCircle2, GraduationCap, MapPin, Calendar, Clock, BookOpen, ArrowRight, Award } from 'lucide-react';

interface TrainingPageProps {
  onNavigate: (page: PageId) => void;
  language?: Language;
}

export const TrainingPage: React.FC<TrainingPageProps> = ({ onNavigate, language = 'en' }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(COURSES[0].id);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organisation: '',
    role: '',
    course: COURSES[0].title,
    message: ''
  });

  const selectedCourse = COURSES.find((c) => c.id === selectedCourseId) || COURSES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        organisation: '',
        role: '',
        course: COURSES[0].title,
        message: ''
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
            <GraduationCap className="w-3.5 h-3.5" />
            <span>I.I.D.C. Academic & Field Capacity Wing</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
            {language === 'en'
              ? 'Master Trainer Academy & Field Institute'
              : 'मास्टर ट्रेनर संस्थान एवं मीडिया प्रशिक्षण अकादमी'}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Equipping frontline workers, health coordinators, and village communicators with participatory communication, audio-visual storytelling, and grassroots survey methodologies.
          </p>
        </div>
      </section>

      {/* Target Audiences Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4 border-b border-slate-200 pb-12">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block">
            Who We Certify & Equip
          </span>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { title: 'ASHA & Anganwadis', sub: 'Frontline health workers' },
              { title: 'Youth Fellows', sub: 'Rural outreach volunteers' },
              { title: 'Media Creators', sub: 'Audio/radio producers' },
              { title: 'Survey Evaluators', sub: 'Field data collectors' },
              { title: 'Master Trainers', sub: 'Senior NGO trainers' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 text-center space-y-2 shadow-xs hover:border-amber-400 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mx-auto">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">{item.title}</h4>
                <p className="text-[11px] text-slate-500">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Catalog & Detailed Syllabus */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        <div>
          <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block">
            Upcoming Workshops & Certifications
          </span>
          <h2 className="font-serif-display text-3xl font-bold text-slate-900 mt-1">
            Curriculum Catalog (2026 Season)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COURSES.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs hover:shadow-lg transition-all space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
                    {course.format}
                  </span>
                  <span className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md font-semibold">
                    {course.seatsRemaining} of {course.seatsTotal} Seats Available
                  </span>
                </div>

                <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-slate-900">
                  {course.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {course.overview}
                </p>

                {/* Metadata Pills */}
                <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Duration: <strong className="text-slate-900">{course.duration}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Starts: <strong className="text-slate-900">{course.nextStartDate}</strong></span>
                  </div>
                  <div className="col-span-2 flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>Location: <strong className="text-slate-900">{course.location}</strong></span>
                  </div>
                </div>

                {/* Modules Checklist */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Core Modules Covered:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {course.modules.map((mod, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{mod}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <a
                  href="#enroll-form"
                  onClick={() => {
                    setSelectedCourseId(course.id);
                    setFormData((prev) => ({ ...prev, course: course.title }));
                  }}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Apply / Nominate for This Course</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Online Application & Nomination Form */}
      <section id="enroll-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-xl space-y-6">
          <div className="text-center space-y-2 border-b border-slate-100 pb-6">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">
              Course Registration & Institutional Nomination
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900">
              Apply for Certification or Nominate Your Field Team
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm max-w-lg mx-auto">
              Subsidized seats and scholarships are available for grassroots NGO workers and rural candidates from Rajasthan.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-serif-display text-xl font-bold text-emerald-950">Application Received!</h4>
              <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                Thank you, {formData.name}. Our academic wing at the Jaipur campus will review your application and send the detailed syllabus and confirmation to your email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Candidate / Contact Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Sponsoring NGO / Institution</label>
                  <input
                    type="text"
                    placeholder="Self or Organization Name"
                    value={formData.organisation}
                    onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Select Desired Course *</label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-hidden focus:border-amber-500"
                  >
                    {COURSES.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title} ({c.duration}, {c.location})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Candidate Background or Motivation</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your field experience and what you hope to achieve..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm hover:from-amber-400 hover:to-amber-500 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
              >
                Submit Application for Review
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
