import { parseDateTime } from "@/lib/date";
import type { Appointment } from "@/lib/types";

export function isOverdue(appointment: Appointment): boolean {
  if (appointment.status !== "scheduled") return false;
  return parseDateTime(appointment.date, appointment.time).getTime() < Date.now();
}
