import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';
import { ORG } from '../data';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Enquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: 'General Enquiry', message: '' });
    }, 4000);
  };

  return (
    <div className="w-full bg-[#EFEDE6] text-[#14160F]">
      
      {/* Header Band */}
      <section className="bg-[#101C3A] text-[#EFEDE6] py-16 px-4 sm:px-8 hairline-b">
        <div className="max-w-7xl mx-auto space-y-3">
          <span className="font-mono text-xs text-[#8E9BB5] uppercase tracking-widest">
            INSTITUTIONAL HEADQUARTERS
          </span>
          <h1 className="font-fraunces text-4xl sm:text-5xl font-bold text-[#EFEDE6]">
            Contact Us
          </h1>
          <p className="font-sans-devanagari text-base text-[#8E9BB5] max-w-2xl">
            Indian Institute of Development and Communication (I.I.D.C.) Society, Jaipur.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Office Address, Map, Phone, Email, Hours in hairline-separated rows */}
          <div className="lg:col-span-5 bg-white p-6 rounded-[4px] hairline-all space-y-6">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#101C3A] border-b border-[#8E9BB5]/20 pb-2">
              JAIPUR OFFICE DETAILS
            </h2>

            <div className="divide-y divide-[#8E9BB5]/20 font-sans-devanagari text-sm">
              
              {/* Address */}
              <div className="py-4 flex items-start space-x-3">
                <MapPin size={18} className="text-[#2C6E8F] mt-1 flex-shrink-0" />
                <div>
                  <span className="font-mono text-xs text-[#8E9BB5] block uppercase">JAIPUR HEADQUARTERS</span>
                  <span className="text-[#101C3A] font-bold">
                    {ORG.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </div>
              </div>

              {/* Map representation */}
              <div className="py-4 space-y-2">
                <span className="font-mono text-xs text-[#8E9BB5] block uppercase">LOCATION MAP</span>
                <div className="relative h-64 rounded-[4px] overflow-hidden hairline-all bg-[#101C3A]">
                  <iframe
                    src={ORG.mapEmbedUrl}
                    title={`Map to ${ORG.shortName}, ${ORG.addressOneLine}`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=26.94126850466042,75.74466634855588"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[#2C6E8F] hover:underline inline-block"
                >
                  Get directions →
                </a>
              </div>

              {/* Phone */}
              <div className="py-4 flex items-center space-x-3">
                <Phone size={18} className="text-[#2C6E8F] flex-shrink-0" />
                <div>
                  <span className="font-mono text-xs text-[#8E9BB5] block uppercase">PHONE</span>
                  {ORG.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="font-mono text-sm text-[#101C3A] font-bold block hover:text-[#2C6E8F]"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="py-4 flex items-center space-x-3">
                <Mail size={18} className="text-[#2C6E8F] flex-shrink-0" />
                <div>
                  <span className="font-mono text-xs text-[#8E9BB5] block uppercase">EMAIL</span>
                  <a
                    href={`mailto:${ORG.email}`}
                    className="font-mono text-sm text-[#2C6E8F] font-bold hover:underline break-all"
                  >
                    {ORG.email}
                  </a>
                </div>
              </div>

              {/* Office Hours */}
              <div className="py-4 flex items-center space-x-3">
                <Clock size={18} className="text-[#2C6E8F] flex-shrink-0" />
                <div>
                  <span className="font-mono text-xs text-[#8E9BB5] block uppercase">OFFICE HOURS</span>
                  <span className="font-mono text-xs text-[#101C3A]">Mon – Sat: 09:30 AM – 06:00 PM IST</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-[4px] hairline-all space-y-6">
            <div>
              <span className="font-mono text-xs text-[#8E9BB5] uppercase tracking-widest block">
                DIRECT COMMUNICATION
              </span>
              <h2 className="font-fraunces text-2xl font-bold text-[#101C3A]">
                Send an Enquiry
              </h2>
            </div>

            {submitted ? (
              <div className="p-4 bg-[#101C3A] text-[#E39B2C] rounded-[4px] font-mono text-sm flex items-center space-x-2">
                <CheckCircle2 size={18} />
                <span>Message sent! Our secretariat will reply within 24–48 hours.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans-devanagari text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block font-mono text-xs text-[#8E9BB5]">YOUR FULL NAME *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Name"
                      className="w-full bg-[#EFEDE6] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-mono text-xs text-[#8E9BB5]">YOUR EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-[#EFEDE6] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-xs text-[#8E9BB5]">SUBJECT / CATEGORY</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#EFEDE6] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold"
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Media & Press">Media & Press</option>
                    <option value="Research Commissions">Research Commissions</option>
                    <option value="CSR Partnerships">CSR Partnerships</option>
                    <option value="Training Admissions">Training Admissions</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-xs text-[#8E9BB5]">MESSAGE *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full bg-[#EFEDE6] border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 focus-marigold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#E39B2C] text-[#101C3A] font-bold text-base rounded-[4px] hover:bg-[#e09117] transition-colors cursor-pointer"
                >
                  Send message
                </button>
              </form>
            )}
          </div>

        </div>

      </section>
    </div>
  );
};
