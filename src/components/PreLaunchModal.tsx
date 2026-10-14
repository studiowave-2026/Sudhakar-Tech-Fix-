import React from 'react';
import { X, CheckCircle2, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

interface PreLaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PreLaunchModal: React.FC<PreLaunchModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="liquid-glass liquid-glass-specular rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden border border-white/80">
        
        {/* Header in Liquid Glass Dark */}
        <div className="liquid-glass-dark text-white px-6 py-4.5 flex items-center justify-between border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold tracking-tight">Pre-Launch Verification Checklist</h3>
              <span className="text-[10px] bg-amber-400 text-slate-950 font-semibold px-2 py-0.5 rounded-full">
                Action Required
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              4 critical business items to confirm directly with Sudhakar before official public marketing
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
          <p className="text-xs text-slate-600 leading-relaxed">
            To maintain strict consumer trust and prevent misleading claims, the website operates on confirmed factual information only. The following four items are pending Sudhakar’s final business confirmation:
          </p>

          <div className="space-y-3">
            {BUSINESS_CONFIG.launchChecklist.map((item, idx) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-mono text-[11px] flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span>{item.field}</span>
                  </span>
                  <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium border border-amber-200">
                    Pending Confirmation
                  </span>
                </div>

                <div className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200/80 space-y-1">
                  <p>
                    <strong className="text-slate-800">Current Site Value:</strong> {item.currentValue}
                  </p>
                  <p className="text-blue-900 font-medium">
                    <strong>Question for Sudhakar:</strong> {item.questionForSudhakar}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-blue-50/80 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-1">
            <p className="font-semibold">Centralized Architecture Advantage:</p>
            <p>
              All contact details and shop parameters are centralized in <code>src/config/business.ts</code>. When Sudhakar confirms his final phone number and exact shop address, updating that single configuration file immediately updates all website links, call buttons, WhatsApp triggers, and Schema.org metadata.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
};
