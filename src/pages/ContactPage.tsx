import React, { useState } from 'react';
import { Language } from '../types';
import { ORG } from '../data';
import { MapPin, Phone, Mail, Clock, CheckCircle2, MessageSquare, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';

interface ContactPageProps {
  language?: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ language = 'en' }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
    }, 4500);
  };

  return (
    <div className="w-full bg-stone-50 text-slate-900 pb-20">
      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>Jaipur Headquarters & Field Stations</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
            {language === 'en' ? 'Get in Touch With Our Team' : 'हमारे संस्थान से संपर्क करें'}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Have a question about our grassroots campaigns, training academy enrollment, or 80G tax exemption receipts? We are here to help.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Office Details & Google Map (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block">
                Jaipur Headquarters
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-slate-900 mt-1">
                Office Information
              </h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              {/* Address */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-slate-100">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Physical Address:</span>
                  <p className="font-semibold text-slate-900 leading-snug mt-0.5">
                    {ORG.addressLines[0]}<br />
                    {ORG.addressLines[1]}
                  </p>
                </div>
              </div>

              {/* Verified Phone Lines */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-slate-100 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Direct Phone Helplines:</span>
                <div className="space-y-1">
                  {ORG.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-2 text-slate-800 hover:text-amber-800 font-mono text-xs font-semibold"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{phone}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Email & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`mailto:${ORG.email}`}
                  className="p-3.5 rounded-xl bg-stone-50 border border-slate-100 flex items-center gap-2.5 text-slate-800 hover:text-amber-800"
                >
                  <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-slate-400 block uppercase">Email</span>
                    <span className="text-xs font-semibold truncate block">{ORG.email}</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/917014778387"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-2.5 text-emerald-800 hover:bg-emerald-100"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-emerald-600 block uppercase font-bold">Chat Live</span>
                    <span className="text-xs font-bold block">WhatsApp Desk</span>
                  </div>
                </a>
              </div>

              {/* Visiting Hours */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-slate-100">
                <Clock className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Office Visiting Hours:</span>
                  <p className="text-xs text-slate-700 mt-0.5">
                    Monday to Saturday: 9:30 AM – 6:00 PM IST (Closed on Public Holidays)
                  </p>
                </div>
              </div>

              {/* Interactive Map Embed */}
              <div className="pt-2 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Interactive Location:</span>
                <div className="h-56 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <iframe
                    src={ORG.mapEmbedUrl}
                    title="LIFE IIDC Jaipur Location"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
                <a
                  href="https://maps.google.com/?q=19+Shri+Ram+Nagar-B+Kanta+Jhotwara+Jaipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:underline pt-1"
                >
                  <span>Open Directions in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact & Grievance Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-xl space-y-6">
            <div className="space-y-2 border-b border-slate-100 pb-5">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">
                Direct Communication
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-slate-900">
                Send Us a Message
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm">
                Our team responds to all verified inquiries within 1 business day.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif-display text-xl font-bold text-emerald-950">Message Sent Successfully!</h4>
                <p className="text-xs sm:text-sm text-emerald-800">
                  Thank you, {formData.name}. Your inquiry has been forwarded to the appropriate desk at our Jaipur headquarters.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-amber-500"
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
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Subject / Department *</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-hidden focus:border-amber-500"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Donation & 80G Tax Exemption Receipt">Donation & 80G Tax Exemption Receipt</option>
                      <option value="Master Trainer Academy Enrollment">Master Trainer Academy Enrollment</option>
                      <option value="Volunteer & Fellowship Application">Volunteer & Fellowship Application</option>
                      <option value="Corporate CSR & Institutional Partnership">Corporate CSR & Institutional Partnership</option>
                      <option value="Research & Impact Evaluation Consultation">Research & Impact Evaluation Consultation</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Message *</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Please share details of your request or inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm hover:from-amber-400 hover:to-amber-500 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                >
                  Send Inquiry to LIFE Jaipur
                </button>
              </form>
            )}

            {/* Grievance Redressal Notice */}
            <div className="p-4 rounded-xl bg-stone-50 border border-slate-100 text-xs text-slate-500 space-y-1">
              <span className="font-semibold text-slate-700 block">Statutory Grievance Redressal</span>
              <p>
                In compliance with non-profit regulatory norms, any grievances regarding donor receipts, volunteer rights, or field practices can be directed directly to the Governing Body at <strong className="text-slate-700">{ORG.email}</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
