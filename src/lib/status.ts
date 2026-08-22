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
    badgeClassName: "text-status-scheduled dark:bg-muted dark:text-status-scheduled",
    barClassName: "border-l-status-scheduled",
  },
  "in-progress": {
    label: "Em andamento",
    dotClassName: "bg-status-in-progress",
    badgeClassName: "text-status-in-progress dark:bg-muted dark:text-status-in-progress",
    barClassName: "border-l-status-in-progress",
  },
  done: {
    label: "Concluído",
    dotClassName: "bg-status-done",
    badgeClassName: "text-status-done dark:bg-muted dark:text-status-done",
    barClassName: "border-l-status-done",
  },
  cancelled: {
    label: "Cancelado",
    dotClassName: "bg-status-cancelled",
    badgeClassName: "text-status-cancelled dark:bg-muted dark:text-status-cancelled",
    barClassName: "border-l-status-cancelled",
  },
};

export const STATUS_ORDER: AppointmentStatus[] = ["scheduled", "in-progress", "done", "cancelled"];

export const NEXT_STATUS: Partial<Record<AppointmentStatus, AppointmentStatus>> = {
  scheduled: "in-progress",
  "in-progress": "done",
};
