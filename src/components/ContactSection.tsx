import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
    }, 2000);
  };

  return (
    <section className="py-16 sm:py-24 relative bg-transparent border-b border-white/60" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Direct Technician Contact
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Speak with Sudhakar
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Need advice on an urgent laptop fault or want to confirm bench availability? Call, message, or drop a quick note.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Details & Location */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="liquid-glass liquid-glass-specular rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-200/50">
                Technician & Workshop Info
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl liquid-glass-pill text-blue-600 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                      Direct Telephone
                    </span>
                    <a
                      href={`tel:${BUSINESS_CONFIG.phone.tel}`}
                      className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      {BUSINESS_CONFIG.phone.display}
                    </a>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {BUSINESS_CONFIG.phone.phoneNote}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl liquid-glass-pill text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                      WhatsApp Messaging
                    </span>
                    <a
                      href={`${BUSINESS_CONFIG.phone.whatsappUrl}?text=${encodeURIComponent(
                        'Hello Sudhakar, I have an enquiry regarding my laptop/computer.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-emerald-700 hover:underline"
                    >
                      Chat on WhatsApp (+91 1029384756)
                    </a>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Send photos of errors, broken hinges, or display glitches
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl liquid-glass-pill text-slate-600 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                      Service Location
                    </span>
                    <p className="font-semibold text-slate-900">
                      {BUSINESS_CONFIG.location.fullAreaDescription}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {BUSINESS_CONFIG.location.serviceRadiusDescription}
                    </p>
                    <p className="text-[11px] text-amber-800 bg-amber-50/80 backdrop-blur-xs p-2.5 rounded-xl mt-2 border border-amber-200/60 shadow-2xs">
                      <strong>Address note:</strong> {BUSINESS_CONFIG.location.addressNote}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl liquid-glass-pill text-slate-600 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Clock className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                      Workshop Hours
                    </span>
                    <p className="font-semibold text-slate-900">
                      Monday – Saturday: 10:00 AM – 8:30 PM
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Sunday: By prior phone appointment only
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons with Liquid Glass */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${BUSINESS_CONFIG.phone.tel}`}
                className="py-3.5 px-4 liquid-glass-dark text-white text-xs font-semibold rounded-xl text-center flex items-center justify-center gap-2 transition-all shadow-md hover:bg-slate-900"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>Tap to Call</span>
              </a>
              <a
                href={`${BUSINESS_CONFIG.phone.whatsappUrl}?text=${encodeURIComponent(
                  'Hello Sudhakar, I have an enquiry regarding computer repair in SR Nagar.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-4 liquid-glass-blue text-white text-xs font-semibold rounded-xl text-center flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Sudhakar</span>
              </a>
            </div>

          </div>

          {/* Right Column: Quick Contact Note Form in Liquid Glass */}
          <div className="lg:col-span-7">
            <div className="liquid-glass liquid-glass-specular rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Send a Quick Message
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Have a general question before booking? Leave your number and Sudhakar will call you back.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2 animate-in fade-in">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-900">Message Sent Directly</h4>
                  <p className="text-xs text-emerald-700">
                    Sudhakar has received your contact note and will respond during working hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="contact_name" className="block text-xs font-semibold text-slate-700">
                        Your Name
                      </label>
                      <input
                        id="contact_name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ramesh Reddy"
                        className="w-full px-3 py-2.5 text-xs bg-white/70 backdrop-blur-xs border border-white/90 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-2xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact_phone" className="block text-xs font-semibold text-slate-700">
                        Mobile Number
                      </label>
                      <input
                        id="contact_phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 9848012345"
                        className="w-full px-3 py-2.5 text-xs bg-white/70 backdrop-blur-xs border border-white/90 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact_msg" className="block text-xs font-semibold text-slate-700">
                      Message / Question
                    </label>
                    <textarea
                      id="contact_msg"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. Do you have replacement display panels for Lenovo ThinkPad in stock?"
                      className="w-full px-3 py-2.5 text-xs bg-white/70 backdrop-blur-xs border border-white/90 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-2xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 liquid-glass-blue text-white text-xs font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Sudhakar</span>
                  </button>
                </form>
              )}

              <div className="pt-2 text-[11px] text-slate-400 text-center">
                For complete diagnostics or booking requests, use the <a href="#book-repair" className="text-blue-600 underline">repair booking form</a> to generate your unique reference ID.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
