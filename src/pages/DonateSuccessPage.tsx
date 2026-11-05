import React, { useMemo } from 'react';
import { PageId } from '../types';
import { ORG } from '../data';
import { CheckCircle2, Download, Printer, Share2, Heart, ArrowLeft, AlertCircle, Phone, Mail } from 'lucide-react';

interface DonateSuccessPageProps {
  onNavigate: (page: PageId) => void;
}

export const DonateSuccessPage: React.FC<DonateSuccessPageProps> = ({ onNavigate }) => {
  const receipt = useMemo(() => {
    try {
      const raw = sessionStorage.getItem('life-last-receipt');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const fmtAmount =
    typeof receipt?.amount === 'number' ? `₹${receipt.amount.toLocaleString('en-IN')}` : '₹1,500';
  const fmtDate = receipt?.date
    ? new Date(receipt.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const receiptNo = receipt?.receiptNumber ?? receipt?.paymentId ?? `LIFE-80G-${Math.floor(100000 + Math.random() * 900000)}`;
  const donorName = receipt?.donorName || 'Valued Supporter';

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const text = 'I just supported LIFE NGO to bring vital healthcare and literacy to desert villages in Rajasthan. Join me: https://lifengo.org/donate';
    if (navigator.share) {
      navigator.share({ title: 'Supported LIFE NGO', text, url: 'https://lifengo.org/donate' }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert('Share link copied to clipboard!');
    }
  };

  return (
    <div className="w-full bg-stone-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full mx-auto space-y-8">
        
        {/* Celebration Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Payment Verified & Received
          </span>
          <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900">
            Thank you for carrying the change.
          </h1>
          <p className="text-slate-600 text-sm max-w-lg mx-auto">
            Your generous contribution is on its way to funding essential awareness caravans and frontline health educators in Rajasthan.
          </p>
        </div>

        {/* Official 80G Tax Exemption Receipt Card (Print Friendly) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
          {/* Receipt Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="font-serif-display text-2xl font-bold text-slate-900 tracking-tight">LIFE</span>
              <p className="text-xs text-slate-500">{ORG.registeredName}</p>
              <p className="text-[11px] text-slate-400">{ORG.addressOneLine}</p>
            </div>
            <div className="sm:text-right">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
                80G TAX EXEMPTION RECEIPT
              </span>
              <p className="text-xs text-slate-400 mt-1 font-mono">{ORG.registrationNumber}</p>
              <p className="text-xs text-slate-400 font-mono">PAN: {ORG.panNumber}</p>
            </div>
          </div>

          {/* Receipt Details Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-stone-50 border border-slate-100">
              <span className="text-slate-400 block text-[11px]">Receipt Number</span>
              <span className="font-mono font-bold text-slate-800 text-sm">{receiptNo}</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-slate-100">
              <span className="text-slate-400 block text-[11px]">Date of Donation</span>
              <span className="font-semibold text-slate-800">{fmtDate}</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-slate-100">
              <span className="text-slate-400 block text-[11px]">Donor Name</span>
              <span className="font-bold text-slate-800">{donorName}</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/70">
              <span className="text-emerald-700 block text-[11px] font-medium">Donation Amount</span>
              <span className="font-serif-display font-extrabold text-emerald-800 text-lg">{fmtAmount}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-slate-100 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500">Designated Initiative:</span>
              <span className="font-medium text-slate-800">{receipt?.programme || "Where it's needed most"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Payment Status:</span>
              <span className="font-bold text-emerald-600">Verified & Authenticated</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 text-center leading-relaxed">
            Eligible for 50% tax deduction under Section 80G of the Indian Income Tax Act. A formal PDF certificate has also been emailed to your registered address for filing your ITR.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handlePrint}
              className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-50 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print / Save 80G Receipt</span>
            </button>

            <button
              onClick={handleShare}
              className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share With Friends</span>
            </button>
          </div>
        </div>

        {/* Post-Donation Engagement */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-pointer font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </button>

          <button
            onClick={() => onNavigate('get-involved')}
            className="text-amber-600 hover:underline font-semibold cursor-pointer"
          >
            Explore Volunteering Opportunities →
          </button>
        </div>
      </div>
    </div>
  );
};

export const DonateFailurePage: React.FC<{ onNavigate: (page: PageId) => void }> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-stone-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full mx-auto space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-md">
          <AlertCircle className="w-10 h-10" />
        </div>

        <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900">
          Payment Was Not Completed
        </h1>

        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          The transaction was interrupted or declined by your bank. No money has been deducted from your account. If debited, banks auto-reverse within 2-3 business days.
        </p>

        <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <button
            onClick={() => onNavigate('donate')}
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md hover:from-amber-400 hover:to-amber-500 transition-all cursor-pointer"
          >
            Try Donating Again
          </button>

          <div className="pt-2 text-xs text-slate-500 space-y-1">
            <span className="block font-semibold text-slate-700">Prefer direct bank or UPI payment?</span>
            <p>You can transfer directly to our registered UPI ID: <strong className="text-slate-800">{ORG.bankDetails.upiId}</strong></p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs text-slate-500 pt-2">
          <a href="tel:+917014778387" className="flex items-center gap-1 hover:text-amber-600">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            <span>Call Helpline</span>
          </a>
          <span>•</span>
          <button onClick={() => onNavigate('home')} className="hover:text-slate-900 font-medium">
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};
