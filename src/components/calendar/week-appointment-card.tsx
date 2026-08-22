import { Clock, Contact, User } from "lucide-react";
import { StatusDot } from "@/components/agenda/status-dot";
import { isOverdue } from "@/lib/appointment";
import { STATUS_CONFIG } from "@/lib/status";
import { cn } from "@/lib/utils";
import type { Appointment } from "@/lib/types";

export function WeekAppointmentCard({
  appointment,
  onSelect,
}: {
  appointment: Appointment;
  onSelect: (appointment: Appointment) => void;
}) {
  const config = STATUS_CONFIG[appointment.status];

  return (
    <button
      type="button"
      onClick={() => onSelect(appointment)}
      className={cn(
        "flex w-full flex-col gap-2.5 rounded-xl border border-l-4 border-border bg-card p-3 text-left shadow-sm transition-all",
        "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring",
        config.barClassName,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Clock className="size-3.5 shrink-0" />
          {appointment.time}
        </span>
        <StatusDot status={appointment.status} overdue={isOverdue(appointment)} />
      </div>

      <div>
        <p className="line-clamp-3 text-sm font-semibold text-card-foreground">{appointment.description}</p>
        <p className="mt-0.5 line-clamp-2 text-xs italic text-muted-foreground/80">
          {appointment.serviceType}
        </p>
      </div>

      <div className="flex flex-col gap-1 border-t border-border/60 pt-2">
        <div className="flex items-center gap-1.5 text-xs">
          <Contact className="size-3.5 shrink-0 text-muted-foreground" />
          <span className="truncate font-medium text-card-foreground/90">{appointment.client}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <User className="size-3.5 shrink-0" />
          <span className="truncate">{appointment.assignee}</span>
        </div>
      </div>
    </button>
  );
}
