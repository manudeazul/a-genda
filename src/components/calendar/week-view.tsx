"use client";

import { useState } from "react";
import { CalendarNav } from "@/components/calendar/calendar-nav";
import { AddAppointmentButton } from "@/components/calendar/add-appointment-button";
import { WeekAppointmentCard } from "@/components/calendar/week-appointment-card";
import { Skeleton } from "@/components/ui/skeleton";
import { addDays, formatMonthYear, isSameDay, startOfWeek, toISODate, WEEKDAY_LABELS } from "@/lib/date";
import { filterAppointments } from "@/lib/filters";
import { useResponsiveDayCount } from "@/hooks/use-responsive-day-count";
import { cn } from "@/lib/utils";
import type { AssigneeFilter, StatusFilter } from "@/components/agenda/filter-bar";
import type { Appointment } from "@/lib/types";

const GRID_COLS_CLASS: Record<number, string> = {
  7: "grid-cols-7",
  5: "grid-cols-5",
  3: "grid-cols-3",
};

interface WeekViewProps {
  appointments: Appointment[];
  search: string;
  status: StatusFilter;
  assignee: AssigneeFilter;
  isLoading: boolean;
  onSelect: (appointment: Appointment) => void;
}

export function WeekView({ appointments, search, status, assignee, isLoading, onSelect }: WeekViewProps) {
  const [anchor, setAnchor] = useState(() => new Date());
  const dayCount = useResponsiveDayCount();
  const isFullWeek = dayCount >= 7;
  const today = new Date();
  const days = isFullWeek
    ? Array.from({ length: 7 }, (_, index) => addDays(startOfWeek(anchor), index))
    : Array.from({ length: dayCount }, (_, index) =>
        addDays(anchor, index - Math.floor((dayCount - 1) / 2)),
      );
  const navStep = isFullWeek ? 7 : dayCount;
  const filtered = filterAppointments(appointments, { search, status, assignee });

  return (
    <div className="hidden min-h-0 flex-1 flex-col gap-4 md:flex">
      <CalendarNav
        date={anchor}
        label={formatMonthYear(anchor)}
        onToday={() => setAnchor(new Date())}
        onPrev={() => setAnchor((current) => addDays(current, -navStep))}
        onNext={() => setAnchor((current) => addDays(current, navStep))}
        onSelectDate={setAnchor}
        prevLabel="Semana anterior"
        nextLabel="Próxima semana"
      />

      <div className={cn("grid min-h-0 flex-1 gap-3", GRID_COLS_CLASS[dayCount])}>
        {days.map((day) => {
          const iso = toISODate(day);
          const dayAppointments = filtered
            .filter((appointment) => appointment.date === iso)
            .sort((a, b) => a.time.localeCompare(b.time));
          const isToday = isSameDay(day, today);

          return (
            <div key={iso} className="flex min-h-0 min-w-0 flex-col gap-2">
              <div
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-lg py-1.5",
                  isToday && "bg-primary/10",
                )}
              >
                <span className="text-[11px] font-medium uppercase text-muted-foreground">
                  {WEEKDAY_LABELS[day.getDay()]}
                </span>
                <span className={cn("text-sm font-semibold text-foreground", isToday && "text-primary")}>
                  {day.getDate()}
                </span>
              </div>

              <div className="scroll-thin flex min-h-0 flex-1 flex-col gap-2 overflow-x-hidden overflow-y-auto rounded-xl border border-dashed border-border/60 p-2">
                {isLoading ? (
                  <>
                    <Skeleton className="h-20 w-full rounded-xl" />
                    <Skeleton className="h-20 w-full rounded-xl" />
                  </>
                ) : (
                  <>
                    <AddAppointmentButton date={iso} />
                    {dayAppointments.map((appointment) => (
                      <WeekAppointmentCard key={appointment.id} appointment={appointment} onSelect={onSelect} />
                    ))}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
