import { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface CalendarPopupProps {
  title?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  onChangeRange?: (start: Date | null, end: Date | null) => void;
  selectedDate?: Date | null;
  onSelect?: (date: Date) => void;
  onClose: () => void;
  minDate?: Date | null;
  maxDate?: Date | null;
  anchorRef?: React.RefObject<HTMLElement | null>;
  className?: string;
}

export default function CalendarPopup({
  title = 'Select Check-in',
  startDate,
  endDate,
  onChangeRange,
  selectedDate,
  onSelect,
  onClose,
  minDate = new Date(),
  maxDate,
  anchorRef,
  className = '',
}: CalendarPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Initialize start & end from range props or single selectedDate fallback
  const initialStart = startDate ?? selectedDate ?? null;
  const initialEnd = endDate ?? null;

  const [tempStart, setTempStart] = useState<Date | null>(initialStart);
  const [tempEnd, setTempEnd] = useState<Date | null>(initialEnd);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  // Sync internal state when external props change
  useEffect(() => {
    setTempStart(startDate ?? selectedDate ?? null);
    setTempEnd(endDate ?? null);
  }, [startDate, endDate, selectedDate]);

  // Click-outside & Escape key handling
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

  // Handle date selection from DatePicker
  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setTempStart(start);
    setTempEnd(end);
    setHoverDate(null);

    if (onChangeRange) {
      onChangeRange(start, end);
    }

    if (onSelect) {
      if (end) {
        onSelect(end);
      } else if (start) {
        onSelect(start);
      }
    }
  };

  const handleClear = () => {
    setTempStart(null);
    setTempEnd(null);
    setHoverDate(null);
    if (onChangeRange) {
      onChangeRange(null, null);
    }
  };

  const handleDone = () => {
    if (tempStart && tempEnd) {
      onChangeRange?.(tempStart, tempEnd);
    } else if (tempStart) {
      onChangeRange?.(tempStart, null);
      onSelect?.(tempStart);
    }
    onClose();
  };

  // Calculate nights for display
  const activeEnd =
    tempEnd || (tempStart && hoverDate && hoverDate >= tempStart ? hoverDate : null);
  const nights =
    tempStart && activeEnd
      ? Math.max(1, Math.round((activeEnd.getTime() - tempStart.getTime()) / (1000 * 60 * 60 * 24)))
      : 0;

  // Header dynamic title
  const displayTitle =
    title === 'Select Check-in' && tempStart && !tempEnd
      ? 'Select Check-out'
      : title;

  return (
    <div
      ref={popupRef}
      className={`winterers-calendar w-[320px] sm:w-[350px] max-w-[calc(100vw-32px)] bg-white rounded-[24px] shadow-[0_16px_50px_rgba(0,0,0,0.14)] border border-[#EDEDED] p-5 select-none z-50 ${className}`}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      {/* Top Header: Title and Close 'X' */}
      <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-[#F3F4F6]">
        <h3 className="text-[17px] font-bold text-[#111827] leading-tight">
          {displayTitle}
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="w-7 h-7 rounded-full text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F3F4F6] flex items-center justify-center transition cursor-pointer"
          aria-label="Close calendar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* DatePicker Library Component with Range Selection */}
      <div className="react-datepicker-custom-wrapper">
        <DatePicker
          inline
          selectsRange
          startDate={tempStart}
          endDate={tempEnd}
          onChange={handleDateChange}
          onDayMouseEnter={(date: Date) => {
            if (tempStart && !tempEnd && date >= tempStart) {
              setHoverDate(date);
            }
          }}
          minDate={minDate ?? undefined}
          maxDate={maxDate ?? undefined}
          calendarStartDay={1}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="flex items-center justify-between py-2 px-1 mb-2">
              <button
                type="button"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                className="w-8 h-8 rounded-full border border-[#E5E7EB] text-[#4B5563] hover:border-[#02213B] hover:text-[#02213B] hover:bg-[#EEF4FA] flex items-center justify-center transition cursor-pointer active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-[15px] font-bold text-[#0D1F3C] tracking-wide">
                {date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>

              <button
                type="button"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                className="w-8 h-8 rounded-full border border-[#E5E7EB] text-[#4B5563] hover:border-[#02213B] hover:text-[#02213B] hover:bg-[#EEF4FA] flex items-center justify-center transition cursor-pointer active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
          renderDayContents={(day: number) => (
            <span className="day-badge">{day}</span>
          )}
        />
      </div>

      {/* Footer: Night(s) count, Clear, Done */}
      <div className="pt-3.5 mt-2 border-t border-[#F3F4F6] flex items-center justify-between">
        <span className="text-[14px] text-[#9CA3AF] font-medium truncate max-w-[140px]">
          {nights > 0
            ? `${nights} night(s)`
            : tempStart
            ? 'Select check-out'
            : 'Select dates'}
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-1.5 rounded-full border border-[#D1D5DB] text-[13px] font-semibold text-[#111827] hover:bg-[#F3F4F6] transition active:scale-95 cursor-pointer"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={handleDone}
            className="px-5 py-1.5 rounded-full bg-[#02213B] hover:bg-[#071D36] text-white text-[13px] font-bold shadow-xs transition active:scale-95 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
