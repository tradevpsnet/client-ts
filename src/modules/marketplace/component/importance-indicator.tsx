import React from "react";
import { Importance } from "./list";

const importanceColors: Record<Importance, string> = {
  0: '#9CA3AF', // Gray
  1: '#FCD34D', // Yellow
  2: '#FB923C', // Orange
  3: '#EF4444', // Red
};

type Props = {
  level: Importance;
};

export const ImportanceIndicator: React.FC<Props> = ({ level }) => {
  return (
    <div className="text-lg" style={{ color: importanceColors[level] }}>
      ★
    </div>
  );
};
