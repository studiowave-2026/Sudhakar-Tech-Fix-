import React from 'react';
import { ClipboardList, PhoneCall, CheckSquare, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Submit Device Enquiry',
      desc: 'Fill out our quick form or call Sudhakar with your device brand, model, and the issues you are seeing.',
      icon: ClipboardList,
    },
    {
      step: '02',
      title: 'Direct Technician Discussion',
      desc: 'Sudhakar reviews your reported symptoms directly to determine whether a bench inspection is needed.',
      icon: PhoneCall,
    },
    {
      step: '03',
      title: 'Diagnosis & Transparent Quotation',
      desc: 'Your machine is inspected. You receive an honest appraisal and cost estimate before any repair is authorized.',
      icon: CheckSquare,
    },
    {
      step: '04',
      title: 'Quality Testing & Collection',
      desc: 'After repairs and system stress testing are complete, you receive an update and collect your device as agreed.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-16 sm:py-24 relative bg-transparent border-b border-white/60" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Clear & Predictable Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            How Your Repair Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            No surprise fees, no unauthorized replacements. We follow a disciplined 4-step diagnostic workflow from initial enquiry to final testing.
          </p>
        </div>

        {/* 4 Liquid Glass Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="liquid-glass liquid-glass-specular rounded-2xl p-6 shadow-md flex flex-col justify-between relative hover:translate-y-[-2px] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-white liquid-glass-blue px-2.5 py-1 rounded-md shadow-2xs">
                      STEP {item.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl liquid-glass-pill flex items-center justify-center text-slate-800 shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/50 text-[11px] text-slate-500 font-medium">
                  {index === 2 ? 'Approval required before work' : 'Customer-first communication'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Honest Drop-off / Pickup Note */}
        <div className="mt-10 text-center text-xs text-slate-600 max-w-xl mx-auto px-4 py-2 rounded-full liquid-glass-pill">
          *Note: Physical drop-off arrangements and turnaround times are confirmed individually with Sudhakar near SR Nagar.
        </div>

      </div>
    </section>
  );
};
