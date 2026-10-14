import React from 'react';
import { Phone, CalendarPlus } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

interface MobileBottomBarProps {
  onBookRepair: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onBookRepair }) => {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 liquid-glass liquid-glass-specular border-t border-white/80 px-4 py-2.5 shadow-2xl max-h-[12vh]">
      <div className="flex items-center gap-3">
        <a
          href={`tel:${BUSINESS_CONFIG.phone.tel}`}
          className="flex-1 py-2.5 px-3 liquid-glass-pill hover:bg-white text-slate-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs"
        >
          <Phone className="w-3.5 h-3.5 text-blue-600" />
          <span>Call Sudhakar</span>
        </a>

        <button
          onClick={onBookRepair}
          className="flex-1 py-2.5 px-3 liquid-glass-blue text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
        >
          <CalendarPlus className="w-3.5 h-3.5" />
          <span>Book a Repair</span>
        </button>
      </div>
    </div>
  );
};
