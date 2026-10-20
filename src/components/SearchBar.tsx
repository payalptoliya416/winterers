import { useState, useRef } from 'react';
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from '../store/hooks';
import { setField } from '../store/searchSlice';
import GuestPopup, { GuestCounts, formatGuestSummary } from './GuestPopup';
import CalendarPopup from './CalendarPopup';

interface SearchBarProps {
  cta?: string;
  chips?: boolean;
  className?: string;
}

export default function SearchBar({
  cta = 'Find Winter Stays',
  chips = false,
  className = '',
}: SearchBarProps) {
  const d = useDispatch();
  const v = useSelector((s) => s.search);

  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const checkInRef = useRef<HTMLDivElement>(null);
  const checkOutRef = useRef<HTMLDivElement>(null);

  const handleCheckIn = (date: Date) => {
    setCheckIn(date);
    d(setField({ name: 'checkIn', value: date.toISOString() }));
    if (checkOut && checkOut <= date) {
      setCheckOut(null);
      d(setField({ name: 'checkOut', value: '' }));
    }
  };

  const handleCheckOut = (date: Date) => {
    setCheckOut(date);
    d(setField({ name: 'checkOut', value: date.toISOString() }));
  };

  const formatSearchDate = (d: Date | null) => {
    if (!d) return 'Add date';
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const [guestPopupOpen, setGuestPopupOpen] = useState(false);
  const guestsTriggerRef = useRef<HTMLDivElement>(null);
  const [guestCounts, setGuestCounts] = useState<GuestCounts>({
    adults: 2,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const handleGuestsChange = (newCounts: GuestCounts) => {
    setGuestCounts(newCounts);
    d(setField({ name: 'guests', value: formatGuestSummary(newCounts) }));
  };

  const toggleGuestsPopup = () => {
    setCheckInOpen(false);
    setCheckOutOpen(false);
    setGuestPopupOpen((prev) => {
      const next = !prev;
      if (next && !v.guests) {
        d(setField({ name: 'guests', value: formatGuestSummary(guestCounts) }));
      }
      return next;
    });
  };

  /* shared field wrapper */
  const fieldCls =
    'flex flex-col justify-center px-5 py-[18px] rounded-[18px] bg-[#F4F5F7] transition cursor-text h-[70px]';

  return (
    <div
      className={`rounded-2xl sm:rounded-[26px] bg-white p-4 sm:p-5 lg:p-6 text-navy border border-[#D0DCE8] ${className}`}
    >
      <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:gap-3 text-left">
        {/* Where — takes wide space */}
        <label className={`${fieldCls} flex-1 min-w-[200px]`}>
          <span className="block text-[13px] font-bold text-[#15293E] mb-1 leading-none">Where</span>
          <input
            type="text"
            placeholder="Where do you want to go?"
            value={v.where}
            onChange={(e) => d(setField({ name: 'where', value: e.target.value }))}
            className="w-full bg-transparent text-sm text-[#15293E] placeholder:text-[#9AA8B8] outline-none font-normal leading-tight"
          />
        </label>

        {/* Check-in */}
        <div ref={checkInRef} className="relative w-full lg:w-[160px] lg:flex-none">
          <div
            onClick={() => {
              setCheckInOpen((prev) => !prev);
              setCheckOutOpen(false);
              setGuestPopupOpen(false);
            }}
            className={`${fieldCls} cursor-pointer select-none`}
            role="button"
            tabIndex={0}
          >
            <span className="block text-[13px] font-bold text-[#15293E] mb-1 leading-none">Check-in</span>
            <span
              className={`block truncate text-sm leading-tight ${
                checkIn ? 'text-[#15293E] font-medium' : 'text-[#9AA8B8] font-normal'
              }`}
            >
              {formatSearchDate(checkIn)}
            </span>
          </div>

          {checkInOpen && (
            <div
              className="absolute left-0 top-full mt-2 z-50"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <CalendarPopup
                title="Select Check-in"
                selectedDate={checkIn}
                minDate={new Date()}
                onSelect={(picked) => {
                  handleCheckIn(picked);
                  setCheckInOpen(false);
                }}
                onClose={() => setCheckInOpen(false)}
                anchorRef={checkInRef}
              />
            </div>
          )}
        </div>

        {/* Check-out */}
        <div ref={checkOutRef} className="relative w-full lg:w-[160px] lg:flex-none">
          <div
            onClick={() => {
              setCheckOutOpen((prev) => !prev);
              setCheckInOpen(false);
              setGuestPopupOpen(false);
            }}
            className={`${fieldCls} cursor-pointer select-none`}
            role="button"
            tabIndex={0}
          >
            <span className="block text-[13px] font-bold text-[#15293E] mb-1 leading-none">Check-out</span>
            <span
              className={`block truncate text-sm leading-tight ${
                checkOut ? 'text-[#15293E] font-medium' : 'text-[#9AA8B8] font-normal'
              }`}
            >
              {formatSearchDate(checkOut)}
            </span>
          </div>

          {checkOutOpen && (
            <div
              className="absolute left-0 top-full mt-2 z-50"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <CalendarPopup
                title="Select Check-out"
                selectedDate={checkOut}
                minDate={checkIn ?? new Date()}
                onSelect={(picked) => {
                  handleCheckOut(picked);
                  setCheckOutOpen(false);
                }}
                onClose={() => setCheckOutOpen(false)}
                anchorRef={checkOutRef}
              />
            </div>
          )}
        </div>

        {/* Guests */}
        <div ref={guestsTriggerRef} className="relative w-full lg:w-[160px] lg:flex-none">
          <div
            onClick={toggleGuestsPopup}
            className={`${fieldCls} cursor-pointer select-none`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleGuestsPopup();
              }
            }}
          >
            <span className="block text-[13px] font-bold text-[#15293E] mb-1 leading-none">Guests</span>
            <span
              className={`block truncate text-sm leading-tight ${
                v.guests ? 'text-[#15293E] font-medium' : 'text-[#9AA8B8] font-normal'
              }`}
            >
              {v.guests || 'Add guests'}
            </span>
          </div>

          {guestPopupOpen && (
            <div
              className="absolute right-0 top-full mt-2 z-50 lg:right-auto lg:left-0"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <GuestPopup
                counts={guestCounts}
                onChange={handleGuestsChange}
                onClose={() => setGuestPopupOpen(false)}
                anchorRef={guestsTriggerRef}
              />
            </div>
          )}
        </div>

        {/* Search Button */}
        <div className="w-full lg:w-auto lg:flex-none">
          <button
            type="button"
            className="w-full lg:w-[220px] h-[68px] inline-flex items-center justify-center rounded-[18px] bg-[#071D36] hover:bg-[#051527] px-8 font-medium text-white transition whitespace-nowrap text-base tracking-wide"
          >
            {cta}
          </button>
        </div>
      </div>

      {/* Suggested Chips */}
      {chips && (
        <div className="mt-4 pt-4 border-t border-[#EDF1F5] flex flex-wrap items-center justify-center gap-2.5">
          {['The Alps', 'Norway', 'Finland', 'Iceland', 'Switzerland'].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => d(setField({ name: 'where', value: c }))}
              className="rounded-full border border-[#D5DEE7] bg-white px-4 py-1.5 text-xs text-[#4A5D73] hover:border-[#071D36] hover:text-[#071D36] hover:bg-[#F8FAFC] transition font-medium"
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
