import { useRef, useEffect } from 'react';

export interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

export const formatGuestSummary = (counts: GuestCounts): string => {
  const totalGuests = counts.adults + counts.children;
  let text = `${totalGuests} ${totalGuests === 1 ? 'Guest' : 'Guests'}`;
  if (counts.infants > 0) {
    text += `, ${counts.infants} ${counts.infants === 1 ? 'Infant' : 'Infants'}`;
  }
  if (counts.pets > 0) {
    text += `, ${counts.pets} ${counts.pets === 1 ? 'Pet' : 'Pets'}`;
  }
  return text;
};

interface GuestPopupProps {
  counts: GuestCounts;
  onChange: (counts: GuestCounts) => void;
  onClose: () => void;
  className?: string;
  maxGuests?: number;
  anchorRef?: React.RefObject<HTMLElement | null>;
}

export default function GuestPopup({
  counts,
  onChange,
  onClose,
  className = '',
  maxGuests = 16,
  anchorRef,
}: GuestPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const handleDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (popupRef.current && popupRef.current.contains(target)) {
        return;
      }
      if (anchorRef?.current && anchorRef.current.contains(target)) {
        return;
      }
      onCloseRef.current();
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleDown);
      document.addEventListener('touchstart', handleDown);
      document.addEventListener('keydown', handleKey);
    }, 10);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleDown);
      document.removeEventListener('touchstart', handleDown);
      document.removeEventListener('keydown', handleKey);
    };
  }, [anchorRef]);

  const updateCount = (key: keyof GuestCounts, delta: number) => {
    const currentTotal = counts.adults + counts.children;
    if (delta > 0 && (key === 'adults' || key === 'children') && currentTotal >= maxGuests) {
      return;
    }
    const minVal = key === 'adults' ? 1 : 0;
    const newVal = Math.max(minVal, counts[key] + delta);
    onChange({
      ...counts,
      [key]: newVal,
    });
  };

  const totalPeople = counts.adults + counts.children;

  return (
    <div
      ref={popupRef}
      className={`w-[320px] sm:w-[350px] max-w-[calc(100vw-32px)] bg-white rounded-[24px] shadow-[0_16px_50px_rgba(0,0,0,0.18)] border border-[#EAEAEA] overflow-hidden select-none z-50 ${className}`}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      {/* Rows Container */}
      <div className="divide-y divide-[#F1F5F9]">
        {/* Row 1: Adults */}
        <div className="p-4 sm:px-5 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#EEF4FA] text-[#02213B] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-[#1E293B] leading-tight">Adults</h4>
              <p className="text-xs text-[#8E9AA7] font-normal mt-0.5 leading-tight">Age 13 or above</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              disabled={counts.adults <= 1}
              onClick={() => updateCount('adults', -1)}
              className="w-8 h-8 rounded-full border border-[#DCE4EC] text-[#55697D] hover:border-[#02213B] hover:text-[#02213B] flex items-center justify-center transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-base font-bold active:scale-95"
            >
              −
            </button>
            <span className="w-5 text-center text-[15px] font-bold text-[#1E293B]">
              {counts.adults}
            </span>
            <button
              type="button"
              onClick={() => updateCount('adults', 1)}
              className="w-8 h-8 rounded-full border border-[#02213B] text-[#02213B] hover:bg-[#EEF4FA] flex items-center justify-center transition cursor-pointer text-base font-bold active:scale-95"
            >
              +
            </button>
          </div>
        </div>

        {/* Row 2: Children */}
        <div className="p-4 sm:px-5 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#EEF4FA] text-[#02213B] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <circle cx="12" cy="12" r="9" />
                <path d="M9 10h.01" />
                <path d="M15 10h.01" />
                <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
                <path d="M12 3a2 2 0 0 1 2 2" />
              </svg>
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-[#1E293B] leading-tight">Children</h4>
              <p className="text-xs text-[#8E9AA7] font-normal mt-0.5 leading-tight">Ages 2 – 12</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              disabled={counts.children <= 0}
              onClick={() => updateCount('children', -1)}
              className="w-8 h-8 rounded-full border border-[#DCE4EC] text-[#55697D] hover:border-[#02213B] hover:text-[#02213B] flex items-center justify-center transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-base font-bold active:scale-95"
            >
              −
            </button>
            <span className="w-5 text-center text-[15px] font-bold text-[#1E293B]">
              {counts.children}
            </span>
            <button
              type="button"
              onClick={() => updateCount('children', 1)}
              className="w-8 h-8 rounded-full border border-[#02213B] text-[#02213B] hover:bg-[#EEF4FA] flex items-center justify-center transition cursor-pointer text-base font-bold active:scale-95"
            >
              +
            </button>
          </div>
        </div>

        {/* Row 3: Infants */}
        <div className="p-4 sm:px-5 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#EEF4FA] text-[#02213B] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <circle cx="12" cy="12" r="9" />
                <path d="M8.5 13a3.5 3.5 0 0 0 7 0" />
                <circle cx="12" cy="13" r="1.5" />
                <path d="M9 9h.01" />
                <path d="M15 9h.01" />
              </svg>
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-[#1E293B] leading-tight">Infants</h4>
              <p className="text-xs text-[#8E9AA7] font-normal mt-0.5 leading-tight">Under 2</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              disabled={counts.infants <= 0}
              onClick={() => updateCount('infants', -1)}
              className="w-8 h-8 rounded-full border border-[#DCE4EC] text-[#55697D] hover:border-[#02213B] hover:text-[#02213B] flex items-center justify-center transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-base font-bold active:scale-95"
            >
              −
            </button>
            <span className="w-5 text-center text-[15px] font-bold text-[#1E293B]">
              {counts.infants}
            </span>
            <button
              type="button"
              onClick={() => updateCount('infants', 1)}
              className="w-8 h-8 rounded-full border border-[#02213B] text-[#02213B] hover:bg-[#EEF4FA] flex items-center justify-center transition cursor-pointer text-base font-bold active:scale-95"
            >
              +
            </button>
          </div>
        </div>

        {/* Row 4: Pets */}
        <div className="p-4 sm:px-5 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#EEF4FA] text-[#02213B] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <circle cx="12" cy="15.5" r="3.5" />
                <circle cx="6.5" cy="10" r="2" />
                <circle cx="10" cy="6.5" r="2" />
                <circle cx="14" cy="6.5" r="2" />
                <circle cx="17.5" cy="10" r="2" />
              </svg>
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-[#1E293B] leading-tight">Pets</h4>
              <p className="text-xs text-[#8E9AA7] font-normal mt-0.5 leading-tight">Well behaved pets</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              disabled={counts.pets <= 0}
              onClick={() => updateCount('pets', -1)}
              className="w-8 h-8 rounded-full border border-[#DCE4EC] text-[#55697D] hover:border-[#02213B] hover:text-[#02213B] flex items-center justify-center transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-base font-bold active:scale-95"
            >
              −
            </button>
            <span className="w-5 text-center text-[15px] font-bold text-[#1E293B]">
              {counts.pets}
            </span>
            <button
              type="button"
              onClick={() => updateCount('pets', 1)}
              className="w-8 h-8 rounded-full border border-[#02213B] text-[#02213B] hover:bg-[#EEF4FA] flex items-center justify-center transition cursor-pointer text-base font-bold active:scale-95"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Footer Row */}
      <div className="bg-[#EEF4FA] px-4 sm:px-5 py-3.5 flex items-center justify-between border-t border-[#DDE7F0]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white text-[#02213B] flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <span className="block text-sm font-bold text-[#0D1F3C] leading-none">Total Guest</span>
            <span className="block text-xs text-[#7B8FA6] font-medium mt-1 leading-none">
              {totalPeople} {totalPeople === 1 ? 'Guest' : 'Guests'}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="bg-[#02213B] hover:bg-[#071D36] text-white text-xs sm:text-sm font-semibold px-6 py-2 rounded-full transition shadow-xs cursor-pointer active:scale-95"
        >
          Done
        </button>
      </div>
    </div>
  );
}
