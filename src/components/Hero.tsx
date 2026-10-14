import React, { useState } from 'react';
import { Phone, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

interface HeroProps {
  onBookRepair: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookRepair, onExploreServices }) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  return (
    <section className="relative overflow-hidden bg-white/40 backdrop-blur-md border-b border-white/60 pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Subtle background ambient warmth */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 w-80 h-80 bg-slate-200/40 rounded-full blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Liquid Glass Location Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill text-xs font-semibold text-blue-800 tracking-wide uppercase shadow-2xs">
              <span>SR Nagar</span>
              <span aria-hidden="true" className="text-blue-300">/</span>
              <span>Hyderabad</span>
              <span aria-hidden="true" className="text-blue-300">/</span>
              <span>Computer & Laptop Technician</span>
            </div>

            {/* Main Headline with text-wrap: balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12] text-balance">
              Computer or Laptop Problems? <span className="text-blue-600">Let’s Fix Them.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-slate-700 max-w-2xl leading-relaxed">
              Get help with laptop and desktop issues from <strong className="text-slate-950 font-semibold">{BUSINESS_CONFIG.technicianName}</strong>, serving customers near SR Nagar, Hyderabad. Direct technician diagnosis, honest assessments, and clear quotations before authorized repairs.
            </p>

            {/* Actions: Primary CTA, Secondary Call, Explore */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onBookRepair}
                className="px-6 py-3.5 text-sm font-semibold text-white liquid-glass-blue rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Book a Repair</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${BUSINESS_CONFIG.phone.tel}`}
                className="px-5 py-3.5 text-sm font-semibold text-slate-800 liquid-glass-interactive rounded-xl flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Call Sudhakar</span>
              </a>

              <button
                onClick={onExploreServices}
                className="px-4 py-3.5 text-sm font-medium text-slate-700 hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
              >
                Explore Services
              </button>
            </div>

            {/* Trust-oriented benefits: Liquid glass bar */}
            <div className="pt-6 border-t border-slate-200/50 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg liquid-glass-pill">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Personal assistance</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg liquid-glass-pill">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Clear diagnostic communication</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg liquid-glass-pill">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Transparent repair enquiries</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Image with Liquid Glass Specular Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/80 shadow-2xl bg-slate-900 aspect-16/10 lg:aspect-4/3 liquid-glass-specular">
              {imageLoaded ? (
                <img
                  src="/src/assets/images/hero_laptop_repair_1791992968284.jpg"
                  alt="Sudhakar computer and laptop electronics repair workbench in Hyderabad"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={() => setImageLoaded(false)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-300 bg-slate-800">
                  <ShieldAlert className="w-10 h-10 text-blue-400 mb-2" />
                  <p className="font-semibold text-white">Precision Electronics Workbench</p>
                  <p className="text-xs text-slate-400 mt-1">Component-level diagnostics & repair station</p>
                </div>
              )}

              {/* Liquid glass caption scrim */}
              <div className="absolute inset-x-0 bottom-0 liquid-glass-dark p-4 sm:p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">SR Nagar Workbench</p>
                <p className="text-sm font-medium text-slate-200">Hardware diagnostics, component microsoldering & clean thermal overhauls</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
