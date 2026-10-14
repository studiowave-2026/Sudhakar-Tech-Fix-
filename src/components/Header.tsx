import React, { useState } from 'react';
import { Phone, User, ShieldCheck, Menu, X, ArrowUpRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { useAuth } from '../lib/auth';

interface HeaderProps {
  onOpenBooking: (prefillCategory?: string) => void;
  onOpenAuth: () => void;
  onOpenAdmin: () => void;
  onOpenCustomerPortal: () => void;
  onOpenLaunchChecklist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenAuth,
  onOpenAdmin,
  onOpenCustomerPortal,
  onOpenLaunchChecklist,
}) => {
  const { user, isAdmin, logout, quickSwitchPersona } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);

  return (
    <>
      {/* Top Banner for Pre-Launch Transparency */}
      <div className="liquid-glass-dark text-slate-300 text-xs py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-blue-400 font-medium">SR Nagar, Hyderabad</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Direct Technician Contact: {BUSINESS_CONFIG.phone.display}</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenLaunchChecklist}
              className="text-xs text-amber-300 hover:text-amber-200 underline underline-offset-2 flex items-center gap-1 cursor-pointer"
            >
              <span>Pre-Launch Checklist (4 Items)</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                className="text-xs text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer py-0.5 px-2 rounded-md bg-white/5 border border-white/10"
              >
                <span>Demo Role: {user ? (isAdmin ? 'Admin' : 'Customer') : 'Visitor'}</span>
                <span className="text-[10px] text-blue-400">▾</span>
              </button>
              {showPersonaMenu && (
                <div className="absolute right-0 mt-1.5 w-52 liquid-glass liquid-glass-specular text-slate-900 shadow-2xl rounded-xl border border-white/80 py-1.5 z-50 text-xs">
                  <div className="px-3 py-1.5 text-slate-400 font-medium border-b border-slate-200/50">
                    Switch Test Account
                  </div>
                  <button
                    onClick={() => {
                      quickSwitchPersona('customer');
                      setShowPersonaMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-white/60 flex items-center justify-between"
                  >
                    <span>Customer (Rahul Sharma)</span>
                    <span className="text-slate-400 text-[10px]">Active Ticket</span>
                  </button>
                  <button
                    onClick={() => {
                      quickSwitchPersona('admin');
                      setShowPersonaMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-white/60 flex items-center justify-between"
                  >
                    <span>Sudhakar (Technician / Admin)</span>
                    <span className="text-blue-600 font-medium text-[10px]">Dashboard</span>
                  </button>
                  <button
                    onClick={() => {
                      quickSwitchPersona('none');
                      setShowPersonaMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-white/60 text-slate-600 border-t border-slate-200/50"
                  >
                    Standard Visitor (Logged Out)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Strict 3-Zone Navigation with Liquid Glass Specular Reflection */}
      <header className="sticky top-0 z-40 liquid-glass liquid-glass-specular border-b border-white/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <a
            href="/"
            className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-blue-600 transition-colors"
          >
            {BUSINESS_CONFIG.shortBrand}
          </a>

          {/* Zone 2: 4-5 Clean single-line nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#services" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Services
            </a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              How It Works
            </a>
            <a href="#track-repair" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Track Repair
            </a>
            <a href="#why-sudhakar" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Why Sudhakar
            </a>
            <a href="#faq" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              FAQ
            </a>
            <a href="#contact" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 Primary action + Account state */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Phone quick link for desktop */}
            <a
              href={`tel:${BUSINESS_CONFIG.phone.tel}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 liquid-glass-pill hover:bg-white/90 transition-all rounded-lg whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>{BUSINESS_CONFIG.phone.display}</span>
            </a>

            {/* Auth Button */}
            {user ? (
              <div className="flex items-center gap-2">
                {isAdmin ? (
                  <button
                    onClick={onOpenAdmin}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-900/90 hover:bg-slate-900 border border-white/20 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span>Admin Panel</span>
                  </button>
                ) : (
                  <button
                    onClick={onOpenCustomerPortal}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 liquid-glass-pill hover:bg-white/90 transition-all rounded-lg whitespace-nowrap shrink-0"
                  >
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>My Repairs</span>
                  </button>
                )}
                <button
                  onClick={logout}
                  className="text-xs text-slate-500 hover:text-slate-900 px-2 py-1 whitespace-nowrap"
                  title="Log out"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
              >
                <User className="w-3.5 h-3.5" />
                <span>Account</span>
              </button>
            )}

            {/* Primary Action Button */}
            <button
              onClick={() => onOpenBooking()}
              className="px-4 py-2 text-xs font-semibold text-white liquid-glass-blue rounded-lg transition-all shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book a Repair
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
            <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-blue-600"
              >
                Services
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-blue-600"
              >
                How It Works
              </a>
              <a
                href="#track-repair"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-blue-600"
              >
                Track Repair
              </a>
              <a
                href="#why-sudhakar"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-blue-600"
              >
                Why Sudhakar
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-blue-600"
              >
                FAQ
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-blue-600"
              >
                Contact
              </a>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={`tel:${BUSINESS_CONFIG.phone.tel}`}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-slate-800 bg-slate-100 rounded-lg"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>Call {BUSINESS_CONFIG.phone.display}</span>
              </a>
              {!user && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full py-2 text-xs font-medium text-slate-700 border border-slate-200 rounded-lg"
                >
                  Customer / Admin Login
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
