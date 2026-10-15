import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from '../store/hooks';
import { setField } from '../store/searchSlice';

interface SearchBarProps {
  cta?: string;
  chips?: boolean;
  className?: string;
}

export default function SearchBar({
  cta = 'Find Winter Stays',
  chips = true,
  className = '',
}: SearchBarProps) {
  const d = useDispatch();
  const v = useSelector((s) => s.search);

  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  const handleCheckIn = (date: Date | null) => {
    setCheckIn(date);
    d(setField({ name: 'checkIn', value: date ? date.toISOString() : '' }));
    if (date && checkOut && checkOut <= date) {
      setCheckOut(null);
      d(setField({ name: 'checkOut', value: '' }));
    }
  };

  const handleCheckOut = (date: Date | null) => {
    setCheckOut(date);
    d(setField({ name: 'checkOut', value: date ? date.toISOString() : '' }));
  };

  /* shared field wrapper */
  const fieldCls = 'flex flex-col justify-center px-4 py-[13px] rounded-[18px] bg-[#F4F5F5] transition cursor-text';

  return (
    <div
      className={`rounded-2xl sm:rounded-[26px] bg-white p-5 text-navy border border-[#D0DCE8] ${className}`}
    >
      <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-[25px]">

        {/* Where — takes remaining space */}
        <label className={`${fieldCls} flex-1`}>
          <span className="block text-sm font-bold text-navy mb-0.5">Where</span>
          <input
            type="text"
            placeholder="Where do you want to go?"
            value={v.where}
            onChange={(e) => d(setField({ name: 'where', value: e.target.value }))}
            className="w-full bg-transparent text-sm text-navy placeholder:text-navy/40 outline-none font-normal"
          />
        </label>

        {/* Check-in */}
        <div className={`${fieldCls} [&_.react-datepicker-wrapper]:w-full [&_.react-datepicker__input-container_input]:w-full`}>
          <span className="block text-sm font-bold text-navy mb-0.5">Check-in</span>
          <DatePicker
            selected={checkIn}
            onChange={handleCheckIn}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={new Date()}
            placeholderText="Add date"
            dateFormat="dd MMM yyyy"
            className="bg-transparent text-base text-navy placeholder:text-navy/40 outline-none font-normal cursor-pointer"
            popperPlacement="bottom-start"
          />
        </div>

        {/* Check-out */}
        <div className={`${fieldCls} [&_.react-datepicker-wrapper]:w-full [&_.react-datepicker__input-container_input]:w-full`}>
          <span className="block text-sm font-bold text-navy mb-0.5">Check-out</span>
          <DatePicker
            selected={checkOut}
            onChange={handleCheckOut}
            selectsEnd
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn ?? new Date()}
            placeholderText="Add date"
            dateFormat="dd MMM yyyy"
            className="bg-transparent text-base text-navy placeholder:text-navy/40 outline-none font-normal cursor-pointer"
            popperPlacement="bottom-start"
          />
        </div>

        {/* Guests */}
        <label className={fieldCls}>
          <span className="block text-sm font-bold text-navy mb-0.5">Guests</span>
          <input
            type="text"
            placeholder="Add guests"
            value={v.guests}
            onChange={(e) => d(setField({ name: 'guests', value: e.target.value }))}
            className="w-full bg-transparent text-sm text-navy placeholder:text-navy/40 outline-none font-normal"
          />
        </label>

        {/* Search Button */}
        <div className="flex items-center">
          <button
            type="button"
            className="w-full lg:w-auto inline-flex items-center justify-center rounded-[18px] bg-navy hover:bg-[#0a355c] px-4 py-5 font-semibold text-white transition whitespace-nowrap text-sm"
          >
            {cta}
          </button>
        </div>
      </div>

      {/* Suggested Chips */}
      {chips && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 border-t border-slate-100 pt-3">
          {['The Alps', 'Norway', 'Finland', 'Iceland', 'Switzerland'].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => d(setField({ name: 'where', value: c }))}
              className="rounded-full border border-slate-200/90 bg-white px-4 py-1 text-xs text-navy/70 hover:border-sky hover:text-sky hover:bg-[#F4F7FB] transition font-medium"
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
