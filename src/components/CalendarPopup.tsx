import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface CalendarPopupProps {
  title?: string;
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
  onClose: () => void;
  minDate?: Date | null;
  maxDate?: Date | null;
  anchorRef?: React.RefObject<HTMLElement | null>;
  className?: string;
}

export default function CalendarPopup({
  title = 'Select Date',
  selectedDate,
  onSelect,
  onClose,
  minDate,
  maxDate,
  anchorRef,
  className = '',
}: CalendarPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Initial month view is selectedDate or minDate or today
  const initialDate = selectedDate ?? minDate ?? new Date();
  const [currentView, setCurrentView] = useState<Date>(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
  );
  const [tempSelected, setTempSelected] = useState<Date | null>(selectedDate);

  // Sync tempSelected if prop changes
  useEffect(() => {
    setTempSelected(selectedDate);
    if (selectedDate) {
      setCurrentView(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
    }
  }, [selectedDate]);

  // Click-outside & Escape key handling without race condition
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

  // Month navigation
  const prevMonth = () => {
    setCurrentView(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentView(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  // Month & Year details
  const year = currentView.getFullYear();
  const month = currentView.getMonth();
  const monthName = currentView.toLocaleDateString('en-US', { month: 'short' });

  // Grid computation: Monday start
  const firstDayOfMonth = new Date(year, month, 1);
  const dayOffset = (firstDayOfMonth.getDay() + 6) % 7; // 0 = Mon, ..., 6 = Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Helper date comparison ignoring time
  const isSameDay = (d1: Date | null, d2: Date | null) => {
    if (!d1 || !d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);

    if (minDate) {
      const min = new Date(minDate);
      min.setHours(0, 0, 0, 0);
      if (date < min) return true;
    }
    if (maxDate) {
      const max = new Date(maxDate);
      max.setHours(0, 0, 0, 0);
      if (date > max) return true;
    }
    return false;
  };

  const handleDayClick = (day: number) => {
    if (isDateDisabled(day)) return;
    const picked = new Date(year, month, day);
    setTempSelected(picked);
    onSelect(picked);
  };

  const handleClear = () => {
    setTempSelected(null);
  };

  const handleDone = () => {
    if (tempSelected) {
      onSelect(tempSelected);
    }
    onClose();
  };

  const formatSummary = (d: Date | null) => {
    if (!d) return 'Select dates';
    return d.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  return (
    <div
      ref={popupRef}
      className={`w-[320px] sm:w-[350px] max-w-[calc(100vw-32px)] bg-white rounded-[24px] shadow-[0_16px_50px_rgba(0,0,0,0.18)] border border-[#EAEAEA] p-5 select-none z-50 ${className}`}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      {/* Header: Title and Close 'X' */}
      <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
        <h3 className="text-base font-bold text-[#0D1F3C] leading-none">
          {title}
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="w-7 h-7 rounded-full text-slate-400 hover:text-[#0D1F3C] hover:bg-[#EEF4FA] flex items-center justify-center transition cursor-pointer"
          aria-label="Close calendar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between py-3.5 px-1">
        <button
          type="button"
          onClick={prevMonth}
          className="w-8 h-8 rounded-full border border-slate-200 text-slate-600 hover:bg-[#EEF4FA] hover:border-[#02213B] hover:text-[#02213B] flex items-center justify-center transition cursor-pointer active:scale-95"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="text-[15px] font-bold text-[#0D1F3C] tracking-wide">
          {monthName} {year}
        </span>

        <button
          type="button"
          onClick={nextMonth}
          className="w-8 h-8 rounded-full border border-slate-200 text-slate-600 hover:bg-[#EEF4FA] hover:border-[#02213B] hover:text-[#02213B] flex items-center justify-center transition cursor-pointer active:scale-95"
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {weekDays.map((wd) => (
          <span
            key={wd}
            className="text-xs font-semibold text-[#7B8FA6] py-1"
          >
            {wd}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {/* Leading empty cells */}
        {Array.from({ length: dayOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="w-9 h-9" />
        ))}

        {/* Days of month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const thisDate = new Date(year, month, day);
          const disabled = isDateDisabled(day);
          const isSelected = isSameDay(thisDate, tempSelected);

          return (
            <button
              key={`day-${day}`}
              type="button"
              disabled={disabled}
              onClick={() => handleDayClick(day)}
              className={`w-9 h-9 mx-auto rounded-full text-xs sm:text-sm font-medium flex items-center justify-center transition cursor-pointer ${
                isSelected
                  ? 'bg-[#02213B] text-white font-bold shadow-xs'
                  : disabled
                  ? 'text-slate-300 line-through cursor-not-allowed'
                  : 'text-[#0D1F3C] hover:bg-[#EEF4FA] hover:text-[#02213B]'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="pt-4 mt-3 border-t border-[#F1F5F9] flex items-center justify-between">
        <span className="text-xs sm:text-sm text-[#7B8FA6] font-medium truncate max-w-[140px]">
          {formatSummary(tempSelected)}
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleClear}
            className="px-3.5 py-1.5 rounded-full border border-slate-300 text-xs sm:text-sm font-medium text-[#0D1F3C] hover:bg-[#EEF4FA] transition cursor-pointer"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={handleDone}
            className="px-5 py-1.5 rounded-full bg-[#02213B] hover:bg-[#071D36] text-white text-xs sm:text-sm font-semibold transition shadow-xs cursor-pointer active:scale-95"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
