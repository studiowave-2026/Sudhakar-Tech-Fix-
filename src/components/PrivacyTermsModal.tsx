import React, { useState } from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

interface PrivacyTermsModalProps {
  isOpen: boolean;
  initialTab?: 'privacy' | 'terms';
  onClose: () => void;
}

export const PrivacyTermsModal: React.FC<PrivacyTermsModalProps> = ({
  isOpen,
  initialTab = 'privacy',
  onClose,
}) => {
  const [tab, setTab] = useState<'privacy' | 'terms'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="liquid-glass liquid-glass-specular rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden border border-white/80">
        
        {/* Header in Liquid Glass Dark */}
        <div className="liquid-glass-dark text-white px-6 py-4.5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl liquid-glass-blue flex items-center justify-center shadow-xs">
              {tab === 'privacy' ? <ShieldCheck className="w-4 h-4 text-white" /> : <FileText className="w-4 h-4 text-white" />}
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">
                {tab === 'privacy' ? 'Data Privacy & Device Security Policy' : 'Terms of Service & Repair Conditions'}
              </h3>
              <p className="text-[11px] text-slate-300">
                {BUSINESS_CONFIG.businessName} · SR Nagar, Hyderabad
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher with Frosted Glass */}
        <div className="bg-white/40 backdrop-blur-xs border-b border-white/60 px-6 flex gap-4 text-xs font-semibold">
          <button
            onClick={() => setTab('privacy')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              tab === 'privacy' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Privacy & Data Confidentiality
          </button>
          <button
            onClick={() => setTab('terms')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              tab === 'terms' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Service & Quotation Terms
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[65vh] overflow-y-auto text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
          {tab === 'privacy' ? (
            <>
              <h4 className="font-bold text-slate-900 text-base">1. Customer Data Protection Commitment</h4>
              <p>
                At {BUSINESS_CONFIG.businessName}, we respect customer privacy. Information collected through our repair booking form (name, email, phone number, and device symptoms) is used solely to assess the computer issue, communicate quotations, and provide repair tracking.
              </p>

              <h4 className="font-bold text-slate-900 text-base">2. Device Data & Confidentiality</h4>
              <p>
                When a laptop or desktop is submitted for physical repair:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>We do not browse, copy, transfer, or disclose any personal files, photos, documents, or browser histories stored on your storage drives without explicit written permission.</li>
                <li>We strongly urge all customers to perform a full backup of critical personal files before submitting hardware whenever possible.</li>
                <li>We ask that customers never submit account passwords, PINs, or sensitive financial information via public online enquiry forms.</li>
              </ul>

              <h4 className="font-bold text-slate-900 text-base">3. Data Retention & Public Tracker Protection</h4>
              <p>
                Our public repair status tracker intentionally masks phone numbers, email addresses, and serial numbers. Only non-guessable reference codes display general status milestones to prevent enumeration.
              </p>
            </>
          ) : (
            <>
              <h4 className="font-bold text-slate-900 text-base">1. Assessment & Quotation Policy</h4>
              <p>
                Submitting an online repair enquiry or dropping off a machine constitutes a request for physical assessment. No repair work will proceed without providing a clear diagnostic assessment and quotation for customer authorization.
              </p>

              <h4 className="font-bold text-slate-900 text-base">2. Feasibility of Repair & Obsolete Parts</h4>
              <p>
                Certain hardware issues involving heavily oxidized circuit traces, cracked proprietary silicon chipsets, or obsolete display panels may be technically unfeasible or financially uneconomical to repair. Sudhakar will inform you honestly of feasibility during the assessment phase.
              </p>

              <h4 className="font-bold text-slate-900 text-base">3. Collection & Storage</h4>
              <p>
                Once a device is marked "Ready for Collection", customers are kindly requested to inspect and collect their machine at the agreed SR Nagar drop-off location within 14 days of completion notification.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
