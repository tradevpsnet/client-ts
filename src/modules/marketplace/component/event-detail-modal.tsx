import React from "react";
import {
  EventTypeMap,
  FrequencyMap,
  ImpactMap,
  MultiplierMap,
  SectorMap,
} from "./list";

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
}: {
  isOpen: boolean;
  onClose: () => void;
  event: IEconomicEvent;
}) => {
  if (!isOpen) return null;

  const renderField = (
    label: string,
    dataMap: any,
    key: string | undefined
  ) => {
    const entry = key ? dataMap[key] : null;
    return (
      <div className="flex items-center justify-between gap-4 py-2 group">
        {entry ? (
          <>
            <span className="text-sm text-slate-400 font-medium min-w-[120px] text-right">
              :{label}
            </span>

            <div className="relative flex-1 flex justify-end">
              <span
                className='text-sm font-medium px-3 py-1 rounded-full cursor-help group-hover:opacity-90 transition-opacity'
                title={entry.description}
              >
                {entry.label}
              </span>

              <div className="hidden lg:block absolute bottom-full mb-2 right-0 px-3 py-2 text-xs bg-slate-700 text-slate-100 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-48 text-right z-50">
                {entry.description}
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-slate-700" />
              </div>
            </div>
          </>
        ) : (
          <div className="text-slate-500 text-sm">-</div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in-zoom-in">
      <div className="bg-slate-900 p-6 rounded-2xl shadow-2xl max-w-md w-full border-2 border-slate-700 transform transition-all">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">جزییات رویداد</h2>
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
          {renderField("بخش", SectorMap, event.sector.toString())}
          {renderField("تاثیر", ImpactMap, event.impact.toString())}
          {renderField("تکرار", FrequencyMap, event.frequency.toString())}
          {renderField("نوع رویداد", EventTypeMap, event.type.toString())}
          {renderField("ضریب", MultiplierMap, event.multiplier.toString())}

          <div className="flex items-center justify-between gap-4 py-2">
            <span className="text-xs text-slate-400 font-medium min-w-[120px] text-right">
              منبع
            </span>

            <div className="flex-1 flex justify-end">
              {event.source ? (
                <a
                  href={event.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1.5 text-sm px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700/50 w-fit rtl:flex-row-reverse"
                >
                  <span>بازدید از منبع</span>
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
                <span className="text-slate-500 text-sm">منبعی در دسترس نیست</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
