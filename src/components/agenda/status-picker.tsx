"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { STATUS_CONFIG, STATUS_ORDER } from "@/lib/status";
import { cn } from "@/lib/utils";
import type { AppointmentStatus } from "@/lib/types";

export function StatusPicker({
  value,
  onChange,
}: {
  value: AppointmentStatus;
  onChange: (status: AppointmentStatus) => void;
}) {
  const config = STATUS_CONFIG[value];

  return (
    <Select value={value} onValueChange={(next) => onChange(next as AppointmentStatus)}>
      <SelectTrigger
        size="sm"
        className={cn(
          "h-7 gap-1 rounded-full border-none px-3 text-xs font-medium shadow-none",
          config.badgeClassName,
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper" align="start" sideOffset={4}>
        {STATUS_ORDER.map((status) => (
          <SelectItem key={status} value={status}>
            {STATUS_CONFIG[status].label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
