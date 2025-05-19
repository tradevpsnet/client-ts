import React from "react";
import { Importance } from "./list";

const importanceColors: Record<number, string> = {
  0: '#9CA3AF',
  1: '#60A5FA',
  2: '#FBBF24',
  3: '#F87171',
};
type Props = {
  level: Importance;
}
export const ImportanceIndicator: React.FC<Props> = ({ level }) => {
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