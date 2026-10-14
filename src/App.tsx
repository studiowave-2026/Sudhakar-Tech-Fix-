import React, { useState } from 'react';
import { AuthProvider, useAuth } from './lib/auth';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProblemSelector } from './components/ProblemSelector';
import { ServicesSection } from './components/ServicesSection';
import { HowItWorks } from './components/HowItWorks';
import { WhyChooseSudhakar } from './components/WhyChooseSudhakar';
import { RepairBookingForm } from './components/RepairBookingForm';
import { RepairTracker } from './components/RepairTracker';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { AuthModal } from './components/AuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { CustomerPortal } from './components/CustomerPortal';
import { PreLaunchModal } from './components/PreLaunchModal';
import { PrivacyTermsModal } from './components/PrivacyTermsModal';
import { QuickProblem, ServiceItem, RepairRequest } from './types';

const MainApp: React.FC = () => {
  const { user, isAdmin } = useAuth();

  // Modals & Sub-views
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [customerPortalOpen, setCustomerPortalOpen] = useState(false);
  const [checklistOpen, setChecklistOpen] = useState(false);
  const [privacyModal, setPrivacyModal] = useState<{ isOpen: boolean; tab: 'privacy' | 'terms' }>({
    isOpen: false,
    tab: 'privacy',
  });

  // Dynamic Flow Pre-selection
  const [preselectedCategory, setPreselectedCategory] = useState<string>('Laptop Repair & Component Service');
  const [activeTrackingRef, setActiveTrackingRef] = useState<string>('');

  const scrollToBooking = (category?: string) => {
    if (category) {
      setPreselectedCategory(category);
    }
    const elem = document.getElementById('book-repair');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const elem = document.getElementById('services');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTracking = (ref?: string) => {
    if (ref) {
      setActiveTrackingRef(ref);
    }
    const elem = document.getElementById('track-repair');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProblem = (problem: QuickProblem) => {
    scrollToBooking(problem.serviceCategory);
  };

  const handleRequestService = (service: ServiceItem) => {
    scrollToBooking(service.title);
  };

  const handleBookingSubmitted = (newRepair: RepairRequest) => {
    setActiveTrackingRef(newRepair.referenceId);
  };

  return (
    <div className="relative min-h-screen bg-slate-100/80 text-slate-900 font-sans pb-16 lg:pb-0 overflow-x-hidden selection:bg-blue-600 selection:text-white">
      {/* Ambient Liquid Glass Optical Background Layer */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Cobalt fluid orb */}
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-blue-400/25 via-blue-600/20 to-indigo-500/15 blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
        {/* Cyan liquid orb */}
        <div className="absolute top-[28%] -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyan-400/20 via-sky-500/15 to-blue-600/10 blur-[120px]" />
        {/* Indigo / Violet ambient sheen */}
        <div className="absolute top-[55%] -left-36 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-indigo-500/15 via-blue-500/15 to-purple-500/10 blur-[130px]" />
        {/* Warm amber / teal liquid accent near bottom */}
        <div className="absolute bottom-10 right-[15%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-teal-400/15 via-sky-400/15 to-blue-500/10 blur-[110px]" />
      </div>

      {/* 3-Zone Strict Header */}
      <Header
        onOpenBooking={() => scrollToBooking()}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenCustomerPortal={() => setCustomerPortalOpen(true)}
        onOpenLaunchChecklist={() => setChecklistOpen(true)}
      />

      {/* Main Content Journey */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onBookRepair={() => scrollToBooking()}
          onExploreServices={scrollToServices}
        />

        {/* 2. Interactive Problem Selector (12 issues) */}
        <ProblemSelector onSelectProblem={handleSelectProblem} />

        {/* 3. Detailed Services Bento Grid (12 services) */}
        <ServicesSection onRequestService={handleRequestService} />

        {/* 4. Predictable 4-Step How It Works */}
        <HowItWorks />

        {/* 5. Why Choose Sudhakar & Workbench Standards */}
        <WhyChooseSudhakar />

        {/* 6. Smart Repair Booking & Enquiry Form */}
        <RepairBookingForm
          preselectedCategory={preselectedCategory}
          onBookingSubmitted={handleBookingSubmitted}
          onTrackReference={(ref) => scrollToTracking(ref)}
        />

        {/* 7. Live Repair Tracker */}
        <RepairTracker
          initialReference={activeTrackingRef}
          onOpenBooking={() => scrollToBooking()}
          onOpenAuth={() => setAuthModalOpen(true)}
        />

        {/* 8. Contact Section with centralized phone & SR Nagar map context */}
        <ContactSection />

        {/* 9. Frequently Asked Questions with accessible accordions */}
        <FAQSection />
      </main>

      {/* Quiet, Compliant Footer */}
      <Footer
        onOpenPrivacy={() => setPrivacyModal({ isOpen: true, tab: 'privacy' })}
        onOpenTerms={() => setPrivacyModal({ isOpen: true, tab: 'terms' })}
        onOpenChecklist={() => setChecklistOpen(true)}
        onOpenAdmin={() => {
          if (isAdmin) {
            setAdminOpen(true);
          } else {
            setAuthModalOpen(true);
          }
        }}
      />

      {/* Persistent Mobile Bottom Action Bar (strictly under 15% mobile viewport cap) */}
      <MobileBottomBar onBookRepair={() => scrollToBooking()} />

      {/* Auth Modal (Login, Registration, Forgot Password) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => {
          // If logged in as admin, optionally open dashboard
        }}
      />

      {/* Admin Technician Dashboard */}
      {adminOpen && <AdminDashboard onClose={() => setAdminOpen(false)} />}

      {/* Authenticated Customer Portal */}
      {customerPortalOpen && (
        <CustomerPortal
          onClose={() => setCustomerPortalOpen(false)}
          onNewRepair={() => scrollToBooking()}
          onTrackReference={(ref) => scrollToTracking(ref)}
        />
      )}

      {/* Pre-Launch Verification Modal (4 items to confirm with Sudhakar) */}
      <PreLaunchModal
        isOpen={checklistOpen}
        onClose={() => setChecklistOpen(false)}
      />

      {/* Privacy Policy & Terms Modal */}
      <PrivacyTermsModal
        isOpen={privacyModal.isOpen}
        initialTab={privacyModal.tab}
        onClose={() => setPrivacyModal({ isOpen: false, tab: 'privacy' })}
      />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
