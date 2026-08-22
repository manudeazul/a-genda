import { STATUS_CONFIG } from "@/lib/status";
import { cn } from "@/lib/utils";
import type { AppointmentStatus } from "@/lib/types";

export function StatusDot({
  status,
  overdue,
  className,
}: {
  status: AppointmentStatus;
  overdue?: boolean;
  className?: string;
}) {
  const config = STATUS_CONFIG[status];
  const label = overdue ? `${config.label} · Atrasado` : config.label;

  if (overdue) {
    return (
      <span role="img" aria-label={label} title={label} className={cn("relative inline-flex size-2.5", className)}>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-cancelled opacity-60 [animation-duration:1.8s]" />
        <span className="relative size-2.5 rounded-full bg-status-cancelled" />
      </span>
    );
  }

  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      className={cn("size-2.5 shrink-0 rounded-full", config.dotClassName, className)}
    />
  );
}
