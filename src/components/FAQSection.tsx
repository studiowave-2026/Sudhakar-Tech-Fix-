import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: 'What types of laptops and computers can be assessed?',
    a: 'Sudhakar assesses all major laptop and desktop computer brands, including Dell, HP, Lenovo, Asus, Acer, Apple (MacBooks), MSI, and custom assembled gaming or workstation desktop towers. Both Windows and Linux systems can be serviced.',
  },
  {
    q: 'How do I request a repair?',
    a: 'You can submit your device details and reported symptoms via our online Repair Booking Form on this page to receive a unique reference code, or directly call or WhatsApp Sudhakar on ' + BUSINESS_CONFIG.phone.display + '.',
  },
  {
    q: 'How much will a repair cost?',
    a: 'Cost depends on the exact diagnosis, whether spare parts (like an SSD, screen, battery, or charging IC) are required, and the labor involved. We perform an initial bench inspection and share a transparent quotation before any repair work is carried out.',
  },
  {
    q: 'Can I check the status of my repair?',
    a: 'Yes. Every registered repair receives a unique reference identifier (e.g. HYD-SRN-XXXXX). You can enter this code in the "Track Repair" section at any time to view technician activity logs, status milestones, and notes.',
  },
  {
    q: 'How long will the repair take?',
    a: 'Turnaround time depends on the specific fault and part availability. Standard software fixes or SSD upgrades are often ready within 24 to 48 hours. Board-level diagnostics or sourcing rare display panels may take longer, and you will be informed upfront.',
  },
  {
    q: 'Can my data be recovered if my laptop does not turn on?',
    a: 'In many cases where the motherboard or display fails, the storage drive (HDD or SSD) remains intact. We can remove the drive, safely inspect its health, and backup your documents or transfer them to another machine.',
  },
  {
    q: 'Should I back up my files before service?',
    a: 'Whenever possible, yes. We strongly recommend taking a backup of critical files before submitting any computer for hardware servicing. We respect customer privacy and never access private folders without authorization.',
  },
  {
    q: 'Do you provide doorstep pickup or delivery in Hyderabad?',
    a: 'Pickup and drop availability depends on your exact locality around SR Nagar, Ameerpet, and Sanath Nagar, and must be confirmed directly with Sudhakar when scheduling your repair.',
  },
  {
    q: 'What if replacement parts are required?',
    a: 'If a component (such as a battery, fan, keyboard, or screen) needs replacement, Sudhakar checks compatibility with verified suppliers and quotes you the exact part price and warranty term before placing an order.',
  },
  {
    q: 'How can I contact Sudhakar directly?',
    a: 'You can call our centralized phone line ' + BUSINESS_CONFIG.phone.display + ' or message via WhatsApp. We operate near SR Nagar, Hyderabad.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 relative bg-transparent border-b border-white/60" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-14">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Clear Answers
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Honest explanations about diagnostic fees, turnaround times, and service policies near SR Nagar.
          </p>
        </div>

        {/* Accordions in Liquid Glass */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="liquid-glass-interactive rounded-2xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-4.5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/60 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-bold text-slate-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
