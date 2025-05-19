import React from "react";
import { Importance } from "./list";

const importanceColors: Record<Importance, string> = {
  0: '#4B5563',     // Gray (none)
  1: '#FBBF24',     // Yellow
  2: '#FB923C',     // Orange
  3: '#EF4444',     // Red
};

type Props = {
  level: Importance;
};

export const ImportanceIndicator: React.FC<Props> = ({ level }) => {
  const barCount = 3;

  return (
    <div
      style={{
        display: 'flex',
        gap: '2px',
        width: '16px',
        height: '12px',
        alignItems: 'flex-end',
      }}
    >
      {Array.from({ length: barCount }, (_, i) => (
        <div
          key={i}
          style={{
            width: '3px',
            height: '100%',
            backgroundColor: level > 0 && i < level ? importanceColors[level] : '#4B5563',
            borderRadius: '1px',
          }}
        />
      ))}
    </div>
  );
};
