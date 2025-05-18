import { useState, useMemo, useEffect, useRef } from 'react';
import { EventTypeMap, Importance, ImportanceMap, MultiplierMap, SectorMap, UnitMap } from './list';
import { ICalendarQueryParams, ICalendarResponse } from '../../../types';
import React from 'react';
import { Client } from '../../../client';

type IEconomicCalendarProps = {
  width?: string;
  height?: string;
  client: Client;
};
const importanceColors: Record<number, string> = {
  0: '#9CA3AF',
  1: '#60A5FA',
  2: '#FBBF24',
  3: '#F87171',
};
type Props = {
  level: Importance;
}
const ImportanceIndicator: React.FC<Props> = ({ level }) => {
  const barCount = 4;
  const activeColor = importanceColors[level];

  return (
    <div
      style={{
        display: 'flex',
        gap: '2px',
        width: '20px',
        height: '12px',
        alignItems: 'flex-end'
      }}
    >
      {Array.from({ length: barCount }, (_, i) => (
        <div
          key={i}
          style={{
            width: '3px',
            height: '100%',
            backgroundColor: i <= level ? activeColor : '#374151',
            borderRadius: '1px'
          }}
        />
      ))}
    </div>
  );
};



const EconomicCalendar = ({ width = '400px', height = '550px', client }: IEconomicCalendarProps) => {
  const [startDate, setStartDate] = useState<Date>(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });
  const [endDate, setEndDate] = useState<Date>(() => {
    const date = new Date();
    date.setHours(23, 59, 59, 999);
    return date;
  });
  const [inputStart, setInputStart] = useState<Date>(startDate);
  const [inputEnd, setInputEnd] = useState<Date>(endDate);
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const [selectedRange, setSelectedRange] = useState('1d');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartDate(inputStart);
      setEndDate(inputEnd);
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputStart, inputEnd]);
  const [selectedImportance, setSelectedImportance] = useState<number[]>([
    Importance.LOW,
    Importance.MODERATE,
    Importance.HIGH
  ]);
  const handleRangeChange = (range: string) => {
    setSelectedRange(range);
    const now = new Date();
    const newStart = new Date();

    switch (range) {
      case '1h':
        newStart.setHours(now.getHours() - 1);
        break;
      case '4h':
        newStart.setHours(now.getHours() - 4);
        break;
      case '12h':
        newStart.setHours(now.getHours() - 12);
        break;
      case '1d':
        newStart.setDate(now.getDate() - 1);
        break;
      case '1w':
        newStart.setDate(now.getDate() - 7);
        break;
      case '1M':
        newStart.setMonth(now.getMonth() - 1);
        break;
    }

    setInputStart(newStart);
    setInputEnd(now);
  };
  const [selectedUnits, setSelectedUnits] = useState<number[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);
  const [selectedTimeModes] = useState<number[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<number[]>([]);
  const [selectedImpacts] = useState<number[]>([]);
  const [selectedFrequencies] = useState<number[]>([]);
  const [selectedMultiplier, setSelectedMultiplier] = useState<number[]>([]);
  const handleTimeNavigation = (direction: 'next' | 'previous') => {
    const diff = inputEnd.getTime() - inputStart.getTime();

    if (direction === 'next') {
      const newStart = new Date(inputStart.getTime() + diff);
      const newEnd = new Date(inputEnd.getTime() + diff);
      setInputStart(newStart);
      setInputEnd(newEnd);
    } else {
      const newStart = new Date(inputStart.getTime() - diff);
      const newEnd = new Date(inputEnd.getTime() - diff);
      setInputStart(newStart);
      setInputEnd(newEnd);
    }
  };

  const query: ICalendarQueryParams = useMemo(() => {
    const baseQuery = {
      date_from: startDate.toISOString(),
      date_to: endDate.toISOString(),
      importance: selectedImportance.join(','),
      unit: selectedUnits.join(','),
      type: selectedEvents.join(','),
      time_mode: selectedTimeModes.join(','),
      sector: selectedSectors.join(','),
      impact: selectedImpacts.join(','),
      frequency: selectedFrequencies.join(','),
      multiplier: selectedMultiplier.join(','),
      per_page: 50,
      sort_by: 'time',
      sort_direction: 'asc'
    };

    const filteredQuery = Object.fromEntries(
      Object.entries(baseQuery).filter(([, value]) => {
        if (typeof value === 'number') return true;
        return Boolean(value);
      })
    );

    return filteredQuery as ICalendarQueryParams;
  }, [
    startDate,
    endDate,
    selectedImportance,
    selectedUnits,
    selectedEvents,
    selectedTimeModes,
    selectedSectors,
    selectedImpacts,
    selectedFrequencies,
    selectedMultiplier
  ]);
  const [response, setResponse] = useState<ICalendarResponse | null>(null);
  const [isPending, setIsPending] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const data = await client._request<ICalendarResponse>({
          method: 'GET',
          endpoint: '/marketplace/calendar',
          params: query,
        });
        setResponse(data);
      } catch (error) {
        console.error('Error fetching calendar data:', error);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [query, client]);
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('fa-IR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };
  const renderMultiSelectFilter = (
    label: string,
    options: { value: number; label: string }[],
    selected: number[],
    setSelected: (val: number[]) => void
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div className='relative group'>
        <button onClick={() => setIsOpen(!isOpen)}
          className='px-3 py-1 bg-slate-700 rounded-md text-slate-300 hover:bg-slate-600'>{label} ▼</button>
        {isOpen && (
          <div className='absolute bg-slate-800 p-2 rounded-md shadow-lg z-10 w-max'>
            {options.map((option) => (
              <label key={option.value} className='flex items-center gap-2 whitespace-nowrap text-sm text-slate-300'>
                <input
                  type='checkbox'
                  checked={selected.includes(option.value)}
                  onChange={(e) => {
                    const newSelected = e.target.checked
                      ? [...selected, option.value]
                      : selected.filter((v) => v !== option.value);
                    setSelected(newSelected);
                  }}
                  className='form-checkbox h-4 w-4 text-blue-600'
                />
                {option.label}
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };
  return (
    <div className='bg-slate-900 rounded-lg border border-slate-700 shadow-lg overflow-hidden' style={{ width, height }}>
      {isPending && (
        <div className='absolute inset-0 bg-slate-900/50 flex items-center justify-center z-50'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500' />
        </div>
      )}
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
            onChange={(e) => handleRangeChange(e.target.value)}
            className='bg-slate-800 text-slate-300 rounded-md p-2 text-sm'
            disabled={isPending}>
            <option value='1h'>۱ ساعت</option>
            <option value='4h'>۴ ساعت</option>
            <option value='12h'>۱۲ ساعت</option>
            <option value='1d'>۱ روز</option>
            <option value='1w'>۱ هفته</option>
            <option value='1M'>۱ ماه</option>
          </select>

          <button
            onClick={() => handleTimeNavigation('next')}
            className='p-2 hover:bg-slate-700 text-gray-400 rounded disabled:opacity-50'
            disabled={isPending}>
            {'>'}
          </button>
        </div>

        <div className='text-slate-300 text-sm'>
          {formatDate(startDate)} - {formatDate(endDate)}
        </div>
      </div>
      <div className='p-4 space-y-4' aria-busy={isPending}>
        <div className='flex gap-2' style={{ opacity: isPending ? 0.5 : 1 }}>
          {[
            { label: 'همه', levels: [Importance.LOW, Importance.MODERATE, Importance.HIGH] },
            { label: ImportanceMap[Importance.HIGH].label, levels: [Importance.HIGH] },
            { label: ImportanceMap[Importance.MODERATE].label, levels: [Importance.MODERATE] },
            { label: ImportanceMap[Importance.LOW].label, levels: [Importance.LOW] }
          ].map((filter) => (
            <button
              key={filter.label}
              onClick={() => setSelectedImportance(filter.levels)}
              className={`px-3 py-1 rounded-md text-sm ${selectedImportance.join() === filter.levels.join()
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}>
              {filter.label}
            </button>
          ))}
        </div>
        {/* Calendar Header */}
        <div className='flex flex-wrap gap-2 mt-4' style={{ opacity: isPending ? 0.5 : 1 }}>
          {renderMultiSelectFilter(
            'واحد',
            Object.entries(UnitMap).map(([value, labelObj]) => ({
              value: Number(value),
              label: labelObj.label
            })),
            selectedUnits,
            setSelectedUnits
          )}

          {renderMultiSelectFilter(
            'نوع رویداد',
            Object.entries(EventTypeMap).map(([value, labelObj]) => ({ value: Number(value), label: labelObj.label })),
            selectedEvents,
            setSelectedEvents
          )}

          {renderMultiSelectFilter(
            'بخش',
            Object.entries(SectorMap).map(([value, labelObj]) => ({ value: Number(value), label: labelObj.label })),
            selectedSectors,
            setSelectedSectors
          )}
          {renderMultiSelectFilter(
            'ضریب',
            Object.entries(MultiplierMap).map(([value, labelObj]) => ({ value: Number(value), label: labelObj.label })),
            selectedMultiplier,
            setSelectedMultiplier
          )}
        </div>
      </div>
      {/* Calendar Body */}
      <div className='overflow-y-auto' style={{ height: `calc(${height} - 120px)` }}>
        <table className='w-full'>
          <thead className='bg-slate-800 text-slate-300 text-xs sticky top-0'>
            <tr>
              <th className='p-3 text-right'>زمان</th>
              <th className='p-3 text-right'>ارز</th>
              <th className='p-3 text-right'>رویداد</th>
              <th className='p-3 text-right'>واقعی</th>
              <th className='p-3 text-right'>پیش‌بینی</th>
              <th className='p-3 text-right'>قبلی</th>
            </tr>
          </thead>
          <tbody>
            {response?.data?.map((event, index) => (
              <tr
                key={event.id}
                className={`border-b border-slate-700 hover:bg-slate-800 ${index % 2 === 1 ? 'bg-slate-800/50' : ''
                  }`}
              >
                <td className='p-3 text-slate-400 text-sm'>{formatTime(event.time)}</td>
                <td className='p-3'>
                  <div className='flex items-center gap-2 justify-start'>
                    <img src={event.flag} alt={event.country} className='w-5 h-3 rounded-sm' />
                    <span className='text-slate-300 text-sm'>{event.currency}</span>
                  </div>
                </td>
                <td className='p-3 text-slate-200 text-sm text-right'>
                  <div className='flex items-center gap-2 justify-start'>
                    <ImportanceIndicator level={event.importance} />
                    <span>{event.name}</span>
                  </div>
                </td>
                <td className='p-3 text-emerald-400 text-sm'>{event.actual || '-'}</td>
                <td className='p-3 text-amber-400 text-sm'>{event.forecast || '-'}</td>
                <td className='p-3 text-blue-400 text-sm'>{event.previous || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EconomicCalendar;
