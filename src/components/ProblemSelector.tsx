import React, { useState } from 'react';
import { QUICK_PROBLEMS } from '../data/servicesData';
import { QuickProblem } from '../types';
import { ArrowRight, Wrench, AlertCircle } from 'lucide-react';

interface ProblemSelectorProps {
  onSelectProblem: (problem: QuickProblem) => void;
}

export const ProblemSelector: React.FC<ProblemSelectorProps> = ({ onSelectProblem }) => {
  const [selectedId, setSelectedId] = useState<string>('power-fail');

  const currentProblem = QUICK_PROBLEMS.find(p => p.id === selectedId) || QUICK_PROBLEMS[0];

  return (
    <section className="py-14 sm:py-20 relative bg-transparent border-b border-white/60" id="problem-selector">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-12">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Quick Diagnostic Selector
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            What do you need help with?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Select the symptom you are experiencing. We’ll show you the diagnostic approach and prepare your repair enquiry with one tap.
          </p>
        </div>

        {/* 12 Interactive Liquid Glass Problem Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {QUICK_PROBLEMS.map((prob) => {
            const isSelected = prob.id === selectedId;
            return (
              <button
                key={prob.id}
                onClick={() => setSelectedId(prob.id)}
                className={`text-left p-3.5 sm:p-4 rounded-xl transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'liquid-glass-blue text-white ring-2 ring-blue-500/40 shadow-lg'
                    : 'liquid-glass-interactive text-slate-800 hover:border-blue-400/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span
                      className={`text-[11px] font-semibold tracking-wide uppercase ${
                        isSelected ? 'text-blue-100' : 'text-slate-500'
                      }`}
                    >
                      {prob.symptomTag}
                    </span>
                  </div>
                  <h3 className={`text-sm sm:text-base font-semibold leading-snug ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {prob.title}
                  </h3>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/40 flex items-center justify-between text-xs font-medium">
                  <span className={isSelected ? 'text-blue-100' : 'text-blue-600'}>
                    Select
                  </span>
                  <span className={isSelected ? 'text-white' : 'text-slate-400'}>→</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Problem Advice Banner with Liquid Glass */}
        <div className="liquid-glass liquid-glass-specular rounded-2xl shadow-lg p-6 sm:p-8 transition-all">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <Wrench className="w-4 h-4 text-blue-600" />
                <span>Recommended Diagnostic Direction</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-900 font-semibold">{currentProblem.serviceCategory}</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-slate-900">
                {currentProblem.title}
              </h4>
              <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
                {currentProblem.recommendedAction} Every machine is inspected individually to verify part availability, root cause, and cost before work begins.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Repair feasibility and quotation are confirmed upon initial assessment.</span>
              </div>
            </div>

            <div className="shrink-0 flex items-center">
              <button
                onClick={() => onSelectProblem(currentProblem)}
                className="w-full md:w-auto px-6 py-3.5 text-sm font-semibold text-white liquid-glass-blue rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Book Repair for This Issue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
