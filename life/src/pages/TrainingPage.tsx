import React, { useState } from 'react';
import { PageId } from '../types';
import { COURSES } from '../data';
import { Users, CheckCircle2 } from 'lucide-react';

interface TrainingPageProps {
  onNavigate: (page: PageId) => void;
}

export const TrainingPage: React.FC<TrainingPageProps> = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organisation: '',
    role: '',
    course: COURSES[0].title,
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', organisation: '', role: '', course: COURSES[0].title, message: '' });
    }, 4000);
  };

  return (
    <div className="w-full bg-[#EFEDE6] text-[#14160F]">
      
      {/* Header on #101C3A */}
      <section className="bg-[#101C3A] text-[#EFEDE6] py-16 px-4 sm:px-8 hairline-b">
        <div className="max-w-7xl mx-auto space-y-3">
          <span className="font-mono text-xs text-[#8E9BB5] uppercase tracking-widest">
            I.I.D.C. ACADEMIC & FIELD WING
          </span>
          <h1 className="font-fraunces text-4xl sm:text-5xl font-bold text-[#EFEDE6]">
            Training & Institute
          </h1>
          <p className="font-sans-devanagari text-base text-[#8E9BB5] max-w-2xl">
            Empowering frontline volunteers, communication specialists, and field workers with specialized outreach and survey skills across Rajasthan.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-16">
        
        {/* "Who we train": row of five mono-labelled items */}
        <div className="space-y-4 border-b border-[#8E9BB5]/20 pb-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-[#8E9BB5]">
            WHO WE TRAIN
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              'field workers',
              'volunteers',
              'communicators',
              'resource persons',
              'master trainers'
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-[4px] hairline-all text-center space-y-1">
                <Users size={20} className="mx-auto text-[#2C6E8F]" />
                <span className="font-mono text-xs uppercase font-bold text-[#101C3A] block">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Course Card Grid */}
        <div className="space-y-6">
          <div>
            <span className="font-mono text-xs text-[#8E9BB5] uppercase tracking-widest block">
              UPCOMING WORKSHOPS & CERTIFICATIONS
            </span>
            <h2 className="font-fraunces text-3xl font-bold text-[#101C3A]">
              Course Catalog
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COURSES.map((course) => (
              <div key={course.id} className="bg-white p-6 rounded-[4px] hairline-all space-y-4">
                <h3 className="font-fraunces text-xl font-bold text-[#101C3A]">
                  {course.title}
                </h3>
                <div className="grid grid-cols-2 gap-3 font-mono text-xs text-[#8E9BB5]">
                  <div>
                    <span className="block text-[#101C3A]/50 uppercase">DURATION</span>
                    <span className="text-[#101C3A] font-bold">{course.duration}</span>
                  </div>
                  <div>
                    <span className="block text-[#101C3A]/50 uppercase">FORMAT</span>
                    <span className="text-[#101C3A] font-bold">{course.format}</span>
                  </div>
                  <div>
                    <span className="block text-[#101C3A]/50 uppercase">LOCATION</span>
                    <span className="text-[#101C3A] font-bold">{course.location}</span>
                  </div>
                  <div>
                    <span className="block text-[#101C3A]/50 uppercase">NEXT START DATE</span>
                    <span className="text-[#E39B2C] font-bold">{course.nextStartDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Faculty Row & Trainee Quote in Fraunces */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-b border-[#8E9BB5]/30 py-12">
          
          {/* Faculty row */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#8E9BB5]">
              INSTITUTE FACULTY & RESOURCE MASTERS
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((f) => (
                <div key={f} className="p-3 bg-white rounded-[4px] hairline-all">
                  <span className="font-fraunces font-bold text-sm text-[#101C3A] block">[placeholder Faculty {f}]</span>
                  <span className="font-mono text-[11px] text-[#8E9BB5] block">Senior Resource Person [placeholder]</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trainee quote in Fraunces */}
          <div className="lg:col-span-6 bg-[#101C3A] text-[#EFEDE6] p-8 rounded-[4px] space-y-4">
            <blockquote className="font-fraunces text-xl italic text-[#EFEDE6] leading-relaxed">
              "The practical field communication modules changed how our entire volunteer team presents healthcare rights to villagers."
            </blockquote>
            <cite className="font-mono text-xs text-[#E39B2C] uppercase tracking-widest block not-italic">
              — Master Trainer Participant, Barmer District [placeholder]
            </cite>
          </div>

        </div>

        {/* Application Form */}
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-[4px] hairline-all space-y-6">
          <div>
            <span className="font-mono text-xs text-[#8E9BB5] uppercase tracking-widest block">
              ADMISSION ENQUIRY
            </span>
            <h2 className="font-fraunces text-2xl font-bold text-[#101C3A]">
              Apply for a Training Programme
            </h2>
          </div>

          {formSubmitted ? (
            <div className="p-4 bg-[#101C3A] text-[#E39B2C] rounded-[4px] font-mono text-sm flex items-center space-x-2">
              <CheckCircle2 size={18} />
              <span>Application received! Our training office will reach out shortly.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans-devanagari text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-[#8E9BB5]">FULL NAME *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#EFEDE6] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-[#8E9BB5]">ORGANISATION</label>
                  <input
                    type="text"
                    value={formData.organisation}
                    onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                    className="w-full bg-[#EFEDE6] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-[#8E9BB5]">DESIGNATION / ROLE</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-[#EFEDE6] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-[#8E9BB5]">SELECT COURSE *</label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full bg-[#EFEDE6] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold"
                  >
                    {COURSES.map((c) => (
                      <option key={c.id} value={c.title}>{c.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs text-[#8E9BB5]">STATEMENT OF PURPOSE / MESSAGE</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#EFEDE6] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#E39B2C] text-[#101C3A] font-bold text-base rounded-[4px] hover:bg-[#e09117] transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>
          )}
        </div>

      </section>
    </div>
  );
};
