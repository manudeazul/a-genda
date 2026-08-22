export type AppointmentStatus = "scheduled" | "in-progress" | "done" | "cancelled";

export interface Appointment {
  id: string;
  client: string;
  description: string;
  serviceType: string;
  date: string; // ISO: YYYY-MM-DD
  time: string; // HH:mm
  assignee: string;
  status: AppointmentStatus;
  address?: string;
  notes?: string;
  createdAt: string;
}

export type NewAppointmentInput = Omit<Appointment, "id" | "createdAt" | "status"> & {
  status?: AppointmentStatus;
};
