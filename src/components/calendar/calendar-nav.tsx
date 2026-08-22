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
    <>
      {/* Mobile: arrows flank the date, everything on one row */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-1 sm:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="size-11 shrink-0"
          onClick={onPrev}
          aria-label={prevLabel}
        >
          <ChevronLeft />
        </Button>

        <div className="flex min-w-0 items-center justify-center gap-2">
          <Button variant="outline" size="sm" className="shrink-0" onClick={onToday}>
            Hoje
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="min-w-0 truncate text-sm font-semibold text-foreground"
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
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="size-11 shrink-0"
          onClick={onNext}
          aria-label={nextLabel}
        >
          <ChevronRight />
        </Button>
      </div>

      {/* Desktop/tablet: date centered, Hoje + arrows grouped at the right */}
      <div className="relative hidden items-center justify-end sm:flex">
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

        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" onClick={onToday}>
            Hoje
          </Button>
          <Button variant="ghost" size="icon" className="size-8" onClick={onPrev} aria-label={prevLabel}>
            <ChevronLeft />
          </Button>
          <Button variant="ghost" size="icon" className="size-8" onClick={onNext} aria-label={nextLabel}>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </>
  );
}
