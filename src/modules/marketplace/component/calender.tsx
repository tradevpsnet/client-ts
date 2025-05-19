import { useState, useMemo, useEffect, useRef } from 'react';
import { EventTypeMap, Importance, ImportanceMap, MultiplierMap, SectorMap, UnitMap } from './list';
import { ICalendarQueryParams, ICalendarResponse } from '../../../types';
import React from 'react';
import { Client } from '../../../client';
import { ImportanceIndicator } from './importance-indicator';
import TimeRangeSelector from './time-range';
import { EventDetailsModal } from './event-detail-modal';
import MultiSelectFilter from './multi-select-filter';

type IEconomicCalendarProps = {
  width?: string;
  height?: string;
  client: Client;
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
  const [selectedRange, setSelectedRange] = useState('1d');
  const [selectedImportance, setSelectedImportance] = useState<number[]>([
    Importance.LOW,
    Importance.MODERATE,
    Importance.HIGH
  ]);
  const [selectedUnits, setSelectedUnits] = useState<number[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);
  const [selectedTimeModes] = useState<number[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<number[]>([]);
  const [selectedImpacts] = useState<number[]>([]);
  const [selectedFrequencies] = useState<number[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [response, setResponse] = useState<ICalendarResponse | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const toggleFilter = (name: string) =>
    setOpenFilter(openFilter === name ? null : name);

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
  ]);


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


  useEffect(() => {
    const timer = setTimeout(() => {
      setStartDate(inputStart);
      setEndDate(inputEnd);
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputStart, inputEnd]);

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('fa-IR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };
  const resetFilters = () => {
    setSelectedImportance([Importance.LOW, Importance.MODERATE, Importance.HIGH]);
    setSelectedUnits([]);
    setSelectedEvents([]);
    setSelectedSectors([]);
    setOpenFilter(null);
  };
  const isDefaultFilters =
    selectedImportance.join() === [Importance.LOW, Importance.MODERATE, Importance.HIGH].join() &&
    selectedUnits.length === 0 &&
    selectedEvents.length === 0 &&
    selectedSectors.length === 0;


  return (
    <div className='bg-slate-900 rounded-lg border border-slate-700 shadow-lg overflow-hidden' style={{ width, height }}>
      {isPending && (
        <div className='absolute inset-0 bg-slate-900/50 flex items-center justify-center z-50'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500' />
        </div>
      )}
      <TimeRangeSelector
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
        inputStart={inputStart}
        inputEnd={inputEnd}
        setInputStart={setInputStart}
        setInputEnd={setInputEnd}
        isPending={isPending}
      />
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
          {!isDefaultFilters && (
            <button
              onClick={resetFilters}
              className="px-3 py-1 rounded-md text-sm flex items-center gap-1 bg-red-600 text-white hover:bg-red-700"
              title="بازنشانی فیلترها"
            >
               بازنشانی فیلتر ها
            </button>
          )}
        </div>

        {/* Calendar Header */}
        <div className='flex flex-wrap gap-2 mt-4' style={{ opacity: isPending ? 0.5 : 1 }}>
          <MultiSelectFilter
            name="unit"
            label="واحد"
            options={Object.entries(UnitMap).map(([v, o]) => ({ value: +v, label: o.label }))}
            selected={selectedUnits}
            setSelected={setSelectedUnits}
            isOpen={openFilter === "unit"}
            onToggle={() => toggleFilter("unit")}
            onClose={() => setOpenFilter(null)}
          />

          <MultiSelectFilter
            name="eventType"
            label="نوع رویداد"
            options={Object.entries(EventTypeMap).map(([v, o]) => ({ value: +v, label: o.label }))}
            selected={selectedEvents}
            setSelected={setSelectedEvents}
            isOpen={openFilter === "eventType"}
            onToggle={() => toggleFilter("eventType")}
            onClose={() => setOpenFilter(null)}
          />

          <MultiSelectFilter
            name="sector"
            label="بخش"
            options={Object.entries(SectorMap).map(([v, o]) => ({ value: +v, label: o.label }))}
            selected={selectedSectors}
            setSelected={setSelectedSectors}
            isOpen={openFilter === "sector"}
            onToggle={() => toggleFilter("sector")}
            onClose={() => setOpenFilter(null)}
          />
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
              <th className='p-3 text-center'>جزییات</th>
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
                <td className='p-3 text-center'>
                  <button
                    className='text-slate-300  hover:text-white bg-slate-800/30 hover:bg-green-600/10 items-center mx-auto hover:border-green-600 text-sm flex px-5 py-2 rounded-lg transition-all duration-200'
                    onClick={() => {
                      setSelectedEvent(event);
                      setIsModalOpen(true);
                    }}
                  >
                    اطلاعات بیشتر
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <EventDetailsModal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          event={selectedEvent}
        />
      </div>
    </div>
  );
};

export default EconomicCalendar;
