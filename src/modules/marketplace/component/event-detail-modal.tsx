import React from "react";
import { EventTypeMap, FrequencyMap, ImpactMap, MultiplierMap, SectorMap } from "./list";
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
  event
}: {
  isOpen: boolean;
  onClose: () => void;
  event: IEconomicEvent;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-slate-900 p-6 rounded-lg shadow-lg max-w-md w-full border border-slate-700">
        <h2 className="text-xl text-white mb-4">جزئیات رویداد</h2>
        <div className="space-y-2 text-sm text-slate-300">
          <p><strong>بخش:</strong> {SectorMap[event.sector]?.label || '-'}</p>
          <p><strong>تأثیر:</strong> {ImpactMap[event.impact]?.label ?? '-'}</p>
          <p><strong>تناوب:</strong> {FrequencyMap[event.frequency]?.label ?? '-'}</p>
          <p>
            <strong>منبع:</strong>{' '}
            {event.source ? (
              <a
                href={event.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
               {event.source}
              </a>
            ) : (
              '-'
            )}
          </p>
          <p><strong>نوع:</strong> {EventTypeMap[event.type]?.label || '-'}</p>
          <p><strong>ضریب:</strong> {MultiplierMap[event.multiplier]?.label || '-'}</p>
        </div>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700">
          بستن
        </button>
      </div>
    </div>
  );
};
