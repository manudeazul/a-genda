import { cn } from "@/lib/utils";
import { STATUS_CONFIG } from "@/lib/status";
import type { AppointmentStatus } from "@/lib/types";

export function StatusBadge({ status, className }: { status: AppointmentStatus; className?: string }) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        config.badgeClassName,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
