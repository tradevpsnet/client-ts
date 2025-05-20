import React from 'react';
import { 
  Importance, 
  getUnitMap, 
  getEventTypeMap, 
  getSectorMap, 
  getImportanceMap,
  Language
} from './list';
import { translations } from './translation';

interface FiltersModalProps {
  selectedImportance: Importance[];
  setSelectedImportance: (val: Importance[]) => void;
  selectedUnits: number[];
  setSelectedUnits: (val: number[]) => void;
  selectedEvents: number[];
  setSelectedEvents: (val: number[]) => void;
  selectedSectors: number[];
  setSelectedSectors: (val: number[]) => void;
  isPending: boolean;
  lang?: Language;
}

interface FilterSectionProps {
  label: string;
  options: { value: number; label: string; icon?: React.ReactNode }[];
  selected: number[];
  setSelected: (val: number[]) => void;
}

const importanceColors: Record<Importance, string> = {
  0: '#9CA3AF', // Gray
  1: '#FCD34D', // Yellow
  2: '#FB923C', // Orange
  3: '#EF4444', // Red
};

const FilterSection: React.FC<FilterSectionProps> = ({ label, options, selected, setSelected }) => (
  <div className="space-y-3">
    <h3 className="text-sm font-medium text-slate-400">{label}</h3>
    <div className="grid grid-cols-2 gap-2">
      {options.map((option) => {
        const isSelected = selected.includes(option.value);
        return (
          <div
            key={option.value}
            onClick={() => {
              const newValue = isSelected
                ? selected.filter(v => v !== option.value)
                : [...selected, option.value];
              setSelected(newValue);
            }}
            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors
            ${isSelected ? 'bg-blue-600' : 'bg-slate-800 hover:bg-slate-700/50'}`}
          >
            {option.icon && <span>{option.icon}</span>}
            <span className="text-sm text-slate-200">{option.label}</span>
          </div>
        );
      })}
    </div>
  </div>
);

export const FiltersSidebar: React.FC<FiltersModalProps> = ({
  selectedImportance,
  setSelectedImportance,
  selectedUnits,
  setSelectedUnits,
  selectedEvents,
  setSelectedEvents,
  selectedSectors,
  setSelectedSectors,
  isPending,
  lang = 'en',
}) => {
  const t = (key: keyof typeof translations) => translations[key][lang];
  
  // Get language-specific maps
  const unitMap = getUnitMap(lang);
  const eventTypeMap = getEventTypeMap(lang);
  const sectorMap = getSectorMap(lang);
  const importanceMap = getImportanceMap(lang);

  const handleReset = () => {
    setSelectedImportance([Importance.NONE, Importance.LOW, Importance.MODERATE, Importance.HIGH]);
    setSelectedUnits([]);
    setSelectedEvents([]);
    setSelectedSectors([]);
  };

  return (
    <div className="w-80 flex flex-col flex-shrink-0 bg-slate-900 rounded-lg border border-slate-700 shadow-lg overflow-y-auto p-8" style={{ height: '100%' }}>
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-white">{t('filtersTitle')}</h2>
        <button
          onClick={handleReset}
          className="px-3 py-1 bg-red-600 text-sm text-white rounded-lg hover:bg-red-700/80"
          disabled={isPending}
        >
          {t('reset')}
        </button>
      </div>

      <div className="space-y-6 flex-1">
        <FilterSection
          label={t('importance')}
          options={Object.values(Importance)
            .filter((v): v is Importance => typeof v === 'number')
            .map(level => ({
              value: level,
              label: importanceMap[level].label,
              icon: (
                <div style={{ fontSize: '14px', color: importanceColors[level] }}>
                  ★
                </div>
              ),
            }))}
          selected={selectedImportance}
          setSelected={setSelectedImportance}
        />

        <FilterSection
          label={t('unit')}
          options={Object.entries(unitMap).map(([v, o]) => ({
            value: parseInt(v),
            label: o.label
          }))}
          selected={selectedUnits}
          setSelected={setSelectedUnits}
        />

        <FilterSection
          label={t('eventType')}
          options={Object.entries(eventTypeMap).map(([v, o]) => ({
            value: parseInt(v),
            label: o.label
          }))}
          selected={selectedEvents}
          setSelected={setSelectedEvents}
        />

        <FilterSection
          label={t('sector')}
          options={Object.entries(sectorMap).map(([v, o]) => ({
            value: parseInt(v),
            label: o.label
          }))}
          selected={selectedSectors}
          setSelected={setSelectedSectors}
        />
      </div>
    </div>
  );
};