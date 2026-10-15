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
  const fieldCls =
    'flex flex-col justify-center px-4 py-2.5 rounded-[18px] bg-[#F4F5F7] transition cursor-text h-[68px]';

  return (
    <div
      className={`rounded-2xl sm:rounded-[28px] bg-white p-4 sm:p-5 lg:p-6 text-navy shadow-[0_12px_45px_rgba(0,0,0,0.08)] border border-slate-100 ${className}`}
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
        <div
          className={`${fieldCls} w-full lg:w-[160px] lg:flex-none cursor-pointer [&_.react-datepicker-wrapper]:w-full [&_.react-datepicker__input-container]:w-full [&_.react-datepicker__input-container_input]:w-full`}
        >
          <span className="block text-[13px] font-bold text-[#15293E] mb-1 leading-none">Check-in</span>
          <DatePicker
            selected={checkIn}
            onChange={handleCheckIn}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={new Date()}
            placeholderText="Add date"
            dateFormat="dd MMM yyyy"
            className="w-full bg-transparent text-sm text-[#15293E] placeholder:text-[#9AA8B8] outline-none font-normal cursor-pointer leading-tight"
            popperPlacement="bottom-start"
          />
        </div>

        {/* Check-out */}
        <div
          className={`${fieldCls} w-full lg:w-[160px] lg:flex-none cursor-pointer [&_.react-datepicker-wrapper]:w-full [&_.react-datepicker__input-container]:w-full [&_.react-datepicker__input-container_input]:w-full`}
        >
          <span className="block text-[13px] font-bold text-[#15293E] mb-1 leading-none">Check-out</span>
          <DatePicker
            selected={checkOut}
            onChange={handleCheckOut}
            selectsEnd
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn ?? new Date()}
            placeholderText="Add date"
            dateFormat="dd MMM yyyy"
            className="w-full bg-transparent text-sm text-[#15293E] placeholder:text-[#9AA8B8] outline-none font-normal cursor-pointer leading-tight"
            popperPlacement="bottom-start"
          />
        </div>

        {/* Guests */}
        <label className={`${fieldCls} w-full lg:w-[160px] lg:flex-none`}>
          <span className="block text-[13px] font-bold text-[#15293E] mb-1 leading-none">Guests</span>
          <input
            type="text"
            placeholder="Add guests"
            value={v.guests}
            onChange={(e) => d(setField({ name: 'guests', value: e.target.value }))}
            className="w-full bg-transparent text-sm text-[#15293E] placeholder:text-[#9AA8B8] outline-none font-normal leading-tight"
          />
        </label>

        {/* Search Button */}
        <div className="w-full lg:w-auto lg:flex-none">
          <button
            type="button"
            className="w-full lg:w-[220px] h-[68px] inline-flex items-center justify-center rounded-[18px] bg-[#071D36] hover:bg-[#051527] px-8 font-medium text-white transition whitespace-nowrap text-sm tracking-wide shadow-sm"
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
