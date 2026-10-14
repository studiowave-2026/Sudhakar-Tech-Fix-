import React, { useState, useEffect } from 'react';
import { DeviceType, RepairRequest } from '../types';
import { RepairStore } from '../lib/store';
import { BUSINESS_CONFIG } from '../config/business';
import {
  CheckCircle,
  Copy,
  Check,
  Send,
  MessageSquare,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface RepairBookingFormProps {
  preselectedCategory?: string;
  onBookingSubmitted?: (newRepair: RepairRequest) => void;
  onTrackReference?: (referenceId: string) => void;
}

export const RepairBookingForm: React.FC<RepairBookingFormProps> = ({
  preselectedCategory,
  onBookingSubmitted,
  onTrackReference,
}) => {
  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deviceType, setDeviceType] = useState<DeviceType>('laptop');
  const [deviceBrand, setDeviceBrand] = useState('Dell');
  const [customBrand, setCustomBrand] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [problemCategory, setProblemCategory] = useState(
    preselectedCategory || 'Laptop Repair & Component Service'
  );
  const [problemDescription, setProblemDescription] = useState('');
  const [preferredContactMethod, setPreferredContactMethod] = useState<'phone' | 'whatsapp' | 'email'>('whatsapp');
  const [preferredContactTime, setPreferredContactTime] = useState<'morning' | 'afternoon' | 'evening' | 'anytime'>('anytime');
  const [consentGiven, setConsentGiven] = useState(true);

  // UI Flow State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRepair, setSubmittedRepair] = useState<RepairRequest | null>(null);
  const [hasCopiedRef, setHasCopiedRef] = useState(false);

  // Update category when prop changes
  useEffect(() => {
    if (preselectedCategory) {
      setProblemCategory(preselectedCategory);
    }
  }, [preselectedCategory]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!customerName.trim()) {
      newErrors.customerName = 'Please enter your full name.';
    }

    if (!customerEmail.trim()) {
      newErrors.customerEmail = 'Please provide an email address for your confirmation.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail.trim())) {
      newErrors.customerEmail = 'Please enter a valid email address.';
    }

    const cleanPhone = customerPhone.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      newErrors.customerPhone = 'Please provide a contact phone number.';
    } else if (cleanPhone.length < 10) {
      newErrors.customerPhone = 'Please provide a valid 10-digit mobile number.';
    }

    const finalBrand = deviceBrand === 'Other' ? customBrand.trim() : deviceBrand;
    if (!finalBrand) {
      newErrors.deviceBrand = 'Please select or enter the device brand.';
    }

    if (!problemDescription.trim() || problemDescription.trim().length < 10) {
      newErrors.problemDescription = 'Please describe the issue in at least 10 characters (e.g. what happens when powered on).';
    }

    if (!consentGiven) {
      newErrors.consent = 'Please confirm consent to be contacted regarding this repair enquiry.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate brief network dispatch
    setTimeout(() => {
      const finalBrand = deviceBrand === 'Other' ? (customBrand || 'Custom') : deviceBrand;
      
      const newRequest = RepairStore.create({
        customerName,
        customerEmail,
        customerPhone,
        deviceType,
        deviceBrand: finalBrand,
        deviceModel,
        problemCategory,
        problemDescription,
        preferredContactMethod,
        preferredContactTime,
      });

      setSubmittedRepair(newRequest);
      setIsSubmitting(false);
      if (onBookingSubmitted) {
        onBookingSubmitted(newRequest);
      }
    }, 600);
  };

  const handleCopyReference = () => {
    if (!submittedRepair) return;
    navigator.clipboard.writeText(submittedRepair.referenceId);
    setHasCopiedRef(true);
    setTimeout(() => setHasCopiedRef(false), 2500);
  };

  const handleResetForm = () => {
    setSubmittedRepair(null);
    setProblemDescription('');
    setDeviceModel('');
  };

  return (
    <section className="py-16 sm:py-24 relative bg-transparent border-b border-white/60" id="book-repair">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* If submitted, show pristine confirmation screen */}
        {submittedRepair ? (
          <div className="liquid-glass liquid-glass-specular rounded-3xl shadow-2xl p-8 sm:p-12 space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Repair Enquiry Received
              </h3>
              <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
                Thank you, <strong className="text-slate-900">{submittedRepair.customerName}</strong>. Your enquiry has been logged with Sudhakar near SR Nagar, Hyderabad.
              </p>
            </div>

            {/* Reference Identifier Box with Liquid Glass Specular */}
            <div className="liquid-glass-pill rounded-2xl p-6 text-center space-y-2 border border-white/95 shadow-sm">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Your Unique Tracking Reference
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-slate-900 tracking-wider">
                  {submittedRepair.referenceId}
                </span>
                <button
                  type="button"
                  onClick={handleCopyReference}
                  className="p-2 text-slate-600 hover:text-slate-900 bg-white/80 border border-white rounded-lg hover:bg-white transition-colors cursor-pointer shadow-xs"
                  title="Copy reference code"
                >
                  {hasCopiedRef ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Keep this code to track your assessment progress online or mention it when calling.
              </p>
            </div>

            {/* Summary Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700 bg-white/50 backdrop-blur-xs p-4 rounded-xl border border-white/80 shadow-2xs">
              <div>
                <span className="font-semibold text-slate-800">Device: </span>
                {submittedRepair.deviceBrand} {submittedRepair.deviceModel || submittedRepair.deviceType}
              </div>
              <div>
                <span className="font-semibold text-slate-800">Category: </span>
                {submittedRepair.problemCategory}
              </div>
              <div>
                <span className="font-semibold text-slate-800">Preferred Contact: </span>
                <span className="capitalize">{submittedRepair.preferredContactMethod}</span> ({submittedRepair.preferredContactTime})
              </div>
              <div>
                <span className="font-semibold text-slate-800">Current Status: </span>
                <span className="text-blue-600 font-semibold">{submittedRepair.status}</span>
              </div>
            </div>

            {/* Direct Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-center">
              <a
                href={`${BUSINESS_CONFIG.phone.whatsappUrl}?text=${encodeURIComponent(
                  `Hello Sudhakar, I submitted repair enquiry ${submittedRepair.referenceId} for my ${submittedRepair.deviceBrand} ${submittedRepair.deviceModel}. Please let me know the next step.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message Sudhakar on WhatsApp</span>
              </a>

              {onTrackReference && (
                <button
                  type="button"
                  onClick={() => onTrackReference(submittedRepair.referenceId)}
                  className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-slate-800 liquid-glass-pill hover:bg-white/90 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Track Status Online</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={handleResetForm}
                className="w-full sm:w-auto px-4 py-3 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          /* Main Interactive Liquid Glass Booking Form */
          <div className="liquid-glass liquid-glass-specular rounded-3xl shadow-2xl p-6 sm:p-10">
            <div className="mb-8 space-y-2">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Direct Technician Booking
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Request a Device Assessment
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Provide your device symptoms below. Sudhakar reviews requests personally to advise on diagnosis feasibility and initial quotation.
              </p>
            </div>

            {/* Privacy Guidance Callout with Frosted Glass */}
            <div className="mb-8 p-4 bg-amber-50/70 backdrop-blur-xs border border-amber-200/80 rounded-2xl flex items-start gap-3 text-xs text-amber-900 shadow-2xs">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Privacy Safety:</strong> Never include account passwords, PINs, or banking information in this form. All repairs are verified under strict customer data confidentiality.
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="customerName" className="block text-xs font-semibold text-slate-700">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="customerName"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.customerName ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:ring-blue-100 focus:border-blue-600'
                    }`}
                  />
                  {errors.customerName && (
                    <p className="text-xs text-rose-500">{errors.customerName}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="customerPhone" className="block text-xs font-semibold text-slate-700">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="customerPhone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.customerPhone ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:ring-blue-100 focus:border-blue-600'
                    }`}
                  />
                  {errors.customerPhone && (
                    <p className="text-xs text-rose-500">{errors.customerPhone}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="customerEmail" className="block text-xs font-semibold text-slate-700">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="customerEmail"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="e.g. rahul@example.com"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.customerEmail ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:ring-blue-100 focus:border-blue-600'
                    }`}
                  />
                  {errors.customerEmail && (
                    <p className="text-xs text-rose-500">{errors.customerEmail}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Device Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label htmlFor="deviceType" className="block text-xs font-semibold text-slate-700">
                    Device Type <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="deviceType"
                    value={deviceType}
                    onChange={(e) => setDeviceType(e.target.value as DeviceType)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
                  >
                    <option value="laptop">Laptop</option>
                    <option value="desktop">Desktop Tower</option>
                    <option value="aio">All-in-One (AIO)</option>
                    <option value="custom_pc">Custom Gaming/Workstation PC</option>
                    <option value="macbook">MacBook / Apple Device</option>
                    <option value="other">Other Machine</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="deviceBrand" className="block text-xs font-semibold text-slate-700">
                    Device Brand <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="deviceBrand"
                    value={deviceBrand}
                    onChange={(e) => setDeviceBrand(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
                  >
                    <option value="Dell">Dell</option>
                    <option value="HP">HP</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="Asus">Asus</option>
                    <option value="Acer">Acer</option>
                    <option value="Apple">Apple / MacBook</option>
                    <option value="MSI">MSI</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Custom">Assembled / Custom PC</option>
                    <option value="Other">Other Brand</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="deviceModel" className="block text-xs font-semibold text-slate-700">
                    Model (Optional)
                  </label>
                  <input
                    id="deviceModel"
                    type="text"
                    value={deviceModel}
                    onChange={(e) => setDeviceModel(e.target.value)}
                    placeholder="e.g. Inspiron 15, ThinkPad E14"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
                  >
                  </input>
                </div>
              </div>

              {deviceBrand === 'Other' && (
                <div className="space-y-1.5">
                  <label htmlFor="customBrand" className="block text-xs font-semibold text-slate-700">
                    Specify Brand Name
                  </label>
                  <input
                    id="customBrand"
                    type="text"
                    value={customBrand}
                    onChange={(e) => setCustomBrand(e.target.value)}
                    placeholder="Enter your manufacturer brand"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white"
                  />
                </div>
              )}

              {/* Row 3: Problem Category */}
              <div className="space-y-1.5 pt-2">
                <label htmlFor="problemCategory" className="block text-xs font-semibold text-slate-700">
                  Primary Problem Category <span className="text-rose-500">*</span>
                </label>
                <select
                  id="problemCategory"
                  value={problemCategory}
                  onChange={(e) => setProblemCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
                >
                  <option value="Laptop Repair & Component Service">Laptop Repair & Component Service</option>
                  <option value="Desktop Computer Repair">Desktop Computer Repair</option>
                  <option value="Laptop Screen Replacement Enquiries">Laptop Screen Replacement Enquiries</option>
                  <option value="Battery & Charging Problems">Battery & Charging Problems</option>
                  <option value="Keyboard & Touchpad Repair">Keyboard & Touchpad Repair</option>
                  <option value="Slow Computer Troubleshooting">Slow Computer Troubleshooting</option>
                  <option value="Windows Installation & Software Troubleshooting">Windows Installation & Software Troubleshooting</option>
                  <option value="Virus & Malware Troubleshooting">Virus & Malware Troubleshooting</option>
                  <option value="RAM & SSD Upgrade Enquiries">RAM & SSD Upgrade Enquiries</option>
                  <option value="Comprehensive Hardware Diagnostics">Comprehensive Hardware Diagnostics</option>
                  <option value="Data Recovery Assessment Enquiries">Data Recovery Assessment Enquiries</option>
                  <option value="Custom PC Troubleshooting & Upgrades">Custom PC Troubleshooting & Upgrades</option>
                  <option value="General Hardware Troubleshooting">Other / Unsure</option>
                </select>
              </div>

              {/* Row 4: Problem Description */}
              <div className="space-y-1.5">
                <label htmlFor="problemDescription" className="block text-xs font-semibold text-slate-700">
                  Describe the Symptoms & What Happened <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="problemDescription"
                  rows={4}
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  placeholder="e.g. When pressing the power button, the fan spins for 3 seconds then stops. No display appears. It happened after a thunderstorm yesterday..."
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.problemDescription ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:ring-blue-100 focus:border-blue-600'
                  }`}
                />
                {errors.problemDescription && (
                  <p className="text-xs text-rose-500">{errors.problemDescription}</p>
                )}
              </div>

              {/* Row 5: Contact Preference & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Preferred Contact Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['whatsapp', 'phone', 'email'] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPreferredContactMethod(method)}
                        className={`py-2 px-3 text-xs font-medium rounded-lg border capitalize transition-colors ${
                          preferredContactMethod === method
                            ? 'bg-blue-50 text-blue-700 border-blue-400 font-semibold'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="preferredTime" className="block text-xs font-semibold text-slate-700">
                    Preferred Contact Time
                  </label>
                  <select
                    id="preferredTime"
                    value={preferredContactTime}
                    onChange={(e) => setPreferredContactTime(e.target.value as any)}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="anytime">Anytime during business hours</option>
                    <option value="morning">Morning (10:00 AM – 1:00 PM)</option>
                    <option value="afternoon">Afternoon (1:00 PM – 5:00 PM)</option>
                    <option value="evening">Evening (5:00 PM – 8:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>
                    I agree to be contacted by Sudhakar regarding this repair enquiry. I understand pricing and repair feasibility are confirmed following individual device assessment.
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-xs text-rose-500 mt-1">{errors.consent}</p>
                )}
              </div>

              {/* Submit CTA Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Registering Enquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Repair Enquiry to Sudhakar</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center text-xs text-slate-500 pt-1">
                Serving customers near SR Nagar, Hyderabad · Centralized Helpline: {BUSINESS_CONFIG.phone.display}
              </div>

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
