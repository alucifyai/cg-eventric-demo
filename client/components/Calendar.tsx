import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface CalendarProps {
  onDateSelect?: (date: Date) => void;
}

export default function Calendar({ onDateSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11)); // December 2025
  const [selectedDate, setSelectedDate] = useState(7);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0,
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  ).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
    if (onDateSelect) {
      onDateSelect(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day),
      );
    }
  };

  const renderDays = () => {
    const days = [];
    const totalCells = 35;

    for (let i = 0; i < totalCells; i++) {
      const day = i - firstDayOfMonth + 1;
      const isCurrentMonth = day > 0 && day <= daysInMonth;
      const isSelected = day === selectedDate && isCurrentMonth;
      const isInRange = day >= 2 && day <= 6 && isCurrentMonth;

      days.push(
        <button
          key={i}
          onClick={() => isCurrentMonth && handleDateClick(day)}
          className={`
            flex items-center justify-center rounded-full min-w-[12px] min-h-[32px] px-0.5 py-[7px]
            ${isSelected ? "bg-red-500 border-4 border-white/40" : ""}
            ${isInRange && !isSelected ? "border-4 border-white/40" : ""}
            ${isCurrentMonth ? "text-[#FCFCFC] hover:bg-white/10" : "text-transparent"}
            ${!isSelected && !isInRange ? "border-4 border-transparent" : ""}
          `}
        >
          <span className="text-[15px] font-semibold leading-6 tracking-[-0.15px]">
            {isCurrentMonth ? day : ""}
          </span>
        </button>,
      );
    }

    return days;
  };

  return (
    <div className="flex flex-col items-center gap-10 w-full h-full p-6 bg-black/25 border border-black/20 rounded-sm">
      <div className="flex items-center justify-center gap-2 w-full">
        <span className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
          Choose Date
        </span>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 w-full px-2 rounded-2xl backdrop-blur-2xl">
        <div className="flex items-center justify-between w-full">
          <button
            onClick={handlePrevMonth}
            className="flex items-center justify-center p-2 rounded-full hover:bg-white/10"
          >
            <ChevronLeft className="w-5 h-5 text-[#6F767E]" />
          </button>

          <div className="text-xl font-semibold leading-8 tracking-[-0.4px] text-[#FCFCFC]">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </div>

          <button
            onClick={handleNextMonth}
            className="flex items-center justify-center p-2 rounded-full hover:bg-white/10"
          >
            <ChevronRight className="w-5 h-5 text-[#EFEFEF]" />
          </button>
        </div>

        <div className="flex flex-col items-start gap-5 w-full">
          <div className="grid grid-cols-7 gap-0 w-full">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div
                key={day}
                className="flex items-center justify-center p-2 rounded-full"
              >
                <span className="w-6 text-center text-xs font-bold leading-4 tracking-[-0.12px] text-[#6F767E]">
                  {day}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-[11px] w-full">
            {renderDays()}
          </div>
        </div>
      </div>
    </div>
  );
}
