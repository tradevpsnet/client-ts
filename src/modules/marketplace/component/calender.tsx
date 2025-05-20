import { useState, useMemo, useEffect, useRef } from 'react';
import { Importance } from './list';
import { ICalendarEvent, ICalendarQueryParams, ICalendarResponse } from '../../../types';
import React from 'react';
import { Client } from '../../../client';
import { ImportanceIndicator } from './importance-indicator';
import TimeRangeSelector from './time-range';
import { EventDetailsModal } from './event-detail-modal';
import { FiltersSidebar } from './filter-modal';
import { translations } from './translation';

type IEconomicCalendarProps = {
  width?: string;
  height?: string;
  client: Client;
  lang?: 'en' | 'fa';
};

type GroupedEvent = {
  date: string;
  events: ICalendarEvent[];
  formattedDate: string;

};

const EconomicCalendar = ({ width = '400px', height = '550px', client, lang = 'en', }: IEconomicCalendarProps) => {
  const t = (key: keyof typeof translations) => translations[key][lang];
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
  type TimeRange = 'today' | 'week' | 'month';
  const [selectedRange, setSelectedRange] = useState<TimeRange>('today');
  const [selectedImportance, setSelectedImportance] = useState<number[]>([
    Importance.NONE,
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

  const formatTime = (isoString: string, lang: 'en' | 'fa' = 'en') => {
    const date = new Date(isoString);
    const locale = lang === 'fa' ? 'fa-IR' : 'en-US';
  
    return date.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };
  

  const formatDate = (date: Date, lang: 'en' | 'fa' = 'en') => {
    const locale = lang === 'fa' ? 'fa-IR' : 'en-US';
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  const groupEventsByDay = (events: ICalendarEvent[], lang: 'en' | 'fa' = 'en'): GroupedEvent[] => {
    const grouped: Record<string, ICalendarEvent[]> = events.reduce((acc, event) => {
      const date = new Date(event.time).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {} as Record<string, ICalendarEvent[]>);
  
    return Object.entries(grouped).map(([date, events]) => ({
      date,
      events,
      formattedDate: formatDate(new Date(date), lang),
    }));
  };
  return (
    <div className="flex gap-4 w-full" style={{ height }}>
      <FiltersSidebar
        selectedImportance={selectedImportance}
        setSelectedImportance={setSelectedImportance}
        selectedUnits={selectedUnits}
        setSelectedUnits={setSelectedUnits}
        selectedEvents={selectedEvents}
        setSelectedEvents={setSelectedEvents}
        selectedSectors={selectedSectors}
        setSelectedSectors={setSelectedSectors}
        isPending={isPending}
        lang={lang}
      />
      <div className='bg-slate-900 rounded-lg border border-slate-700 shadow-lg overflow-hidden flex-grow' style={{ width, height }}>
        {isPending && (
          <div className='absolute inset-0 bg-slate-900/50 flex items-center justify-center z-50'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500' />
          </div>
        )}
        <div className='p-4 border-b border-slate-700'>
          {/* Time Range Selector - Updated version */}
          <div className='flex-1 w-full md:max-w-[600px]'>
            <TimeRangeSelector
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
              inputStart={inputStart}
              inputEnd={inputEnd}
              setInputStart={setInputStart}
              setInputEnd={setInputEnd}
              isPending={isPending}
              lang={lang}
            />
          </div>
        </div>

        {/* Calendar Body */}
        <div className='overflow-y-auto' style={{ height: `calc(${height} - 120px)` }}>
          <table className='w-full'>
            <thead className='bg-slate-800 z-10 text-slate-300 text-xs sticky top-0'>
              <tr>
                <th className='p-3 text-right'>{t('time')}</th>
                <th className='p-3 text-right'>{t('status')}</th>
                <th className='p-3 text-right'>{t('currency')}</th>
                <th className='p-3 text-right'>{t('event')}</th>
                <th className='p-3 text-right'>{t('actual')}</th>
                <th className='p-3 text-right'>{t('forecast')}</th>
                <th className='p-3 text-right'>{t('previous')}</th>
                <th className='p-3 text-center'>{t('details')}</th>
              </tr>
            </thead>
            <tbody>
              {response?.data?.length ? (
                groupEventsByDay(response.data, lang).map((dayGroup) => (
                  <React.Fragment key={dayGroup.date}>
                    {/* Day Header Row */}
                    <tr className="bg-slate-700 border-t border-b border-slate-600/70">
                      <td
                        colSpan={8}
                        className="p-3 px-4 text-center text-slate-200 text-sm font-semibold tracking-wide bg-slate-800/80 shadow-inner"
                      >
                        {dayGroup.formattedDate}
                      </td>
                    </tr>

                    {/* Events */}
                    {dayGroup.events.map((event, index) => {
                      const eventTime = new Date(event.time);
                      const isPastEvent = eventTime < new Date();

                      return (
                        <tr
                          key={event.id}
                          className={`border-b border-slate-700 hover:bg-slate-800 ${index % 2 === 1 ? 'bg-slate-800/50' : ''
                            }`}
                        >


                          {/* Time */}
                          <td className="p-3 text-slate-400 text-sm">
                            {formatTime(event.time, lang)}
                          </td>
                          {/* Status Column */}
                          <td className="p-3 text-center">
                            {isPastEvent ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-green-500 mx-auto"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <span className="text-slate-500">-</span>
                            )}
                          </td>
                          {/* Currency */}
                          <td className="p-3">
                            <div className="flex items-center gap-2 justify-start">
                              <img
                                src={event.flag}
                                alt={event.country}
                                className="w-5 h-3 rounded-sm"
                              />
                              <span className="text-slate-300 text-sm">
                                {event.currency}
                              </span>
                            </div>
                          </td>

                          {/* Event Name */}
                          <td className="p-3 text-slate-200 text-sm text-right">
                            <div className="flex items-center gap-2 justify-start">
                              <ImportanceIndicator level={event.importance} />
                              <span>{event.name}</span>
                            </div>
                          </td>

                          {/* Actual */}
                          <td className="p-3 text-emerald-400 text-sm">
                            {event.actual || "-"}
                          </td>

                          {/* Forecast */}
                          <td className="p-3 text-amber-400 text-sm">
                            {event.forecast || "-"}
                          </td>

                          {/* Previous */}
                          <td className="p-3 text-blue-400 text-sm">
                            {event.previous || "-"}
                          </td>

                          {/* Details Button */}
                          <td className="p-3 text-center">
                            <button
                              className="text-slate-300 hover:text-white bg-slate-800/30 hover:bg-green-600/10 items-center mx-auto hover:border-green-600 text-sm flex px-5 py-2 rounded-lg transition-all duration-200"
                              onClick={() => {
                                setSelectedEvent(event);
                                setIsModalOpen(true);
                              }}
                            >
                              {t('moreInfo')}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-slate-500">
                    {t('noEventsFound')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <EventDetailsModal
            isOpen={!!selectedEvent}
            onClose={() => setSelectedEvent(null)}
            event={selectedEvent}
            lang={lang}
          />
        </div>
      </div>

    </div>
  );
};

export default EconomicCalendar;
