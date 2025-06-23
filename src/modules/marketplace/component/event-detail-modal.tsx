import React from 'react';
import {
  getSectorMap,
  getImpactMap,
  getFrequencyMap,
  getEventTypeMap,
  getMultiplierMap,
  EventTypeMap,
  FrequencyMap,
  ImpactMap,
  MultiplierMap,
  SectorMap,
} from './list';

type IEconomicEvent = {
  sector: keyof typeof SectorMap;
  impact: keyof typeof ImpactMap;
  frequency: keyof typeof FrequencyMap;
  source: string;
  type: keyof typeof EventTypeMap;
  multiplier: keyof typeof MultiplierMap;
};

export const EventDetailsModal = ({
  isOpen,
  onClose,
  event,
  lang = 'en',
}: {
  isOpen: boolean;
  onClose: () => void;
  event: IEconomicEvent;
  lang?: 'en' | 'fa';
}) => {
  if (!isOpen) return null;

  // Get localized maps here based on lang
  const SectorMap = getSectorMap(lang);
  const ImpactMap = getImpactMap(lang);
  const FrequencyMap = getFrequencyMap(lang);
  const EventTypeMap = getEventTypeMap(lang);
  const MultiplierMap = getMultiplierMap(lang);

  // Labels map for field titles, localized
  const labels = {
    sector: lang === 'fa' ? "بخش" : "Sector",
    impact: lang === 'fa' ? "تاثیر" : "Impact",
    frequency: lang === 'fa' ? "تکرار" : "Frequency",
    type: lang === 'fa' ? "نوع رویداد" : "Event Type",
    multiplier: lang === 'fa' ? "ضریب" : "Multiplier",
    source: lang === 'fa' ? "منبع" : "Source",
  };

  const renderField = (
    label: string,
    dataMap: any,
    key: string | undefined
  ) => {
    const entry = key ? dataMap[key] : null;
    return (
      <div className="py-2 space-y-1">
        {entry ? (
          <>
            <div className="flex items-start justify-between gap-4">
              <span className="text-sm text-slate-400 font-medium min-w-[120px] text-right">
                {label}:
              </span>

              <span className="text-sm font-medium text-slate-200 text-left">
                {entry.label}
              </span>
            </div>

            <p className="text-xs text-slate-500 text-left ps-[120px]">
              {entry.description}
            </p>
          </>
        ) : (
          <div className="text-slate-500 text-sm">-</div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 p-6 rounded-2xl shadow-2xl max-w-md w-full border-2 border-slate-700 relative">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {lang === 'fa' ? "جزییات رویداد" : "Event Details"}
              </h2>
              <div className="h-1 w-12 bg-blue-500 rounded-full mb-4" />
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors text-2xl p-2 -m-2"
            >
              ×
            </button>
          </div>

          <div className="space-y-5 text-sm text-slate-300">
            {renderField(labels.sector, SectorMap, event.sector.toString())}
            {renderField(labels.impact, ImpactMap, event.impact.toString())}
            {renderField(labels.frequency, FrequencyMap, event.frequency.toString())}
            {renderField(labels.type, EventTypeMap, event.type.toString())}
            {renderField(labels.multiplier, MultiplierMap, event.multiplier.toString())}

            <div className="flex items-center justify-between gap-4 py-2">
              <span className="text-xs text-slate-400 font-medium min-w-[120px] text-right">
                {labels.source}
              </span>

              <div className="flex-1 flex justify-end">
                {event.source ? (
                  <a
                    href={event.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1.5 text-sm px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700/50 w-fit rtl:flex-row-reverse"
                  >
                    <span>{lang === 'fa' ? 'بازدید از منبع' : 'Visit Source'}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 rtl:rotate-180"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </a>
                ) : (
                  <span className="text-slate-500 text-sm">
                    {lang === 'fa' ? "منبعی در دسترس نیست" : "No source available"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
