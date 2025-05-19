import React, { useRef } from "react";
import { useClickOutside } from "./use-click-outside";

interface Option { value: number; label: string; }

interface MultiSelectFilterProps {
  name: string;
  label: string;
  options: Option[];
  selected: number[];
  setSelected: (val: number[]) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({
  name,
  label,
  options,
  selected,
  setSelected,
  isOpen,
  onToggle,
  onClose,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClose);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={onToggle}
        className="px-3 py-1 bg-slate-700 rounded-md text-slate-300 hover:bg-slate-600"
      >
        {label} ▼
      </button>
      {isOpen && (
        <div className="absolute bg-slate-800 p-2 rounded-md shadow-lg z-10 w-max">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 whitespace-nowrap text-sm text-slate-300"
            >
              <input
                type="checkbox"
                checked={selected.includes(option.value)}
                onChange={(e) => {
                  const next = e.target.checked
                    ? [...selected, option.value]
                    : selected.filter((v) => v !== option.value);
                  setSelected(next);
                }}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectFilter;
