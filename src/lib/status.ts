import type { AppointmentStatus } from "@/lib/types";

interface StatusConfig {
  label: string;
  dotClassName: string;
  badgeClassName: string;
  barClassName: string;
}

export const STATUS_CONFIG: Record<AppointmentStatus, StatusConfig> = {
  scheduled: {
    label: "Agendado",
    dotClassName: "bg-status-scheduled",
    badgeClassName: "bg-status-scheduled-bg text-status-scheduled",
    barClassName: "border-l-status-scheduled",
  },
  "in-progress": {
    label: "Em andamento",
    dotClassName: "bg-status-in-progress",
    badgeClassName: "bg-status-in-progress-bg text-status-in-progress",
    barClassName: "border-l-status-in-progress",
  },
  done: {
    label: "Concluído",
    dotClassName: "bg-status-done",
    badgeClassName: "bg-status-done-bg text-status-done",
    barClassName: "border-l-status-done",
  },
  cancelled: {
    label: "Cancelado",
    dotClassName: "bg-status-cancelled",
    badgeClassName: "bg-status-cancelled-bg text-status-cancelled",
    barClassName: "border-l-status-cancelled",
  },
};

export const STATUS_ORDER: AppointmentStatus[] = ["scheduled", "in-progress", "done", "cancelled"];
