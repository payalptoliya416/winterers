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
    // if checkout is before checkin, reset it
    if (date && checkOut && checkOut <= date) {
      setCheckOut(null);
      d(setField({ name: 'checkOut', value: '' }));
    }
  };

  const handleCheckOut = (date: Date | null) => {
    setCheckOut(date);
    d(setField({ name: 'checkOut', value: date ? date.toISOString() : '' }));
  };

  return (
    <div
      className={`rounded-2xl sm:rounded-3xl bg-white p-3 sm:p-4 text-navy shadow-2xl shadow-navy/15 border border-slate-100 ${className}`}
    >
      <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-0 lg:divide-x lg:divide-slate-200">

        {/* Where */}
        <label className="flex flex-1 flex-col justify-center rounded-xl lg:rounded-none lg:first:rounded-l-xl px-4 py-3 bg-[#F4F7FB] lg:bg-transparent hover:bg-[#EEF3F8] transition cursor-text">
          <span className="block text-[11px] font-bold text-navy uppercase tracking-wider mb-0.5">
            Where
          </span>
          <input
            type="text"
            placeholder="Where do you want to go?"
            value={v.where}
            onChange={(e) => d(setField({ name: 'where', value: e.target.value }))}
            className="w-full bg-transparent text-[13px] text-navy placeholder:text-navy/40 outline-none font-normal"
          />
        </label>

        {/* Check-in */}
        <div className="flex flex-col justify-center rounded-xl lg:rounded-none px-4 py-3 bg-[#F4F7FB] lg:bg-transparent hover:bg-[#EEF3F8] transition cursor-pointer [&_.react-datepicker-wrapper]:w-full [&_.react-datepicker-wrapper_input]:w-full">
          <span className="block text-[11px] font-bold text-navy uppercase tracking-wider mb-0.5">
            Check-in
          </span>
          <DatePicker
            selected={checkIn}
            onChange={handleCheckIn}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={new Date()}
            placeholderText="Add date"
            dateFormat="dd MMM yyyy"
            className="bg-transparent text-[13px] text-navy placeholder:text-navy/40 outline-none font-normal cursor-pointer w-full"
            popperPlacement="bottom-start"
          />
        </div>

        {/* Check-out */}
        <div className="flex flex-col justify-center rounded-xl lg:rounded-none px-4 py-3 bg-[#F4F7FB] lg:bg-transparent hover:bg-[#EEF3F8] transition cursor-pointer [&_.react-datepicker-wrapper]:w-full [&_.react-datepicker-wrapper_input]:w-full">
          <span className="block text-[11px] font-bold text-navy uppercase tracking-wider mb-0.5">
            Check-out
          </span>
          <DatePicker
            selected={checkOut}
            onChange={handleCheckOut}
            selectsEnd
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn ?? new Date()}
            placeholderText="Add date"
            dateFormat="dd MMM yyyy"
            className="bg-transparent text-[13px] text-navy placeholder:text-navy/40 outline-none font-normal cursor-pointer w-full"
            popperPlacement="bottom-start"
          />
        </div>

        {/* Guests */}
        <label className="flex flex-col justify-center rounded-xl lg:rounded-none px-4 py-3 bg-[#F4F7FB] lg:bg-transparent hover:bg-[#EEF3F8] transition cursor-text">
          <span className="block text-[11px] font-bold text-navy uppercase tracking-wider mb-0.5">
            Guests
          </span>
          <input
            type="text"
            placeholder="Add guests"
            value={v.guests}
            onChange={(e) => d(setField({ name: 'guests', value: e.target.value }))}
            className="w-full bg-transparent text-[13px] text-navy placeholder:text-navy/40 outline-none font-normal"
          />
        </label>

        {/* Search Button */}
        <div className="flex items-center pl-0 lg:pl-3">
          <button
            type="button"
            className="w-full lg:w-auto inline-flex items-center justify-center rounded-xl lg:rounded-2xl bg-navy hover:bg-[#0a355c] px-7 py-4 text-sm font-semibold text-white transition whitespace-nowrap shadow-sm"
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
