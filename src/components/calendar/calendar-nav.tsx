"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface CalendarNavProps {
  date: Date;
  label: string;
  onToday: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectDate: (date: Date) => void;
  prevLabel: string;
  nextLabel: string;
}

export function CalendarNav({
  date,
  label,
  onToday,
  onPrev,
  onNext,
  onSelectDate,
  prevLabel,
  nextLabel,
}: CalendarNavProps) {
  return (
    <div className="relative flex items-center justify-between">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onPrev} aria-label={prevLabel}>
          <ChevronLeft />
        </Button>
        <Button variant="ghost" size="icon" onClick={onNext} aria-label={nextLabel}>
          <ChevronRight />
        </Button>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-foreground"
          >
            {label}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            mode="single"
            locale={ptBR}
            selected={date}
            onSelect={(value) => value && onSelectDate(value)}
            defaultMonth={date}
          />
        </PopoverContent>
      </Popover>

      <Button variant="outline" size="sm" onClick={onToday}>
        Hoje
      </Button>
    </div>
  );
}
