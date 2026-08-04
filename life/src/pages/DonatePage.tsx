import React, { useState, useEffect } from 'react';
import { PageId, DonationDetails } from '../types';
import { PILLARS, DONATION_AMOUNTS_MAP } from '../data';
import { SignalBars } from '../components/SignalBars';
import { startDonation, getPaymentConfig, DonationError } from '../lib/payments';
import { Lock, Copy, CheckCircle2, ShieldCheck, FileCheck, Landmark, Smartphone, CreditCard } from 'lucide-react';

interface DonatePageProps {
  initialPreset?: { amount: number; frequency: 'one-time' | 'monthly' };
  onNavigate: (page: PageId) => void;
}

export const DonatePage: React.FC<DonatePageProps> = ({ initialPreset, onNavigate }) => {
  const [details, setDetails] = useState<DonationDetails>({
    amount: initialPreset?.amount || 1000,
    customAmount: '',
    frequency: initialPreset?.frequency || 'one-time',
    programme: "Where it's needed most",
    addFeeCoverage: false,
    fullName: '',
    email: '',
    mobile: '',
    pan: '',
    address: '',
    city: '',
    state: 'Rajasthan',
    pinCode: '',
    isCitizen: true,
    isAnonymous: false,
    receiveUpdates: true
  });

  const [selectedChip, setSelectedChip] = useState<number | 'Other'>(
    initialPreset?.amount && [500, 1000, 2500, 5000].includes(initialPreset.amount)
      ? initialPreset.amount
      : 1000
  );

  // States for D4 testing & Razorpay flow
  const [panError, setPanError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [paymentsEnabled, setPaymentsEnabled] = useState<boolean | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // Computed total donation amount
  const baseAmount = selectedChip === 'Other' ? (parseInt(details.customAmount) || 0) : selectedChip;
  const finalAmount = details.addFeeCoverage ? Math.round(baseAmount * 1.02) : baseAmount;

  const handleChipSelect = (chip: number | 'Other') => {
    setSelectedChip(chip);
    if (typeof chip === 'number') {
      setDetails((prev) => ({ ...prev, amount: chip }));
    }
  };

  useEffect(() => {
    getPaymentConfig().then((c) => setPaymentsEnabled(c.paymentsEnabled));
  }, []);

  const requiredFilled =
    details.fullName.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(details.email) &&
    details.mobile.replace(/\D/g, '').length === 10 &&
    details.isCitizen &&
    finalAmount >= 100;

  const validateAndPay = async () => {
    setFormError(null);
    setFieldErrors({});
    setPanError(null);

    const pan = details.pan.trim().toUpperCase();
    if (pan && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan)) {
      setPanError('Enter a valid 10-character PAN');
      return;
    }
    if (!pan && finalAmount >= 2000) {
      setPanError('PAN is required to issue an 80G receipt for gifts of ₹2,000 and above');
      return;
    }

    setIsSubmitting(true);
    try {
      const receipt = await startDonation({
        amount: baseAmount,
        frequency: details.frequency,
        programme: details.programme,
        coverFees: details.addFeeCoverage,
        fullName: details.fullName.trim(),
        email: details.email.trim(),
        mobile: details.mobile.replace(/\D/g, '').slice(-10),
        pan,
        address: details.address,
        city: details.city,
        state: details.state,
        pinCode: details.pinCode,
        isCitizen: details.isCitizen,
        isAnonymous: details.isAnonymous,
        receiveUpdates: details.receiveUpdates,
      });
      sessionStorage.setItem('life-last-receipt', JSON.stringify(receipt));
      onNavigate('donate-success');
    } catch (err) {
      const e = err as DonationError;
      // A cancelled modal is the donor changing their mind, not an error to shout about.
      if (e.code === 'cancelled') {
        setFormError(null);
      } else if (e.code === 'validation_failed') {
        setFieldErrors(e.fieldErrors || {});
        if (e.fieldErrors?.pan) setPanError(e.fieldErrors.pan);
        setFormError('Please correct the highlighted fields and try again.');
      } else if (e.code === 'payment_failed') {
        sessionStorage.setItem('life-last-error', e.message);
        onNavigate('donate-failure');
      } else {
        setFormError(e.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const indianStates = [
    'Rajasthan', 'Delhi', 'Maharashtra', 'Gujarat', 'Haryana',
    'Punjab', 'Uttar Pradesh', 'Madhya Pradesh', 'Karnataka', 'Tamil Nadu',
    'West Bengal', 'Bihar', 'Other State'
  ];

  return (
    <div className={`w-full bg-[#EFEDE6] text-[#14160F] `}>
      {/* Blocking overlay while the order is created and checkout opens */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 bg-[#101C3A] text-[#EFEDE6] flex flex-col items-center justify-center space-y-6 px-4">
          <SignalBars count={12} heightLevel={4} className="h-16" isAnimated={true} />
          <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-center">
            Confirming with Razorpay
          </h2>
          <p className="font-mono text-xs text-[#8E9BB5] tracking-widest uppercase">
            SECURE ENCRYPTED TRANSACTION IN PROGRESS...
          </p>
        </div>
      )}

      {/* D1: Header Band on #101C3A, 240px */}
      <section className="bg-[#101C3A] text-[#EFEDE6] h-[240px] flex items-center px-4 sm:px-8 hairline-b">
        <div className="max-w-7xl mx-auto w-full space-y-2">
          <span className="font-mono text-xs text-[#8E9BB5] uppercase tracking-widest">
            SUPPORT LIFE
          </span>
          <h1 className="font-fraunces text-3xl sm:text-5xl font-bold text-[#EFEDE6]">
            Your gift funds the last mile.
          </h1>
        </div>
      </section>

      {/* Main Page Layout: Left 8 Cols (Form) + Right 4 Cols (Summary Panel) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Mobile top summary bar (collapsing right panel on mobile) */}
          <div className="lg:hidden bg-white hairline-all p-4 rounded-[4px] space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="font-fraunces text-2xl font-bold text-[#101C3A]">
                ₹{finalAmount.toLocaleString('en-IN')}
              </span>
              <span className="font-mono text-xs text-[#8E9BB5] uppercase">
                {details.frequency} · {details.programme}
              </span>
            </div>
          </div>

          {/* Left 8 Columns: Form Steps (D1 + D2) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* STEP 01 — YOUR GIFT */}
            <div className="space-y-6">
              <div className="font-mono text-xs text-[#8E9BB5] uppercase tracking-widest border-b border-[#8E9BB5]/20 pb-2">
                STEP 01 — YOUR GIFT
              </div>

              {/* Frequency Toggle */}
              <div className="inline-flex bg-[#14160F] p-1 rounded-[4px] border border-[#8E9BB5]/30">
                <button
                  type="button"
                  onClick={() => setDetails((prev) => ({ ...prev, frequency: 'one-time' }))}
                  className={`px-6 py-2 rounded-[4px] font-mono text-xs font-semibold tracking-wider transition-all ${
                    details.frequency === 'one-time'
                      ? 'bg-[#E39B2C] text-[#101C3A]'
                      : 'text-[#8E9BB5] hover:text-[#EFEDE6]'
                  }`}
                >
                  ONE-TIME
                </button>
                <button
                  type="button"
                  onClick={() => setDetails((prev) => ({ ...prev, frequency: 'monthly' }))}
                  className={`px-6 py-2 rounded-[4px] font-mono text-xs font-semibold tracking-wider transition-all ${
                    details.frequency === 'monthly'
                      ? 'bg-[#E39B2C] text-[#101C3A]'
                      : 'text-[#8E9BB5] hover:text-[#EFEDE6]'
                  }`}
                >
                  MONTHLY
                </button>
              </div>

              {/* Amount Chips */}
              <div className="flex flex-wrap gap-2">
                {([500, 1000, 2500, 5000, 'Other'] as const).map((chip) => {
                  const isSelected = selectedChip === chip;
                  return (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleChipSelect(chip)}
                      className={`px-5 py-2.5 rounded-[4px] font-mono text-xs font-semibold border transition-all ${
                        isSelected
                          ? 'bg-[#E39B2C] text-[#101C3A] border-[#E39B2C]'
                          : 'bg-white text-[#14160F] border-[#8E9BB5]/40 hover:border-[#E39B2C]'
                      }`}
                    >
                      {typeof chip === 'number' ? `₹${chip.toLocaleString('en-IN')}` : 'Other'}
                    </button>
                  );
                })}
              </div>

              {/* Custom amount field when Other active */}
              {selectedChip === 'Other' && (
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-[#8E9BB5]">ENTER CUSTOM AMOUNT</label>
                  <div className="relative max-w-xs">
                    <span className="absolute left-3 top-2.5 font-mono text-sm text-[#8E9BB5]">₹</span>
                    <input
                      type="number"
                      value={details.customAmount}
                      onChange={(e) => setDetails((prev) => ({ ...prev, customAmount: e.target.value }))}
                      placeholder="e.g. 1500"
                      className="w-full pl-8 pr-4 py-2 bg-white border border-[#8E9BB5]/40 rounded-[4px] font-mono text-sm focus-marigold"
                    />
                  </div>
                </div>
              )}

              {/* Add 2% checkbox */}
              <label className="flex items-center space-x-3 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={details.addFeeCoverage}
                  onChange={(e) => setDetails((prev) => ({ ...prev, addFeeCoverage: e.target.checked }))}
                  className="rounded-[2px] border-[#8E9BB5] text-[#E39B2C] focus-marigold"
                />
                <span className="font-sans-devanagari text-sm text-[#14160F]">
                  Add 2% so LIFE receives your full gift after payment fees
                </span>
              </label>

              {/* Programme Dropdown */}
              <div className="space-y-1 pt-2">
                <label className="block font-mono text-xs text-[#8E9BB5] uppercase">Direct my gift to</label>
                <select
                  value={details.programme}
                  onChange={(e) => setDetails((prev) => ({ ...prev, programme: e.target.value }))}
                  className="w-full max-w-md bg-white border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 font-sans-devanagari text-sm focus-marigold"
                >
                  <option value="Where it's needed most">Where it's needed most</option>
                  {PILLARS.map((p) => (
                    <option key={p.id} value={p.title}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div className="hairline-b pt-4" />
            </div>

            {/* STEP 02 — YOUR DETAILS (D2) */}
            <div className="space-y-6">
              <div className="font-mono text-xs text-[#8E9BB5] uppercase tracking-widest border-b border-[#8E9BB5]/20 pb-2">
                STEP 02 — YOUR DETAILS
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full name */}
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-[#8E9BB5]">FULL NAME *</label>
                  <input
                    type="text"
                    value={details.fullName}
                    onChange={(e) => setDetails((prev) => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Enter full name"
                    className="w-full bg-white border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 font-sans-devanagari text-sm focus-marigold"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-[#8E9BB5]">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    value={details.email}
                    onChange={(e) => setDetails((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="name@example.com"
                    className="w-full bg-white border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 font-sans-devanagari text-sm focus-marigold"
                  />
                </div>

                {/* Mobile (+91 prefix) */}
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-[#8E9BB5]">MOBILE NUMBER *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 font-mono text-sm text-[#8E9BB5]">+91</span>
                    <input
                      type="tel"
                      value={details.mobile}
                      onChange={(e) => setDetails((prev) => ({ ...prev, mobile: e.target.value }))}
                      placeholder="9876543210"
                      className="w-full pl-12 pr-3 py-2 bg-white border border-[#8E9BB5]/40 rounded-[4px] font-mono text-sm focus-marigold"
                    />
                  </div>
                </div>

                {/* PAN field (with helper text & D4 error state option) */}
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-[#8E9BB5]">PAN NUMBER</label>
                  <input
                    type="text"
                    value={details.pan}
                    onChange={(e) => {
                      setDetails((prev) => ({ ...prev, pan: e.target.value.toUpperCase() }));
                      if (panError) setPanError(null);
                    }}
                    placeholder="ABCDE1234F"
                    className={`w-full bg-white border rounded-[4px] px-3 py-2 font-mono text-sm focus-marigold ${
                      panError
                        ? 'border-[#BA1A1A] text-[#BA1A1A]'
                        : 'border-[#8E9BB5]/40'
                    }`}
                  />
                  {(panError) ? (
                    <p className="font-mono text-xs text-[#BA1A1A] pt-0.5">
                      Enter a valid 10-character PAN
                    </p>
                  ) : (
                    <p className="font-mono text-[11px] text-[#8E9BB5]">
                      Required to issue your 80G tax-exemption receipt
                    </p>
                  )}
                </div>

                {/* Address full-width */}
                <div className="md:col-span-2 space-y-1">
                  <label className="block font-mono text-xs text-[#8E9BB5]">FULL ADDRESS</label>
                  <input
                    type="text"
                    value={details.address}
                    onChange={(e) => setDetails((prev) => ({ ...prev, address: e.target.value }))}
                    placeholder="Street address, house no."
                    className="w-full bg-white border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 font-sans-devanagari text-sm focus-marigold"
                  />
                </div>

                {/* City */}
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-[#8E9BB5]">CITY</label>
                  <input
                    type="text"
                    value={details.city}
                    onChange={(e) => setDetails((prev) => ({ ...prev, city: e.target.value }))}
                    placeholder="e.g. Jaipur"
                    className="w-full bg-white border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 font-sans-devanagari text-sm focus-marigold"
                  />
                </div>

                {/* State dropdown */}
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-[#8E9BB5]">STATE</label>
                  <select
                    value={details.state}
                    onChange={(e) => setDetails((prev) => ({ ...prev, state: e.target.value }))}
                    className="w-full bg-white border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 font-sans-devanagari text-sm focus-marigold"
                  >
                    {indianStates.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* PIN Code */}
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-[#8E9BB5]">PIN CODE</label>
                  <input
                    type="text"
                    value={details.pinCode}
                    onChange={(e) => setDetails((prev) => ({ ...prev, pinCode: e.target.value }))}
                    placeholder="302001"
                    className="w-full bg-white border border-[#8E9BB5]/40 rounded-[4px] px-3 py-2 font-mono text-sm focus-marigold"
                  />
                </div>
              </div>

              {/* Stacked Checkboxes */}
              <div className="space-y-3 pt-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={details.isCitizen}
                    onChange={(e) => setDetails((prev) => ({ ...prev, isCitizen: e.target.checked }))}
                    className="rounded-[2px] border-[#8E9BB5] text-[#E39B2C] focus-marigold"
                    required
                  />
                  <span className="font-sans-devanagari text-sm text-[#14160F]">
                    I am an Indian citizen or resident *
                  </span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={details.isAnonymous}
                    onChange={(e) => setDetails((prev) => ({ ...prev, isAnonymous: e.target.checked }))}
                    className="rounded-[2px] border-[#8E9BB5] text-[#E39B2C] focus-marigold"
                  />
                  <span className="font-sans-devanagari text-sm text-[#14160F]">
                    Give anonymously
                  </span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={details.receiveUpdates}
                    onChange={(e) => setDetails((prev) => ({ ...prev, receiveUpdates: e.target.checked }))}
                    className="rounded-[2px] border-[#8E9BB5] text-[#E39B2C] focus-marigold"
                  />
                  <span className="font-sans-devanagari text-sm text-[#14160F]">
                    Send me updates from LIFE
                  </span>
                </label>
              </div>

              <div className="hairline-b pt-4" />
            </div>

            {/* STEP 03 — CONFIRM (D2) */}
            <div className="space-y-6">
              <div className="font-mono text-xs text-[#8E9BB5] uppercase tracking-widest border-b border-[#8E9BB5]/20 pb-2">
                STEP 03 — CONFIRM
              </div>

              {/* Hairline-separated summary */}
              <div className="bg-white p-4 rounded-[4px] hairline-all space-y-2 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-[#8E9BB5]/20">
                  <span className="text-[#8E9BB5]">DONATION AMOUNT</span>
                  <span className="font-bold text-[#101C3A]">₹{finalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#8E9BB5]/20">
                  <span className="text-[#8E9BB5]">FREQUENCY</span>
                  <span className="uppercase text-[#101C3A]">{details.frequency}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#8E9BB5]">PROGRAMME</span>
                  <span className="text-[#101C3A] text-right">{details.programme}</span>
                </div>
              </div>

              {paymentsEnabled === false && (
                <div className="rounded-[4px] border border-[#E39B2C]/50 bg-[#E39B2C]/10 p-4 space-y-1">
                  <div className="font-mono text-xs uppercase tracking-widest text-[#101C3A]">
                    Online donations opening soon
                  </div>
                  <p className="text-sm text-[#14160F]/80">
                    Our payment gateway is being activated. In the meantime you can give by bank
                    transfer or UPI using the details in the panel alongside — every rupee reaches us
                    exactly the same way, and we will issue your 80G receipt by email.
                  </p>
                </div>
              )}

              {formError && (
                <div
                  role="alert"
                  className="rounded-[4px] border border-[#BA1A1A]/40 bg-[#BA1A1A]/5 p-4 text-sm text-[#BA1A1A]"
                >
                  {formError}
                </div>
              )}

              {/* Full-width Marigold Button */}
              <div>
                <button
                  type="button"
                  disabled={!requiredFilled || isSubmitting || paymentsEnabled === false}
                  onClick={validateAndPay}
                  className={`w-full py-4 rounded-[4px] font-sans-devanagari font-bold text-base transition-all cursor-pointer ${
                    !requiredFilled || isSubmitting || paymentsEnabled === false
                      ? 'bg-[#8E9BB5]/40 text-[#14160F]/40 cursor-not-allowed'
                      : 'bg-[#E39B2C] text-[#101C3A] hover:bg-[#e09117]'
                  }`}
                >
                  {isSubmitting
                    ? 'Opening secure checkout…'
                    : paymentsEnabled === false
                      ? 'Online donations opening soon'
                      : `Pay ₹${finalAmount.toLocaleString('en-IN')} securely`}
                </button>
              </div>

              {/* 13px muted text with lock icon */}
              <div className="flex items-start space-x-2 text-[13px] text-[#8E9BB5] font-mono">
                <Lock size={14} className="mt-0.5 flex-shrink-0" />
                <span>
                  You'll be redirected to Razorpay's secure checkout. LIFE never stores your card details.
                </span>
              </div>
            </div>

          </div>

          {/* Right 4 Columns: Sticky Summary Panel (D3) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-white hairline-all p-6 rounded-[4px] space-y-6">
              
              {/* Selected amount in Fraunces 36px with frequency and programme in mono beneath */}
              <div className="border-b border-[#8E9BB5]/20 pb-4">
                <div className="font-fraunces text-4xl font-bold text-[#101C3A]">
                  ₹{finalAmount.toLocaleString('en-IN')}
                </div>
                <div className="font-mono text-xs text-[#8E9BB5] uppercase tracking-wider mt-1">
                  {details.frequency} · {details.programme}
                </div>
              </div>

              {/* What your gift does — 4 hairline rows */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-widest text-[#101C3A]">
                  WHAT YOUR GIFT DOES
                </h4>
                <div className="space-y-2 text-xs font-sans-devanagari text-[#14160F]">
                  <div className="py-2 border-b border-[#8E9BB5]/20 flex justify-between items-center">
                    <span className="font-mono font-bold text-[#101C3A]">₹500</span>
                    <span className="text-right text-[#8E9BB5]">prints 200 Hindi leaflets</span>
                  </div>
                  <div className="py-2 border-b border-[#8E9BB5]/20 flex justify-between items-center">
                    <span className="font-mono font-bold text-[#101C3A]">₹1,000</span>
                    <span className="text-right text-[#8E9BB5]">trains 1 volunteer for a day</span>
                  </div>
                  <div className="py-2 border-b border-[#8E9BB5]/20 flex justify-between items-center">
                    <span className="font-mono font-bold text-[#101C3A]">₹2,500</span>
                    <span className="text-right text-[#8E9BB5]">produces 1 district radio spot</span>
                  </div>
                  <div className="py-2 flex justify-between items-center">
                    <span className="font-mono font-bold text-[#101C3A]">₹5,000</span>
                    <span className="text-right text-[#8E9BB5]">funds camp for 10 workers</span>
                  </div>
                </div>
              </div>

              {/* Three trust rows with small icons */}
              <div className="border-t border-[#8E9BB5]/20 pt-4 space-y-2.5 text-xs font-mono text-[#101C3A]">
                <div className="flex items-center space-x-2">
                  <ShieldCheck size={16} className="text-[#2C6E8F]" />
                  <span>80G registered society</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileCheck size={16} className="text-[#2C6E8F]" />
                  <span>Audited financial reports published</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={16} className="text-[#2C6E8F]" />
                  <span>No political affiliation</span>
                </div>
              </div>

              {/* Other ways to give */}
              <div className="border-t border-[#8E9BB5]/20 pt-4 space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-widest text-[#101C3A]">
                  OTHER WAYS TO GIVE
                </h4>
                <div className="space-y-2 font-mono text-[11px] text-[#8E9BB5]">
                  {/* Bank transfer */}
                  <div className="flex items-center justify-between p-2 bg-[#EFEDE6] rounded-[4px]">
                    <div className="flex items-center space-x-1.5">
                      <Landmark size={14} className="text-[#101C3A]" />
                      <span>Bank: [placeholder]</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard('A/C [placeholder], IFSC [placeholder]', 'bank')}
                      className="text-[#2C6E8F] hover:underline flex items-center space-x-1"
                    >
                      <Copy size={12} />
                      <span>{copiedItem === 'bank' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* UPI ID */}
                  <div className="flex items-center justify-between p-2 bg-[#EFEDE6] rounded-[4px]">
                    <div className="flex items-center space-x-1.5">
                      <Smartphone size={14} className="text-[#101C3A]" />
                      <span>UPI: life@[placeholder]</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard('life@[placeholder]', 'upi')}
                      className="text-[#2C6E8F] hover:underline flex items-center space-x-1"
                    >
                      <Copy size={12} />
                      <span>{copiedItem === 'upi' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Cheque */}
                  <div className="flex items-center justify-between p-2 bg-[#EFEDE6] rounded-[4px]">
                    <div className="flex items-center space-x-1.5">
                      <CreditCard size={14} className="text-[#101C3A]" />
                      <span>Cheque: I.I.D.C. Jaipur</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard('I.I.D.C. Society Jaipur [placeholder]', 'cheque')}
                      className="text-[#2C6E8F] hover:underline flex items-center space-x-1"
                    >
                      <Copy size={12} />
                      <span>{copiedItem === 'cheque' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
