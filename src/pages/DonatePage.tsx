import React, { useState, useEffect } from 'react';
import { PageId, DonationDetails, Language } from '../types';
import { DONATION_TIERS, PILLARS, ORG, FAQS } from '../data';
import { startDonation, getPaymentConfig, DonationError } from '../lib/payments';
import {
  Heart,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Landmark,
  Smartphone,
  Copy,
  Check,
  HelpCircle,
  Sparkles,
  ChevronDown,
  Info,
  ArrowRight
} from 'lucide-react';

interface DonatePageProps {
  initialPreset?: { amount: number; frequency: 'one-time' | 'monthly' };
  onNavigate: (page: PageId) => void;
  language?: Language;
}

export const DonatePage: React.FC<DonatePageProps> = ({ initialPreset, onNavigate, language = 'en' }) => {
  const [details, setDetails] = useState<DonationDetails>({
    amount: initialPreset?.amount || 1500,
    customAmount: '',
    frequency: initialPreset?.frequency || 'one-time',
    programme: "Where it's needed most (Desert caravans & health literacy)",
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
    initialPreset?.amount && [500, 1500, 3000, 7500, 15000].includes(initialPreset.amount)
      ? initialPreset.amount
      : 1500
  );

  const [panError, setPanError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [paymentsEnabled, setPaymentsEnabled] = useState<boolean | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Computed amounts
  const baseAmount = selectedChip === 'Other' ? (parseInt(details.customAmount) || 0) : selectedChip;
  const finalAmount = details.addFeeCoverage ? Math.round(baseAmount * 1.02) : baseAmount;
  const estimatedTaxSaving = Math.round(finalAmount * 0.5); // Section 80G provides 50% deduction

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
      setPanError('Please enter a valid 10-character PAN (e.g. ABCDE1234F)');
      return;
    }
    if (!pan && finalAmount >= 2000) {
      setPanError('PAN is required by Income Tax Dept for 80G tax exemption on gifts of ₹2,000 and above');
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
        setFormError(e.message || 'Payment gateway connection error. You can also donate directly via UPI / NEFT below.');
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

  const getImpactDescription = (amount: number) => {
    if (amount < 1000) {
      return `Supplies ${Math.max(10, Math.floor(amount / 20))} rural children with printed Devanagari story toolkits.`;
    }
    if (amount < 2500) {
      return `Sponsors 1 complete mobile audio-drama caravan session on maternal health reaching 250+ desert villagers.`;
    }
    if (amount < 5000) {
      return `Equips ${Math.floor(amount / 1000)} village frontline health workers with audio demonstration kits and handbooks.`;
    }
    if (amount < 10000) {
      return `Funds production and regional broadcast of an audio health campaign spot reaching 15,000+ households.`;
    }
    return `Fully sponsors a 10-day women's self-reliance legal workshop or deep desert vaccination mobilization drive.`;
  };

  const indianStates = [
    'Rajasthan', 'Delhi', 'Maharashtra', 'Gujarat', 'Haryana',
    'Punjab', 'Uttar Pradesh', 'Madhya Pradesh', 'Karnataka', 'Tamil Nadu',
    'West Bengal', 'Bihar', 'Other State'
  ];

  const donationFaqs = FAQS.filter((f) => f.category === 'tax80g' || f.category === 'donation');

  return (
    <div className="w-full bg-stone-50 text-slate-900 pb-24">
      {/* Submitting Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 text-white flex flex-col items-center justify-center p-4 backdrop-blur-md">
          <div className="w-16 h-16 rounded-full border-4 border-amber-400 border-t-transparent animate-spin mb-4" />
          <h2 className="font-serif-display text-2xl font-bold">Connecting Secure Checkout</h2>
          <p className="text-slate-400 text-xs mt-1">256-Bit SSL Encrypted Banking Connection...</p>
        </div>
      )}

      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Section 80G Tax Exemption Guarantee</span>
            </div>
            <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Support Grassroots Change
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Your gift carries life-saving healthcare, literacy, and self-reliance to Rajasthan's most isolated desert communities.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl text-xs space-y-1 self-start md:self-end">
            <span className="text-slate-400 block">Registration Credentials:</span>
            <span className="text-amber-400 font-semibold block">{ORG.registrationNumber}</span>
            <span className="text-emerald-400 block font-medium">100% Tax Deductible under 80G</span>
          </div>
        </div>
      </section>

      {/* Main Donation Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Funnel Form (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* STEP 1: CHOOSE FREQUENCY & AMOUNT */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold text-sm flex items-center justify-center">
                    1
                  </span>
                  <div>
                    <h3 className="font-serif-display text-lg font-bold text-slate-900">
                      Choose Your Contribution
                    </h3>
                    <p className="text-xs text-slate-500">Select one-time or monthly sustained support</p>
                  </div>
                </div>

                <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setDetails((prev) => ({ ...prev, frequency: 'one-time' }))}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      details.frequency === 'one-time'
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    One-Time
                  </button>
                  <button
                    type="button"
                    onClick={() => setDetails((prev) => ({ ...prev, frequency: 'monthly' }))}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      details.frequency === 'monthly'
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>Monthly</span>
                    <span className="text-[9px] px-1 rounded-sm bg-emerald-500 text-white font-bold">3x</span>
                  </button>
                </div>
              </div>

              {/* Amount Grid Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[500, 1500, 3000, 7500, 15000].map((amt) => {
                  const isSelected = selectedChip === amt;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleChipSelect(amt)}
                      className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-50 border-amber-500 text-amber-950 ring-2 ring-amber-400/30 font-bold shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="block text-base sm:text-lg font-bold">
                        ₹{amt.toLocaleString('en-IN')}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Amount Option */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => handleChipSelect('Other')}
                  className={`text-xs font-semibold cursor-pointer underline ${
                    selectedChip === 'Other' ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Enter custom amount
                </button>

                {selectedChip === 'Other' && (
                  <div className="mt-2 relative max-w-xs">
                    <span className="absolute left-3 top-2.5 text-slate-500 font-bold text-sm">₹</span>
                    <input
                      type="number"
                      min={100}
                      placeholder="e.g. 5000"
                      value={details.customAmount}
                      onChange={(e) => setDetails((prev) => ({ ...prev, customAmount: e.target.value }))}
                      className="w-full pl-8 pr-4 py-2 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-hidden focus:border-amber-500"
                    />
                  </div>
                )}
              </div>

              {/* Interactive Impact Statement Banner */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                    Grassroots Outcome of ₹{baseAmount.toLocaleString('en-IN')} {details.frequency === 'monthly' ? '/ month' : ''}:
                  </span>
                  <p className="text-slate-800 text-sm leading-relaxed">
                    {getImpactDescription(baseAmount)}
                  </p>
                </div>
              </div>
            </div>

            {/* STEP 2: DESIGNATE PROGRAMME */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold text-sm flex items-center justify-center">
                  2
                </span>
                <div>
                  <h3 className="font-serif-display text-lg font-bold text-slate-900">
                    Designate Your Gift
                  </h3>
                  <p className="text-xs text-slate-500">Choose where your contribution creates impact</p>
                </div>
              </div>

              <select
                value={details.programme}
                onChange={(e) => setDetails((prev) => ({ ...prev, programme: e.target.value }))}
                className="w-full p-3 rounded-xl border border-slate-300 text-sm bg-white font-medium focus:outline-hidden focus:border-amber-500"
              >
                <option value="Where it's needed most (Desert caravans & health literacy)">
                  Where it's needed most (Desert caravans & urgent health literacy)
                </option>
                <option value="Maternal & Child Health in Barmer">
                  Maternal & Child Health in Barmer (Health & Social Reform)
                </option>
                <option value="Grassroots Literacy & Education in Bikaner">
                  Grassroots Literacy & Education in Bikaner (Education & Literacy)
                </option>
                <option value="Women Self-Reliance in Udaipur">
                  Women Self-Reliance & Forest Rights in Udaipur (Women's Empowerment)
                </option>
                <option value="Master Trainer Academy in Jaipur">
                  Master Trainer Certification Academy (Jaipur Campus)
                </option>
                <option value="Water Conservation & Nutrition Caravans in Jaisalmer">
                  Water Conservation & Nutrition Caravans in Jaisalmer
                </option>
              </select>
            </div>

            {/* STEP 3: DONOR DETAILS & 80G TAX EXEMPTION */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold text-sm flex items-center justify-center">
                    3
                  </span>
                  <div>
                    <h3 className="font-serif-display text-lg font-bold text-slate-900">
                      Donor Details & 80G Tax Exemption
                    </h3>
                    <p className="text-xs text-slate-500">Mandatory for issuance of Form 10BD / 80G tax certificate</p>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  50% Tax Exemption
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Chandra Sharma"
                    value={details.fullName}
                    onChange={(e) => setDetails((prev) => ({ ...prev, fullName: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-amber-500"
                  />
                  {fieldErrors.fullName && <p className="text-xs text-rose-600">{fieldErrors.fullName}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">Email Address (for 80G receipt) *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={details.email}
                    onChange={(e) => setDetails((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-amber-500"
                  />
                  {fieldErrors.email && <p className="text-xs text-rose-600">{fieldErrors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">10-Digit Mobile Number *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-medium">+91</span>
                    <input
                      type="tel"
                      maxLength={10}
                      required
                      placeholder="9876543210"
                      value={details.mobile}
                      onChange={(e) => setDetails((prev) => ({ ...prev, mobile: e.target.value }))}
                      className="w-full pl-12 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-amber-500"
                    />
                  </div>
                  {fieldErrors.mobile && <p className="text-xs text-rose-600">{fieldErrors.mobile}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    PAN Card Number {baseAmount >= 2000 ? '*' : '(Optional for gifts < ₹2,000)'}
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    placeholder="ABCDE1234F"
                    value={details.pan}
                    onChange={(e) => setDetails((prev) => ({ ...prev, pan: e.target.value.toUpperCase() }))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm uppercase font-mono tracking-wider focus:outline-hidden focus:border-amber-500"
                  />
                  {panError && <p className="text-xs text-rose-600">{panError}</p>}
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">Address (for tax receipt)</label>
                  <input
                    type="text"
                    placeholder="Street, locality, landmark"
                    value={details.address}
                    onChange={(e) => setDetails((prev) => ({ ...prev, address: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">City</label>
                  <input
                    type="text"
                    placeholder="Jaipur / Mumbai / Delhi"
                    value={details.city}
                    onChange={(e) => setDetails((prev) => ({ ...prev, city: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">State</label>
                  <select
                    value={details.state}
                    onChange={(e) => setDetails((prev) => ({ ...prev, state: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-hidden focus:border-amber-500"
                  >
                    {indianStates.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="pt-2 space-y-3 text-xs text-slate-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={details.addFeeCoverage}
                    onChange={(e) => setDetails((prev) => ({ ...prev, addFeeCoverage: e.target.checked }))}
                    className="rounded text-amber-500 focus:ring-amber-400 w-4 h-4"
                  />
                  <span>
                    Add 2% (₹{Math.round(baseAmount * 0.02)}) to cover payment gateway fees so 100% of my gift reaches the field.
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={details.isCitizen}
                    onChange={(e) => setDetails((prev) => ({ ...prev, isCitizen: e.target.checked }))}
                    className="rounded text-amber-500 focus:ring-amber-400 w-4 h-4"
                  />
                  <span>I confirm I am an Indian Citizen or entity making this donation from domestic Indian funds.</span>
                </label>
              </div>

              {formError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                  {formError}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={validateAndPay}
                  disabled={!requiredFilled || isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                    requiredFilled && !isSubmitting
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-amber-500/20 hover:scale-[1.01]'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>Donate ₹{finalAmount.toLocaleString('en-IN')} Securely</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-2">
                  🔒 256-bit SSL encrypted • Instant 80G tax receipt will be emailed immediately
                </p>
              </div>
            </div>

            {/* OFFLINE DONATION CARD (UPI & DIRECT NEFT BANK TRANSFER) */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-slate-900 font-serif-display text-lg font-bold">
                  <Landmark className="w-5 h-5 text-amber-600" />
                  <span>Prefer Direct Bank Transfer (NEFT/RTGS) or UPI?</span>
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Zero Processing Fees
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bank Details */}
                <div className="space-y-3 bg-stone-50 p-4 rounded-xl border border-slate-200/70 text-xs">
                  <span className="font-bold text-slate-800 uppercase tracking-wider block">
                    Institutional Bank Account
                  </span>
                  
                  <div className="space-y-2 font-mono text-[11px]">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Account Name:</span>
                      <span className="text-slate-900 font-bold truncate max-w-[180px]">
                        {ORG.bankDetails.accountName}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Account No:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-900 font-bold">{ORG.bankDetails.accountNumber}</span>
                        <button
                          onClick={() => copyToClipboard(ORG.bankDetails.accountNumber, 'acc')}
                          className="p-1 rounded hover:bg-slate-200 text-slate-600"
                          title="Copy account number"
                        >
                          {copiedItem === 'acc' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">IFSC Code:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-900 font-bold">{ORG.bankDetails.ifsc}</span>
                        <button
                          onClick={() => copyToClipboard(ORG.bankDetails.ifsc, 'ifsc')}
                          className="p-1 rounded hover:bg-slate-200 text-slate-600"
                          title="Copy IFSC"
                        >
                          {copiedItem === 'ifsc' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Bank & Branch:</span>
                      <span className="text-slate-900">{ORG.bankDetails.bankName}, {ORG.bankDetails.branch}</span>
                    </div>
                  </div>
                </div>

                {/* Direct UPI */}
                <div className="space-y-3 bg-stone-50 p-4 rounded-xl border border-slate-200/70 text-xs flex flex-col justify-between">
                  <div>
                    <span className="font-bold text-slate-800 uppercase tracking-wider block mb-1">
                      Instant UPI Payment
                    </span>
                    <p className="text-slate-500 text-xs">
                      Send via Google Pay, PhonePe, Paytm, or BHIM directly to our registered UPI ID:
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900 text-xs">
                      {ORG.bankDetails.upiId}
                    </span>
                    <button
                      onClick={() => copyToClipboard(ORG.bankDetails.upiId, 'upi')}
                      className="px-2.5 py-1 rounded bg-amber-50 text-amber-900 hover:bg-amber-100 font-semibold text-[11px] flex items-center gap-1"
                    >
                      {copiedItem === 'upi' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedItem === 'upi' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    After making a direct transfer, email your UTR/Reference number to <strong className="text-slate-700">{ORG.email}</strong> to receive your 80G tax certificate.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Sticky Summary & Trust Card (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Summary Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block">
                  Donation Summary
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="font-serif-display text-3xl font-extrabold text-white">
                    ₹{finalAmount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-400 uppercase font-semibold">
                    {details.frequency}
                  </span>
                </div>
              </div>

              {/* 80G Tax Deduction Estimator */}
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">80G Tax Deduction:</span>
                  <span className="text-emerald-400 font-bold">₹{estimatedTaxSaving.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  You can claim a 50% deduction on your taxable income under Section 80G.
                </p>
              </div>

              {/* Line items */}
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Designated Cause:</span>
                  <span className="font-medium text-right max-w-[170px] truncate">{details.programme}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Direct Field Allocation:</span>
                  <span className="font-bold text-emerald-400">88% (Guaranteed)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tax Exemption Receipt:</span>
                  <span className="font-bold text-white">Instant Email & PDF</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-2 border-t border-slate-800 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Government Registered Non-Profit</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>256-Bit SSL Payment Protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Over 30 Years of Unbroken Trust</span>
                </div>
              </div>
            </div>

            {/* Helpline Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs text-xs space-y-2 text-slate-600">
              <span className="font-bold text-slate-900 block">Need assistance with your gift?</span>
              <p>Our donor support desk in Jaipur is available Monday to Saturday (9 AM - 6 PM IST):</p>
              <a href="tel:+917014778387" className="font-bold text-amber-600 block hover:underline">
                📞 +91 70147 78387
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="mt-16 max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="font-serif-display text-2xl font-bold text-slate-900">
              Frequently Asked Questions About Donating
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              Everything you need to know about 80G tax deductions, receipts, and our financial integrity
            </p>
          </div>

          <div className="space-y-3">
            {donationFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.question}
                  className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-sm text-slate-900 hover:bg-slate-50/80 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
