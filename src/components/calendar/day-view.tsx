"use client";

import { useState } from "react";
import { CalendarNav } from "@/components/calendar/calendar-nav";
import { AddAppointmentButton } from "@/components/calendar/add-appointment-button";
import { WeekAppointmentCard } from "@/components/calendar/week-appointment-card";
import { AppointmentCardSkeleton } from "@/components/agenda/appointment-card-skeleton";
import { EmptyState } from "@/components/agenda/empty-state";
import { NewAppointmentDialog } from "@/components/appointment-form/new-appointment-dialog";
import { addDays, formatDayHeading, toISODate } from "@/lib/date";
import { filterAppointments } from "@/lib/filters";
import type { AssigneeFilter, StatusFilter } from "@/components/agenda/filter-bar";
import type { Appointment } from "@/lib/types";

interface DayViewProps {
  appointments: Appointment[];
  search: string;
  status: StatusFilter;
  assignee: AssigneeFilter;
  isLoading: boolean;
  onSelect: (appointment: Appointment) => void;
}

export function DayView({ appointments, search, status, assignee, isLoading, onSelect }: DayViewProps) {
  const [anchor, setAnchor] = useState(() => new Date());
  const iso = toISODate(anchor);
  const dayAppointments = filterAppointments(appointments, { search, status, assignee })
    .filter((appointment) => appointment.date === iso)
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 md:hidden">
      <CalendarNav
        date={anchor}
        label={formatDayHeading(anchor)}
        onToday={() => setAnchor(new Date())}
        onPrev={() => setAnchor((current) => addDays(current, -1))}
        onNext={() => setAnchor((current) => addDays(current, 1))}
        onSelectDate={setAnchor}
        prevLabel="Dia anterior"
        nextLabel="Próximo dia"
      />

      {isLoading ? (
        <div className="flex flex-col gap-3">
          <AppointmentCardSkeleton />
          <AppointmentCardSkeleton />
        </div>
      ) : dayAppointments.length === 0 ? (
        <EmptyState
          title="Nenhum agendamento neste dia"
          description="Use as setas para navegar entre os dias ou crie um novo agendamento."
          action={<NewAppointmentDialog defaultDate={iso} />}
        />
      ) : (
        <div className="scroll-thin flex min-h-0 flex-1 flex-col gap-3 overflow-x-hidden overflow-y-auto">
          <AddAppointmentButton date={iso} />
          {dayAppointments.map((appointment) => (
            <WeekAppointmentCard key={appointment.id} appointment={appointment} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}
