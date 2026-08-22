"use client";

import { ArrowRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NEXT_STATUS, STATUS_CONFIG, STATUS_ORDER } from "@/lib/status";
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
  const nextStatus = NEXT_STATUS[value];

  return (
    <div className="inline-flex h-7 items-center overflow-hidden rounded-full">
      <Select value={value} onValueChange={(next) => onChange(next as AppointmentStatus)}>
        <SelectTrigger
          size="sm"
          style={nextStatus ? { borderTopRightRadius: 0, borderBottomRightRadius: 0 } : undefined}
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
      {nextStatus && (
        <button
          type="button"
          onClick={() => onChange(nextStatus)}
          title={`Avançar para "${STATUS_CONFIG[nextStatus].label}"`}
          aria-label={`Avançar para ${STATUS_CONFIG[nextStatus].label}`}
          className={cn(
            "flex h-7 items-center self-stretch border-l border-background/40 px-2 transition-colors hover:brightness-95",
            config.badgeClassName,
          )}
        >
          <ArrowRight className="size-3.5" />
        </button>
      )}
    </div>
  );
}
