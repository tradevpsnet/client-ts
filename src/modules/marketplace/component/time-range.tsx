import React from 'react';

type TimeRange = 'today' | 'week' | 'month';

interface TimeRangeSelectorProps {
  selectedRange: string;
  setSelectedRange: (range: TimeRange) => void;
  inputStart: Date;
  inputEnd: Date;
  setInputStart: (date: Date) => void;
  setInputEnd: (date: Date) => void;
  isPending: boolean;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  selectedRange,
  setSelectedRange,
  inputStart,
  inputEnd,
  setInputStart,
  setInputEnd,
  isPending,
}) => {
  const handleTimeNavigation = (direction: 'next' | 'previous') => {
    const diff = inputEnd.getTime() - inputStart.getTime();
    const newStart = new Date(inputStart.getTime() + (direction === 'next' ? diff : -diff));
    const newEnd = new Date(inputEnd.getTime() + (direction === 'next' ? diff : -diff));
    setInputStart(newStart);
    setInputEnd(newEnd);
  };

  const handleRangeChange = (range: TimeRange) => {
    setSelectedRange(range);
    const now = new Date();
    let newStart = new Date();

    switch (range) {
      case 'today':
        newStart.setHours(0, 0, 0, 0);
        break;
      case 'week': {
        const dayOfWeek = now.getDay(); // 0 (Sun) to 6 (Sat)
        const diffToSaturday = dayOfWeek === 6 ? 0 : dayOfWeek + 1;
        newStart.setDate(now.getDate() - diffToSaturday);
        newStart.setHours(0, 0, 0, 0);
        break;
      }
      case 'month':
        newStart = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
    }

    setInputStart(newStart);
    setInputEnd(now);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='flex items-center justify-between mb-4 p-4 gap-4'>
      <div className='flex items-center gap-2'>
        <button
          onClick={() => handleTimeNavigation('previous')}
          className='p-2 hover:bg-slate-700 text-gray-400 rounded disabled:opacity-50'
          disabled={isPending}>
          {'<'}
        </button>

        <select
          value={selectedRange}
          onChange={(e) => handleRangeChange(e.target.value as TimeRange)}
          className='bg-slate-800 text-slate-300 rounded-md p-2 text-sm'
          disabled={isPending}>
          <option value='today'>امروز</option>
          <option value='week'>هفته جاری</option>
          <option value='month'>ماه جاری</option>
        </select>

        <button
          onClick={() => handleTimeNavigation('next')}
          className='p-2 hover:bg-slate-700 text-gray-400 rounded disabled:opacity-50'
          disabled={isPending}>
          {'>'}
        </button>
      </div>

      <div className='text-slate-300 text-sm'>
        {formatDate(inputStart)} - {formatDate(inputEnd)}
      </div>
    </div>
  );
};

export default TimeRangeSelector;
