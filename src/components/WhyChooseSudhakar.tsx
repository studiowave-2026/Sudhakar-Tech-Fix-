import React, { useState } from 'react';
import { ShieldCheck, MessageSquare, FileCheck2, Lock, Cpu, HeartHandshake } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const WhyChooseSudhakar: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(true);

  const commitments = [
    {
      title: 'Direct Technician Conversation',
      description: 'You communicate directly with Sudhakar rather than an intermediary front-desk or ticketing queue.',
      icon: MessageSquare,
    },
    {
      title: 'Transparent Quotations First',
      description: 'You will receive a clear estimate explaining what parts or labor are needed before any repair starts.',
      icon: FileCheck2,
    },
    {
      title: 'Customer Data Confidentiality',
      description: 'Personal storage, documents, and photos are treated with strict confidentiality and care.',
      icon: Lock,
    },
    {
      title: 'Real Hardware Feasibility',
      description: 'If an older machine is uneconomical to repair, Sudhakar will tell you plainly so you don’t waste money.',
      icon: Cpu,
    },
    {
      title: 'No Unnecessary Upselling',
      description: 'We recommend only what is required to restore system stability and speed.',
      icon: ShieldCheck,
    },
    {
      title: 'Active Progress Updates',
      description: 'Track the status of your machine online anytime with your unique repair reference code.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-16 sm:py-24 relative bg-transparent border-b border-white/60" id="why-sudhakar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Commitments & Principles */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Service Principles & Standards
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Why Work With Sudhakar in SR Nagar?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                When your computer or laptop fails, you need a technician you can talk to directly. Here are the core service commitments behind every repair.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {commitments.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl liquid-glass-interactive liquid-glass-specular flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-9 h-9 rounded-xl liquid-glass-pill text-blue-600 flex items-center justify-center mb-3 shadow-2xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 text-xs text-slate-500">
              *All commitments reflect Sudhakar’s direct operating principles for every client in the SR Nagar and greater Hyderabad area.
            </div>
          </div>

          {/* Right: Technical Workbench Photography with Liquid Glass Specular Frame */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-white/80 shadow-2xl bg-slate-900 aspect-4/3 liquid-glass-specular">
              {imageLoaded ? (
                <img
                  src="/src/assets/images/technician_diagnostic_bench_1791992968819.jpg"
                  alt="Precision motherboard testing multimeter diagnostics at Sudhakar repair bench"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={() => setImageLoaded(false)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-300">
                  <ShieldCheck className="w-10 h-10 text-blue-400 mb-2" />
                  <p className="font-semibold text-white">Diagnostics & Microsoldering</p>
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 liquid-glass-dark p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">Bench Rigor</p>
                <p className="text-sm font-medium text-slate-200">Systematic electrical voltage probe checking and component replacement</p>
              </div>
            </div>

            <div className="p-4 rounded-xl liquid-glass-pill flex items-center justify-between text-xs text-slate-800 shadow-2xs">
              <div>
                <span className="font-semibold text-slate-900">Direct Contact: </span>
                <span>{BUSINESS_CONFIG.phone.display}</span>
              </div>
              <span className="text-slate-500">SR Nagar, Hyderabad</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
