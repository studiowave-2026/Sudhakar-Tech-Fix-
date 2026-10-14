import React, { useState } from 'react';
import { SERVICES_LIST } from '../data/servicesData';
import { ServiceItem } from '../types';
import {
  Laptop,
  Monitor,
  Maximize2,
  BatteryCharging,
  Keyboard,
  Gauge,
  Disc,
  ShieldAlert,
  Cpu,
  Wrench,
  Database,
  Server,
  ArrowRight,
  Info,
} from 'lucide-react';

interface ServicesSectionProps {
  onRequestService: (service: ServiceItem) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Laptop,
  Monitor,
  Maximize2,
  BatteryCharging,
  Keyboard,
  Gauge,
  Disc,
  ShieldAlert,
  Cpu,
  Wrench,
  Database,
  Server,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onRequestService }) => {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<'all' | 'hardware' | 'performance' | 'software'>('all');

  const filteredServices = SERVICES_LIST.filter(s => {
    if (selectedCategoryFilter === 'hardware') {
      return ['laptop-repair', 'desktop-repair', 'screen-replacement', 'battery-charging', 'keyboard-touchpad', 'hardware-diagnostics'].includes(s.id);
    }
    if (selectedCategoryFilter === 'performance') {
      return ['slow-computer', 'ram-ssd-upgrade', 'custom-pc'].includes(s.id);
    }
    if (selectedCategoryFilter === 'software') {
      return ['software-os', 'virus-malware', 'data-recovery'].includes(s.id);
    }
    return true;
  });

  return (
    <section className="py-16 sm:py-24 relative bg-transparent border-b border-white/60" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Diagnostic & Hardware Services
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Expert Repairs Tailored for Your Device
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every device is inspected carefully on the bench. We clarify the root cause, determine part availability, and quote you before proceeding with authorized repairs.
            </p>
          </div>

          {/* Interactive filter tabs (liquid glass pill control) */}
          <div className="flex items-center gap-1 p-1.5 liquid-glass-pill rounded-xl self-start md:self-auto shrink-0 shadow-2xs">
            <button
              onClick={() => setSelectedCategoryFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedCategoryFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-sm border border-white/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All (12)
            </button>
            <button
              onClick={() => setSelectedCategoryFilter('hardware')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedCategoryFilter === 'hardware'
                  ? 'bg-white text-slate-900 shadow-sm border border-white/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hardware
            </button>
            <button
              onClick={() => setSelectedCategoryFilter('performance')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedCategoryFilter === 'performance'
                  ? 'bg-white text-slate-900 shadow-sm border border-white/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Upgrades & Speed
            </button>
            <button
              onClick={() => setSelectedCategoryFilter('software')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedCategoryFilter === 'software'
                  ? 'bg-white text-slate-900 shadow-sm border border-white/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              OS & Recovery
            </button>
          </div>
        </div>

        {/* 12 Services Liquid Glass Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => {
            const Icon = ICON_MAP[service.iconName] || Wrench;
            const displayIndex = (index + 1).toString().padStart(2, '0');

            return (
              <div
                key={service.id}
                className="liquid-glass-interactive liquid-glass-specular rounded-2xl p-6 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  
                  {/* Service Header: Editorial Numbering & Liquid Glass Icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl liquid-glass-pill flex items-center justify-center text-blue-600 shadow-2xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-slate-400 font-medium">
                      {displayIndex}.
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Common Symptoms */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-200/50">
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Typical Indicators
                    </p>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {service.commonSymptoms.map((sym, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-blue-500 font-bold shrink-0">·</span>
                          <span>{sym}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Diagnostic Approach Note in Frosted Glass */}
                  <div className="bg-white/60 backdrop-blur-xs rounded-xl p-3 border border-white/80 text-xs text-slate-600 shadow-2xs">
                    <span className="font-semibold text-slate-800">Bench Check: </span>
                    {service.diagnosticApproach}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="mt-6 pt-4 border-t border-slate-200/50 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Individual quote on check
                  </span>
                  <button
                    onClick={() => onRequestService(service)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Request This Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Liquid Glass Note Banner */}
        <div className="mt-12 p-5 liquid-glass liquid-glass-specular rounded-2xl flex items-start sm:items-center gap-3.5 text-xs sm:text-sm text-blue-950 shadow-md">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <strong>Note on Feasibility:</strong> We do not claim every hardware fault can be salvaged. If an internal chip, liquid-corroded line, or obsolete panel is unviable, Sudhakar will inform you honestly so you don’t spend money on an uneconomical repair.
          </p>
        </div>
      </div>
    </section>
  );
};
