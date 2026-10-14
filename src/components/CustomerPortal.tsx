import React, { useState } from 'react';
import { useAuth } from '../lib/auth';
import { RepairStore } from '../lib/store';
import { RepairRequest } from '../types';
import {
  X,
  User,
  Laptop,
  Clock,
  Phone,
  MessageSquare,
  CheckCircle2,
  Plus,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

interface CustomerPortalProps {
  onClose: () => void;
  onNewRepair: () => void;
  onTrackReference: (ref: string) => void;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({
  onClose,
  onNewRepair,
  onTrackReference,
}) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'repairs' | 'profile'>('repairs');

  if (!user) return null;

  // Retrieve only repairs belonging to this customer
  const userRepairs = RepairStore.getByCustomerEmail(user.email);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="liquid-glass liquid-glass-specular rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-white/80">
        
        {/* Header in Liquid Glass Dark */}
        <div className="liquid-glass-dark text-white px-6 py-4.5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full liquid-glass-blue flex items-center justify-center text-white font-bold text-xs shadow-xs">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">{user.name}</h3>
              <p className="text-[11px] text-slate-300">Customer Account · {user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="text-xs text-slate-300 hover:text-white px-2 py-1"
            >
              Log Out
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs with Frosted Glass */}
        <div className="bg-white/40 backdrop-blur-xs border-b border-white/60 px-6 flex items-center justify-between text-xs font-medium">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('repairs')}
              className={`py-3 border-b-2 font-semibold transition-colors cursor-pointer ${
                activeTab === 'repairs'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              My Repair Requests ({userRepairs.length})
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-3 border-b-2 font-semibold transition-colors cursor-pointer ${
                activeTab === 'profile'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Personal Profile
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              onNewRepair();
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Repair Enquiry</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {activeTab === 'repairs' ? (
            <div className="space-y-4">
              {userRepairs.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200 p-8 space-y-3">
                  <Laptop className="w-10 h-10 text-slate-400 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-800">No Repair Tickets on File</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    You haven’t logged any repair enquiries under this email yet. When you submit a request, you can monitor bench progress right here.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onNewRepair();
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 mt-2"
                  >
                    Submit First Enquiry
                  </button>
                </div>
              ) : (
                userRepairs.map((repair) => (
                  <div
                    key={repair.id}
                    className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-2xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-mono font-bold text-slate-900">{repair.referenceId}</span>
                          <span className="text-slate-300">·</span>
                          <span className="text-slate-500">
                            Logged {new Date(repair.createdAt).toLocaleDateString('en-IN')}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 mt-0.5">
                          {repair.deviceBrand} {repair.deviceModel || repair.deviceType}
                        </h4>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                          {repair.status}
                        </span>
                        <button
                          onClick={() => {
                            onClose();
                            onTrackReference(repair.referenceId);
                          }}
                          className="text-xs text-blue-600 hover:underline font-medium"
                        >
                          View Timeline →
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1">
                      <p>
                        <strong className="text-slate-800">Category:</strong> {repair.problemCategory}
                      </p>
                      <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        {repair.problemDescription}
                      </p>
                    </div>

                    {/* Customer Visible Updates from Sudhakar */}
                    {repair.customerVisibleNotes && repair.customerVisibleNotes.length > 0 && (
                      <div className="pt-2 border-t border-slate-100 space-y-2">
                        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                          Latest Update from Sudhakar:
                        </span>
                        {repair.customerVisibleNotes.slice(-2).map((n) => (
                          <div key={n.id} className="p-2.5 bg-blue-50/60 border border-blue-100 rounded-lg text-xs text-blue-900">
                            <span className="font-semibold block text-[10px] text-blue-700">
                              {n.author} · {new Date(n.createdAt).toLocaleDateString('en-IN')}
                            </span>
                            {n.message}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-500">
                      <div>
                        Quotation Estimate: <strong className="text-slate-900">{repair.estimatedCost || 'Assessment in progress'}</strong>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${BUSINESS_CONFIG.phone.tel}`}
                          className="px-3 py-1.5 text-slate-700 bg-slate-100 rounded hover:bg-slate-200 flex items-center gap-1 font-medium"
                        >
                          <Phone className="w-3 h-3 text-blue-600" />
                          <span>Call Shop</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* Profile View */
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 max-w-lg">
              <h4 className="text-sm font-bold text-slate-900">Account Details</h4>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-0.5">Full Name</label>
                  <p className="font-semibold text-slate-900 text-sm">{user.name}</p>
                </div>
                <div>
                  <label className="text-slate-400 block mb-0.5">Email Address</label>
                  <p className="font-semibold text-slate-900 text-sm">{user.email}</p>
                </div>
                <div>
                  <label className="text-slate-400 block mb-0.5">Phone Number</label>
                  <p className="font-semibold text-slate-900 text-sm">{user.phone || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-slate-400 block mb-0.5">Account Role</label>
                  <p className="font-semibold text-slate-900 text-sm capitalize">{user.role}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
                To update your contact email or telephone, contact Sudhakar directly or submit updated contact details with your next repair request.
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
