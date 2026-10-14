import React, { useState } from 'react';
import { RepairStore } from '../lib/store';
import { RepairRequest, RepairStatus } from '../types';
import { BUSINESS_CONFIG } from '../config/business';
import { useAuth } from '../lib/auth';
import {
  X,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Lock,
  MessageSquare,
  Phone,
  Mail,
  Send,
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
}

const ALL_STATUSES: RepairStatus[] = [
  'Request Received',
  'Awaiting Contact',
  'Device Assessment',
  'Awaiting Customer Approval',
  'Awaiting Parts',
  'Repair in Progress',
  'Testing & Quality Check',
  'Ready for Collection',
  'Completed',
  'Cancelled',
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const { user, isAdmin } = useAuth();
  const [repairs, setRepairs] = useState<RepairRequest[]>(RepairStore.getAll());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRepairId, setSelectedRepairId] = useState<string>(
    repairs.length > 0 ? repairs[0].id : ''
  );

  // New Note inputs
  const [customerNoteText, setCustomerNoteText] = useState('');
  const [internalNoteText, setInternalNoteText] = useState('');
  const [costInput, setCostInput] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const refreshData = () => {
    const fresh = RepairStore.getAll();
    setRepairs(fresh);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  if (!isAdmin) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center space-y-4">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">Technician Access Required</h3>
          <p className="text-xs text-slate-600">
            You must be logged in as an administrator (Sudhakar) to view the technician workbench dashboard.
          </p>
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-900 text-white rounded-lg text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Filtered tickets
  const filtered = repairs.filter((r) => {
    const matchQuery =
      r.referenceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.customerPhone.includes(searchQuery) ||
      r.deviceBrand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchQuery && matchStatus;
  });

  const activeRepair = repairs.find((r) => r.id === selectedRepairId) || filtered[0];

  const handleStatusChange = (newStatus: RepairStatus) => {
    if (!activeRepair) return;
    RepairStore.updateStatus(activeRepair.id, newStatus);
    refreshData();
    showToast(`Status updated to "${newStatus}"`);
  };

  const handleUpdateCost = () => {
    if (!activeRepair || !costInput.trim()) return;
    RepairStore.updateStatus(activeRepair.id, activeRepair.status, costInput.trim());
    setCostInput('');
    refreshData();
    showToast('Estimated quote updated');
  };

  const handleAddCustomerNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRepair || !customerNoteText.trim()) return;
    RepairStore.addCustomerVisibleNote(activeRepair.id, customerNoteText.trim(), 'Sudhakar');
    setCustomerNoteText('');
    refreshData();
    showToast('Customer progress update posted');
  };

  const handleAddInternalNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRepair || !internalNoteText.trim()) return;
    RepairStore.addInternalNote(activeRepair.id, internalNoteText.trim(), 'Sudhakar');
    setInternalNoteText('');
    refreshData();
    showToast('Private technician note recorded');
  };

  // Real database metrics (no fake hallucinated numbers)
  const totalTickets = repairs.length;
  const inAssessment = repairs.filter((r) => r.status === 'Device Assessment').length;
  const awaitingApproval = repairs.filter((r) => r.status === 'Awaiting Customer Approval').length;
  const inProgress = repairs.filter((r) => r.status === 'Repair in Progress').length;
  const completed = repairs.filter((r) => r.status === 'Completed').length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="liquid-glass liquid-glass-specular rounded-3xl w-full max-w-7xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-white/80">
        
        {/* Top Header in Liquid Glass Dark */}
        <div className="liquid-glass-dark text-white px-6 py-4.5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tracking-tight">
              Sudhakar Repair Management Console
            </span>
            <span className="text-xs bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-full font-mono">
              SR Nagar Bench
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-300 hidden sm:inline">
              Logged in: {user?.email}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Real KPI Metrics Strip with Frosted Glass */}
        <div className="bg-white/40 backdrop-blur-xs border-b border-white/60 px-6 py-3.5 flex flex-wrap items-center gap-6 text-xs text-slate-700 shrink-0">
          <div>
            <span className="text-slate-500">Total Enquiries:</span>{' '}
            <strong className="text-slate-900 font-mono text-sm">{totalTickets}</strong>
          </div>
          <div>
            <span className="text-slate-400">In Assessment:</span>{' '}
            <strong className="text-amber-600 font-mono text-sm">{inAssessment}</strong>
          </div>
          <div>
            <span className="text-slate-400">Awaiting Approval:</span>{' '}
            <strong className="text-blue-600 font-mono text-sm">{awaitingApproval}</strong>
          </div>
          <div>
            <span className="text-slate-400">In Progress:</span>{' '}
            <strong className="text-indigo-600 font-mono text-sm">{inProgress}</strong>
          </div>
          <div>
            <span className="text-slate-400">Completed:</span>{' '}
            <strong className="text-emerald-600 font-mono text-sm">{completed}</strong>
          </div>
        </div>

        {/* Main Split Grid */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 overflow-hidden">
          
          {/* Left Column: Tickets List */}
          <div className="lg:col-span-5 flex flex-col min-h-0 bg-white">
            
            {/* Search & Filter Toolbar */}
            <div className="p-4 border-b border-slate-100 space-y-3 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search reference, name, phone, device..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                <span className="text-[11px] text-slate-400 shrink-0">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-xs bg-white border border-slate-200 rounded px-2 py-1"
                >
                  <option value="all">All Statuses ({totalTickets})</option>
                  {ALL_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* List of Repair Tickets */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  No repair requests matching filters.
                </div>
              ) : (
                filtered.map((item) => {
                  const isSelected = activeRepair?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedRepairId(item.id)}
                      className={`w-full text-left p-4 transition-colors flex flex-col gap-1 cursor-pointer ${
                        isSelected ? 'bg-blue-50/80 border-l-3 border-blue-600' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-slate-900">{item.referenceId}</span>
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                          {item.status}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-slate-800">
                        {item.customerName} · <span className="text-slate-500">{item.customerPhone}</span>
                      </div>
                      <div className="text-[11px] text-slate-600 truncate">
                        {item.deviceBrand} {item.deviceModel} — {item.problemCategory}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

          </div>

          {/* Right Column: Ticket Inspection & Actions */}
          <div className="lg:col-span-7 flex flex-col min-h-0 bg-slate-50/50 overflow-y-auto p-6 space-y-6">
            {activeRepair ? (
              <>
                {/* Active Ticket Banner */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-2xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-mono font-bold text-slate-900 text-sm">{activeRepair.referenceId}</span>
                        <span>·</span>
                        <span>Created {new Date(activeRepair.createdAt).toLocaleDateString('en-IN')}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                        {activeRepair.deviceBrand} {activeRepair.deviceModel || activeRepair.deviceType}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${activeRepair.customerPhone}`}
                        className="p-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1"
                        title="Call Customer"
                      >
                        <Phone className="w-3.5 h-3.5 text-blue-600" />
                        <span>Call</span>
                      </a>
                      <a
                        href={`https://wa.me/${activeRepair.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hello ${activeRepair.customerName}, this is Sudhakar regarding your ${activeRepair.deviceBrand} repair (Ref: ${activeRepair.referenceId})...`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-xs font-semibold flex items-center gap-1"
                        title="WhatsApp Customer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  {/* Customer Contact Card */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-lg text-xs text-slate-700 border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Customer</span>
                      <strong className="text-slate-900">{activeRepair.customerName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Contact Details</span>
                      <span>{activeRepair.customerPhone}</span>
                      <div className="text-slate-500 truncate">{activeRepair.customerEmail}</div>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Preference</span>
                      <span className="capitalize">{activeRepair.preferredContactMethod}</span> ({activeRepair.preferredContactTime})
                    </div>
                  </div>

                  {/* Problem Description */}
                  <div className="text-xs space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                      Reported Issue ({activeRepair.problemCategory}):
                    </span>
                    <p className="text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                      {activeRepair.problemDescription}
                    </p>
                  </div>

                  {/* Status Switcher & Quotation Update */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-700">
                        Update Ticket Status:
                      </label>
                      <select
                        value={activeRepair.status}
                        onChange={(e) => handleStatusChange(e.target.value as RepairStatus)}
                        className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 font-semibold text-blue-700"
                      >
                        {ALL_STATUSES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-700">
                        Quotation / Cost Estimate:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={costInput}
                          onChange={(e) => setCostInput(e.target.value)}
                          placeholder={activeRepair.estimatedCost || 'e.g. ₹2,400'}
                          className="flex-1 text-xs bg-white border border-slate-300 rounded-lg px-3 py-2"
                        />
                        <button
                          onClick={handleUpdateCost}
                          className="px-3 py-2 text-xs bg-slate-900 text-white rounded-lg hover:bg-slate-800"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer-Visible Notes Section */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>Customer-Visible Updates (Publicly Trackable)</span>
                    </h4>
                    <span className="text-[10px] text-slate-400">
                      Shows on customer status page
                    </span>
                  </div>

                  <div className="space-y-2">
                    {activeRepair.customerVisibleNotes.map((note) => (
                      <div key={note.id} className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span className="font-semibold text-slate-700">{note.author}</span>
                          <span>{new Date(note.createdAt).toLocaleString('en-IN')}</span>
                        </div>
                        <p className="text-slate-800">{note.message}</p>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleAddCustomerNote} className="flex gap-2">
                    <input
                      type="text"
                      value={customerNoteText}
                      onChange={(e) => setCustomerNoteText(e.target.value)}
                      placeholder="Add an update for customer (e.g. Parts arrived, beginning soldering)..."
                      className="flex-1 text-xs bg-white border border-slate-300 rounded-lg px-3 py-2"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post</span>
                    </button>
                  </form>
                </div>

                {/* Internal Technician Private Notes */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-amber-600" />
                      <span>Internal Technician Bench Notes (Private)</span>
                    </h4>
                    <span className="text-[10px] text-amber-600 font-medium">
                      Never visible to customer
                    </span>
                  </div>

                  <div className="space-y-2">
                    {activeRepair.internalNotes.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">No private internal notes yet.</p>
                    ) : (
                      activeRepair.internalNotes.map((note) => (
                        <div key={note.id} className="p-3 bg-amber-50/50 border border-amber-100 rounded-lg text-xs space-y-1">
                          <div className="flex items-center justify-between text-[11px] text-amber-800">
                            <span className="font-semibold">{note.author} (Bench Memo)</span>
                            <span>{new Date(note.createdAt).toLocaleString('en-IN')}</span>
                          </div>
                          <p className="text-slate-800">{note.message}</p>
                        </div>
                      ))
                    )}
                  </div>

                  <form onSubmit={handleAddInternalNote} className="flex gap-2">
                    <input
                      type="text"
                      value={internalNoteText}
                      onChange={(e) => setInternalNoteText(e.target.value)}
                      placeholder="Add bench memo (e.g. checked 3.3V standby line, ordered capacitor)..."
                      className="flex-1 text-xs bg-white border border-slate-300 rounded-lg px-3 py-2"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 flex items-center gap-1"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Save Note</span>
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-500">
                Select a ticket from the left panel to inspect details.
              </div>
            )}
          </div>

        </div>

        {/* Toast alert */}
        {toastMessage && (
          <div className="absolute bottom-4 right-4 bg-slate-900 text-white px-4 py-2.5 rounded-lg text-xs font-medium shadow-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

      </div>
    </div>
  );
};
