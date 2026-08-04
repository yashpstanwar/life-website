import React, { useMemo } from 'react';
import { PageId } from '../types';
import { SignalBars } from '../components/SignalBars';
import { Check, Download, Share2, Heart, Calendar, AlertTriangle, ArrowLeft } from 'lucide-react';

interface DonateSuccessPageProps {
  onNavigate: (page: PageId) => void;
}

export const DonateSuccessPage: React.FC<DonateSuccessPageProps> = ({ onNavigate }) => {
  // The verified receipt is written to sessionStorage by the donate page only
  // after the server has checked Razorpay's signature, so nothing here is
  // taken on the browser's word alone.
  const receipt = useMemo(() => {
    try {
      const raw = sessionStorage.getItem('life-last-receipt');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const fmtAmount =
    typeof receipt?.amount === 'number' ? `₹${receipt.amount.toLocaleString('en-IN')}` : '—';
  const fmtDate = receipt?.date
    ? new Date(receipt.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="w-full bg-[#101C3A] text-[#EFEDE6] min-h-screen py-20 px-4 sm:px-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full mx-auto space-y-8 text-center">
        
        {/* Centred marigold signal bars resolving into a check */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <SignalBars count={9} heightLevel={5} className="h-12" />
          <div className="w-14 h-14 bg-[#E39B2C] text-[#101C3A] rounded-full flex items-center justify-center font-bold">
            <Check size={32} strokeWidth={3} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-fraunces text-3xl sm:text-5xl font-bold text-[#EFEDE6]">
          Thank you — your gift is on its way.
        </h1>

        {/* Receipt card on #EFEDE6 */}
        <div className="bg-[#EFEDE6] text-[#14160F] p-6 sm:p-8 rounded-[4px] hairline-all text-left space-y-4 shadow-none">
          <div className="flex justify-between items-center border-b border-[#8E9BB5]/30 pb-3">
            <span className="font-mono text-xs text-[#8E9BB5] uppercase tracking-widest">
              OFFICIAL DONATION RECEIPT
            </span>
            <span className="font-mono text-xs text-[#2C6E8F] font-bold">
              80G EXEMPT
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {/* Hairline rows */}
            <div className="flex justify-between py-2 border-b border-[#8E9BB5]/20">
              <span className="text-[#8E9BB5]">DONATION ID</span>
              <span className="text-[#101C3A] font-bold">{receipt?.receiptNumber ?? receipt?.paymentId ?? '—'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#8E9BB5]/20">
              <span className="text-[#8E9BB5]">DATE</span>
              <span className="text-[#101C3A]">{fmtDate}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#8E9BB5]/20">
              <span className="text-[#8E9BB5]">AMOUNT</span>
              <span className="text-[#101C3A] font-bold text-sm">{fmtAmount}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#8E9BB5]/20">
              <span className="text-[#8E9BB5]">FREQUENCY</span>
              <span className="text-[#101C3A] uppercase">{receipt?.frequency ?? 'one-time'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#8E9BB5]/20">
              <span className="text-[#8E9BB5]">PROGRAMME</span>
              <span className="text-[#101C3A]">{receipt?.programme ?? "Where it's needed most"}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#8E9BB5]">DONOR NAME</span>
              <span className="text-[#101C3A] font-bold">{receipt?.donorName ?? '—'}</span>
            </div>
          </div>

          {/* Download 80G receipt button */}
          <div className="pt-2">
            <button
              onClick={() => alert('80G Tax Exemption Receipt download initiated.')}
              className="w-full py-3 bg-[#101C3A] text-[#EFEDE6] hover:bg-[#142348] font-sans-devanagari font-bold text-sm rounded-[4px] flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <Download size={16} />
              <span>Download 80G receipt</span>
            </button>
          </div>

          <p className="font-mono text-[11px] text-[#8E9BB5] text-center pt-1">
            A confirmation copy and tax receipt have been sent to your email address.
          </p>
        </div>

        {/* Row of three links: share, volunteer, make it monthly */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 font-sans-devanagari text-sm">
          <button
            onClick={() => alert('Link copied to share LIFE campaign!')}
            className="flex items-center space-x-2 text-[#2C6E8F] hover:text-[#EFEDE6] transition-colors"
          >
            <Share2 size={16} />
            <span>Share this campaign</span>
          </button>
          <button
            onClick={() => onNavigate('get-involved')}
            className="flex items-center space-x-2 text-[#2C6E8F] hover:text-[#EFEDE6] transition-colors"
          >
            <Heart size={16} />
            <span>Become a volunteer</span>
          </button>
          <button
            onClick={() => onNavigate('donate')}
            className="flex items-center space-x-2 text-[#E39B2C] hover:underline transition-colors font-bold"
          >
            <Calendar size={16} />
            <span>Make it a monthly gift</span>
          </button>
        </div>

        {/* Back link */}
        <div className="pt-6">
          <button
            onClick={() => onNavigate('home')}
            className="font-mono text-xs text-[#8E9BB5] hover:text-[#EFEDE6] transition-colors"
          >
            ← Return to home page
          </button>
        </div>
      </div>
    </div>
  );
};

export const DonateFailurePage: React.FC<DonateFailurePageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#101C3A] text-[#EFEDE6] min-h-screen py-20 px-4 sm:px-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full mx-auto space-y-6 text-center">
        
        <div className="w-16 h-16 bg-[#BA1A1A]/20 border border-[#BA1A1A] text-[#BA1A1A] rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle size={32} />
        </div>

        <h1 className="font-fraunces text-3xl font-bold text-[#EFEDE6]">
          Your payment didn't go through
        </h1>

        <div className="bg-[#EFEDE6] text-[#14160F] p-6 rounded-[4px] text-left space-y-3 font-mono text-xs">
          <div className="text-[#8E9BB5] uppercase">REASON FOR FAILURE</div>
          <div className="text-[#BA1A1A] font-bold">
            {(typeof window !== 'undefined' && sessionStorage.getItem('life-last-error')) || 'The bank declined the transaction or the connection was interrupted.'}
          </div>
          <div className="text-[#8E9BB5] pt-2 border-t border-[#8E9BB5]/20">
            No funds were debited from your account. If debited, refunds are processed within 3-5 business days.
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => onNavigate('donate')}
            className="w-full py-3.5 bg-[#E39B2C] text-[#101C3A] hover:bg-[#e09117] font-sans-devanagari font-bold rounded-[4px] transition-colors cursor-pointer"
          >
            Try again
          </button>
        </div>

        <div className="font-mono text-xs text-[#8E9BB5] pt-2">
          Need assistance? Contact support at{' '}
          <a href="mailto:support@[placeholder].org" className="text-[#2C6E8F] underline">
            support@[placeholder].org
          </a>
        </div>

        <div>
          <button
            onClick={() => onNavigate('home')}
            className="font-mono text-xs text-[#8E9BB5] hover:text-[#EFEDE6] flex items-center justify-center space-x-1 mx-auto pt-4"
          >
            <ArrowLeft size={14} />
            <span>Return to Home</span>
          </button>
        </div>

      </div>
    </div>
  );
};

interface DonateFailurePageProps {
  onNavigate: (page: PageId) => void;
}
