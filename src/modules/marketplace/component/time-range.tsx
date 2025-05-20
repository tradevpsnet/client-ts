import React from 'react';
import { translations } from './translation';

type TimeRange = 'today' | 'week' | 'month';

interface TimeRangeSelectorProps {
  selectedRange: TimeRange;
  setSelectedRange: (range: TimeRange) => void;
  inputStart: Date;
  inputEnd: Date;
  setInputStart: (date: Date) => void;
  setInputEnd: (date: Date) => void;
  isPending: boolean;
  lang?: 'en' | 'fa';
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  selectedRange,
  setSelectedRange,
  inputStart,
  inputEnd,
  setInputStart,
  setInputEnd,
  isPending,
  lang = 'en',
}) => {
  const t = (key: keyof typeof translations) => translations[key][lang];
  const getWeekRange = (date: Date) => {
    const start = new Date(date);
    const dayOfWeek = start.getDay();
    const diffToSaturday = dayOfWeek === 6 ? 0 : 6 - dayOfWeek;
    start.setDate(start.getDate() - dayOfWeek);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start, end };
  };

  const getMonthRange = (date: Date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return { start, end };
  };

  const handleRangeChange = (range: TimeRange) => {
    setSelectedRange(range);
    const now = new Date();

    switch (range) {
      case 'today': {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        setInputStart(start);
        setInputEnd(new Date());
        break;
      }
      case 'week': {
        const { start, end } = getWeekRange(now);
        setInputStart(start);
        setInputEnd(end);
        break;
      }
      case 'month': {
        const { start, end } = getMonthRange(now);
        setInputStart(start);
        setInputEnd(end);
        break;
      }
    }
  };

  const handleTimeNavigation = (direction: 'previous' | 'next') => {
    const offset = direction === 'next' ? 1 : -1;

    const adjustDate = (date: Date) => {
      const newDate = new Date(date);
      switch (selectedRange) {
        case 'today':
          newDate.setDate(newDate.getDate() + offset);
          break;
        case 'week':
          newDate.setDate(newDate.getDate() + offset * 7);
          break;
        case 'month':
          newDate.setMonth(newDate.getMonth() + offset);
          break;
      }
      return newDate;
    };

    const newStart = adjustDate(inputStart);
    const newEnd = adjustDate(inputEnd);

    if (selectedRange === 'month') {
      const { start, end } = getMonthRange(newStart);
      setInputStart(start);
      setInputEnd(end);
    } else {
      setInputStart(newStart);
      setInputEnd(newEnd);
    }
  };

  const formatDate = (date: Date, lang: 'en' | 'fa' = 'en') => {
    const locale = lang === 'fa' ? 'fa-IR' : 'en-US';
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      {(['today', 'week', 'month'] as TimeRange[]).map((range) => (
        <button
          key={range}
          onClick={() => handleRangeChange(range)}
          disabled={isPending}
          className={`px-3 py-1 rounded text-sm transition-colors ${selectedRange === range
            ? 'bg-blue-600 text-white'
            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
        >
          {t(range)}
        </button>
      ))}
      <button
        onClick={() => handleTimeNavigation('previous')}
        disabled={isPending}
        className="px-2 py-1 hover:bg-slate-800 rounded disabled:opacity-50 text-slate-300"
      >
        {t('previousRange')}
      </button>

      <button
        onClick={() => handleTimeNavigation('next')}
        disabled={isPending}
        className="px-2 py-1 hover:bg-slate-800 rounded disabled:opacity-50 text-slate-300"
      >
        {t('nextRange')}
      </button>
      <div className="text-slate-400 flex items-center gap-1">
        <time dateTime={inputStart.toISOString()}>{formatDate(inputStart, lang)}</time>
        <span className="text-slate-500">–</span>
        <time dateTime={inputEnd.toISOString()}>{formatDate(inputEnd, lang)}</time>
      </div>
    </div>
  );
};

export default TimeRangeSelector;
