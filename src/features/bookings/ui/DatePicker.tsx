import * as React from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import "../../../styles/big-calendar.css";

type DatePickerProps = {
  blockedRanges?: { from: Date; to: Date }[];
  selectedRange?: DateRange | undefined;
  onSelectRange?: (range: DateRange | undefined) => void;
};

export function DatePicker({
  blockedRanges = [],
  selectedRange,
  onSelectRange,
}: DatePickerProps) {
  return (
    <div className="bigCalendar">
      <DayPicker
        animate
        mode="range"
        selected={selectedRange}
        onSelect={onSelectRange}
        disabled={blockedRanges}
        excludeDisabled
      />
    </div>
  );
}
