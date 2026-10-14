import React, { useState, useEffect } from 'react';
import { RepairStore } from '../lib/store';
import { SanitizedPublicRepair, RepairStatus } from '../types';
import { useAuth } from '../lib/auth';
import { BUSINESS_CONFIG } from '../config/business';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Phone,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

const STATUS_STEPS: RepairStatus[] = [
  'Request Received',
  'Device Assessment',
  'Awaiting Customer Approval',
  'Repair in Progress',
  'Testing & Quality Check',
  'Ready for Collection',
  'Completed',
];

interface RepairTrackerProps {
  initialReference?: string;
  onOpenBooking: () => void;
  onOpenAuth: () => void;
}

export const RepairTracker: React.FC<RepairTrackerProps> = ({
  initialReference,
  onOpenBooking,
  onOpenAuth,
}) => {
  const { user } = useAuth();
  const [referenceInput, setReferenceInput] = useState(initialReference || '');
  const [searchedRecord, setSearchedRecord] = useState<SanitizedPublicRepair | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Pre-load reference if provided
  useEffect(() => {
    if (initialReference) {
      setReferenceInput(initialReference);
      doSearch(initialReference);
    }
  }, [initialReference]);

  const doSearch = (ref: string) => {
    const clean = ref.trim().toUpperCase();
    if (!clean) {
      setErrorMsg('Please enter a tracking reference code (e.g. HYD-SRN-48219).');
      return;
    }

    setErrorMsg('');
    setHasSearched(true);
    const result = RepairStore.getPublicStatus(clean);
    if (!result) {
      setSearchedRecord(null);
      setErrorMsg(`No active repair found matching "${clean}". Please verify your reference code or contact Sudhakar.`);
    } else {
      setSearchedRecord(result);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch(referenceInput);
  };

  // Helper to test status progress
  const getStepState = (step: RepairStatus, currentStatus: RepairStatus) => {
    const currentIndex = STATUS_STEPS.indexOf(currentStatus);
    const stepIndex = STATUS_STEPS.indexOf(step);

    if (currentStatus === 'Cancelled') {
      return 'cancelled';
    }

    if (currentIndex === -1 || stepIndex === -1) {
      // Custom intermediary like "Awaiting Parts" or "Awaiting Contact"
      return currentStatus === step ? 'current' : 'upcoming';
    }

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <section className="py-16 sm:py-24 relative bg-transparent border-b border-white/60" id="track-repair">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Live Repair Tracking
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Check Your Repair Progress
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Enter your unique reference number to see real-time updates from Sudhakar’s SR Nagar repair bench.
          </p>
        </div>

        {/* Reference Code Lookup Input Card with Liquid Glass */}
        <div className="max-w-xl mx-auto mb-12">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center shadow-lg rounded-2xl">
            <input
              type="text"
              value={referenceInput}
              onChange={(e) => setReferenceInput(e.target.value)}
              placeholder="e.g. HYD-SRN-48219"
              className="w-full pl-11 pr-28 py-4 text-sm sm:text-base font-mono uppercase bg-white/75 backdrop-blur-md border border-white/95 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-600 shadow-sm"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5" />
            <button
              type="submit"
              className="absolute right-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white liquid-glass-blue rounded-xl transition-all shadow-xs cursor-pointer"
            >
              Track
            </button>
          </form>

          {/* Quick Demo Pill shortcuts in Liquid Glass */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600">
            <span>Try sample codes:</span>
            <button
              type="button"
              onClick={() => {
                setReferenceInput('HYD-SRN-48219');
                doSearch('HYD-SRN-48219');
              }}
              className="font-mono text-blue-700 font-semibold liquid-glass-pill px-2.5 py-1 rounded-md hover:bg-white cursor-pointer shadow-2xs"
            >
              HYD-SRN-48219
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => {
                setReferenceInput('HYD-SRN-51028');
                doSearch('HYD-SRN-51028');
              }}
              className="font-mono text-blue-700 font-semibold liquid-glass-pill px-2.5 py-1 rounded-md hover:bg-white cursor-pointer shadow-2xs"
            >
              HYD-SRN-51028
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => {
                setReferenceInput('HYD-SRN-39104');
                doSearch('HYD-SRN-39104');
              }}
              className="font-mono text-blue-700 font-semibold liquid-glass-pill px-2.5 py-1 rounded-md hover:bg-white cursor-pointer shadow-2xs"
            >
              HYD-SRN-39104
            </button>
          </div>

          {errorMsg && (
            <div className="mt-4 p-3.5 bg-rose-50/80 backdrop-blur-xs border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2 shadow-2xs">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Found Record Display with Liquid Glass */}
        {searchedRecord && (
          <div className="liquid-glass liquid-glass-specular rounded-3xl p-6 sm:p-8 space-y-8 animate-in fade-in duration-200 shadow-2xl">
            
            {/* Header of Ticket */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/50">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Device Ticket</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-slate-700 font-semibold">{searchedRecord.referenceId}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {searchedRecord.deviceBrand} {searchedRecord.deviceModelMasked || searchedRecord.deviceType}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Category: {searchedRecord.problemCategory}
                </p>
              </div>

              <div className="sm:text-right">
                <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold liquid-glass-blue text-white shadow-xs">
                  {searchedRecord.status}
                </span>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">
                  Updated: {new Date(searchedRecord.updatedAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>

            {/* Stepper Progress Bar with Liquid Glass */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Workflow Progress
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {STATUS_STEPS.map((step, idx) => {
                  const state = getStepState(step, searchedRecord.status);
                  return (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl text-center transition-all ${
                        state === 'completed'
                          ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 backdrop-blur-xs font-semibold'
                          : state === 'current'
                          ? 'liquid-glass-blue text-white font-bold shadow-md ring-2 ring-blue-500/30'
                          : 'liquid-glass-pill text-slate-400'
                      }`}
                    >
                      <div className="text-[10px] font-mono mb-1">
                        {state === 'completed' ? '✓' : `0${idx + 1}`}
                      </div>
                      <div className="text-xs leading-tight line-clamp-2">
                        {step}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Updates & Notes from Sudhakar */}
            <div className="space-y-3 pt-4 border-t border-slate-200/50">
              <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Technician Activity Log</span>
              </h4>

              {searchedRecord.customerVisibleNotes && searchedRecord.customerVisibleNotes.length > 0 ? (
                <div className="space-y-2.5">
                  {searchedRecord.customerVisibleNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-4 rounded-xl liquid-glass-interactive text-xs text-slate-700 space-y-1"
                    >
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span className="font-semibold text-slate-800">{note.author}</span>
                        <span>{new Date(note.createdAt).toLocaleString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}</span>
                      </div>
                      <p className="text-slate-800 leading-relaxed font-normal">{note.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">No updates logged yet.</p>
              )}
            </div>

            {/* Estimate & Contact Strip */}
            <div className="p-5 rounded-2xl liquid-glass-pill border border-white/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-blue-800 font-semibold">Estimated Quotation / Status</p>
                <p className="text-lg font-bold text-slate-900 mt-0.5">
                  {searchedRecord.estimatedCost || 'Assessment in progress'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`tel:${BUSINESS_CONFIG.phone.tel}`}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-800 bg-white/90 hover:bg-white border border-white rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>Call Sudhakar</span>
                </a>
                <a
                  href={`${BUSINESS_CONFIG.phone.whatsappUrl}?text=${encodeURIComponent(
                    `Hello Sudhakar, regarding repair reference ${searchedRecord.referenceId} (${searchedRecord.deviceBrand})...`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Security Guarantee Notice */}
            <p className="text-[11px] text-slate-500 text-center">
              *For security and privacy, customer contact phone and personal address are never displayed on public reference trackers.
            </p>

          </div>
        )}

        {/* Not Found empty card */}
        {!searchedRecord && !hasSearched && (
          <div className="p-8 text-center liquid-glass rounded-3xl border border-white/80 max-w-xl mx-auto space-y-3 shadow-lg">
            <Clock className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-sm font-semibold text-slate-800">Looking for an existing ticket?</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Check your SMS, WhatsApp, or confirmation receipt for your 5-digit SR Nagar repair reference (e.g. HYD-SRN-XXXXX).
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Or submit a new repair enquiry →
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
