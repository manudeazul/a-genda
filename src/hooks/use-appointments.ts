import { useContext } from "react";
import { AppointmentsContext } from "@/contexts/appointments-context";

export function useAppointments() {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error("useAppointments deve ser usado dentro de um AppointmentsProvider");
  }
  return context;
}
