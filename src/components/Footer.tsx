import React from 'react';
import { BUSINESS_CONFIG } from '../config/business';
import { Phone, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenChecklist: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onOpenChecklist,
  onOpenAdmin,
}) => {
  return (
    <footer className="liquid-glass-dark text-slate-400 text-xs border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & Location Column */}
          <div className="lg:col-span-2 space-y-3">
            <a href="/" className="text-lg font-bold text-white tracking-tight hover:text-blue-400 transition-colors">
              {BUSINESS_CONFIG.businessName}
            </a>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Professional computer, desktop, and laptop hardware repair services by {BUSINESS_CONFIG.technicianName}. Serving clients near SR Nagar, Ameerpet, Sanath Nagar, and central Hyderabad.
            </p>
            <div className="pt-2 text-slate-300 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <a href={`tel:${BUSINESS_CONFIG.phone.tel}`} className="hover:text-white font-medium">
                {BUSINESS_CONFIG.phone.display}
              </a>
              <span className="text-slate-600">·</span>
              <span className="text-slate-500">SR Nagar, Hyderabad</span>
            </div>
          </div>

          {/* Core Services Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Diagnostic Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-white transition-colors">Laptop Motherboard Repair</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Screen Replacement Checks</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Desktop Tower Diagnostics</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">High-Speed SSD & RAM Upgrades</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Battery & Charging Ports</a>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#track-repair" className="hover:text-white transition-colors">Track Repair Status</a>
              </li>
              <li>
                <a href="#why-sudhakar" className="hover:text-white transition-colors">Why Work With Sudhakar</a>
              </li>
              <li>
                <a href="#book-repair" className="hover:text-white transition-colors">Book an Assessment</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Verification & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Trust & Administration
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenPrivacy} className="hover:text-white transition-colors text-left cursor-pointer">
                  Data Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={onOpenTerms} className="hover:text-white transition-colors text-left cursor-pointer">
                  Service Terms
                </button>
              </li>
              <li>
                <button onClick={onOpenChecklist} className="text-amber-400 hover:text-amber-300 transition-colors text-left flex items-center gap-1 cursor-pointer">
                  <span>Pre-Launch Checklist</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="text-slate-400 hover:text-blue-400 transition-colors text-left cursor-pointer">
                  Technician Admin Portal
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Location Note */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} {BUSINESS_CONFIG.businessName}. All rights reserved. Near SR Nagar, Hyderabad, Telangana, India.
          </p>
          <p className="text-slate-500 text-center sm:text-right">
            Temporary Helpline: {BUSINESS_CONFIG.phone.display} · Individual diagnostics & quotes before repair
          </p>
        </div>

      </div>
    </footer>
  );
};
