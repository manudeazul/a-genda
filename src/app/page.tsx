"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { FilterBar, type AssigneeFilter, type StatusFilter } from "@/components/agenda/filter-bar";
import { WeekView } from "@/components/calendar/week-view";
import { DayView } from "@/components/calendar/day-view";
import { AppointmentDetailsDialog } from "@/components/appointment-form/appointment-details-dialog";
import { useAppointments } from "@/hooks/use-appointments";
import { hasActiveFilters as computeHasActiveFilters } from "@/lib/filters";

export default function AgendaPage() {
  const { appointments } = useAppointments();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [assignee, setAssignee] = useState<AssigneeFilter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const selected = selectedId ? (appointments.find((a) => a.id === selectedId) ?? null) : null;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const activeFilters = computeHasActiveFilters({ search, status, assignee });

  function clearFilters() {
    setSearch("");
    setStatus("all");
    setAssignee("all");
  }

  return (
    <>
      <Header />
      <main className="mx-auto flex w-full min-h-0 max-w-[1600px] flex-1 flex-col gap-4 overflow-hidden px-4 py-4 sm:px-6 sm:py-6">
        <FilterBar
          className="shrink-0"
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          assignee={assignee}
          onAssigneeChange={setAssignee}
          hasActiveFilters={activeFilters}
          onClearFilters={clearFilters}
        />

        <WeekView
          appointments={appointments}
          search={search}
          status={status}
          assignee={assignee}
          isLoading={isLoading}
          onSelect={(appointment) => setSelectedId(appointment.id)}
        />
        <DayView
          appointments={appointments}
          search={search}
          status={status}
          assignee={assignee}
          isLoading={isLoading}
          onSelect={(appointment) => setSelectedId(appointment.id)}
        />
      </main>

      <AppointmentDetailsDialog
        appointment={selected}
        onOpenChange={(open) => !open && setSelectedId(null)}
      />
    </>
  );
}
