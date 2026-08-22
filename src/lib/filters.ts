import type { Appointment } from "@/lib/types";
import type { AssigneeFilter, StatusFilter } from "@/components/agenda/filter-bar";

export function filterAppointments(
  appointments: Appointment[],
  { search, status, assignee }: { search: string; status: StatusFilter; assignee: AssigneeFilter },
): Appointment[] {
  const normalizedSearch = search.trim().toLowerCase();

  return appointments
    .filter((appointment) => status === "all" || appointment.status === status)
    .filter((appointment) => assignee === "all" || appointment.assignee === assignee)
    .filter((appointment) => {
      if (!normalizedSearch) return true;
      return (
        appointment.client.toLowerCase().includes(normalizedSearch) ||
        appointment.serviceType.toLowerCase().includes(normalizedSearch)
      );
    });
}

export function hasActiveFilters({
  search,
  status,
  assignee,
}: {
  search: string;
  status: StatusFilter;
  assignee: AssigneeFilter;
}): boolean {
  return Boolean(search.trim()) || status !== "all" || assignee !== "all";
}
