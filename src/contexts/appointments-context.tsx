"use client";

import { createContext, useMemo, useReducer, type ReactNode } from "react";
import { MOCK_APPOINTMENTS } from "@/lib/mock-data";
import type { Appointment, AppointmentStatus, NewAppointmentInput } from "@/lib/types";

interface AppointmentsState {
  appointments: Appointment[];
}

type AppointmentPatch = Partial<Omit<Appointment, "id" | "createdAt">>;

type AppointmentsAction =
  | { type: "ADD"; payload: Appointment }
  | { type: "UPDATE_STATUS"; payload: { id: string; status: AppointmentStatus } }
  | { type: "UPDATE"; payload: { id: string; patch: AppointmentPatch } };

function appointmentsReducer(
  state: AppointmentsState,
  action: AppointmentsAction,
): AppointmentsState {
  switch (action.type) {
    case "ADD":
      return { appointments: [action.payload, ...state.appointments] };
    case "UPDATE_STATUS":
      return {
        appointments: state.appointments.map((appointment) =>
          appointment.id === action.payload.id
            ? { ...appointment, status: action.payload.status }
            : appointment,
        ),
      };
    case "UPDATE":
      return {
        appointments: state.appointments.map((appointment) =>
          appointment.id === action.payload.id
            ? { ...appointment, ...action.payload.patch }
            : appointment,
        ),
      };
    default:
      return state;
  }
}

interface AppointmentsContextValue {
  appointments: Appointment[];
  addAppointment: (input: NewAppointmentInput) => Appointment;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  updateAppointment: (id: string, patch: AppointmentPatch) => void;
}

export const AppointmentsContext = createContext<AppointmentsContextValue | null>(null);

export function AppointmentsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appointmentsReducer, {
    appointments: MOCK_APPOINTMENTS,
  });

  const value = useMemo<AppointmentsContextValue>(
    () => ({
      appointments: state.appointments,
      addAppointment: (input) => {
        const appointment: Appointment = {
          ...input,
          id: crypto.randomUUID(),
          status: input.status ?? "scheduled",
          createdAt: new Date().toISOString(),
        };
        dispatch({ type: "ADD", payload: appointment });
        return appointment;
      },
      updateAppointmentStatus: (id, status) => {
        dispatch({ type: "UPDATE_STATUS", payload: { id, status } });
      },
      updateAppointment: (id, patch) => {
        dispatch({ type: "UPDATE", payload: { id, patch } });
      },
    }),
    [state.appointments],
  );

  return (
    <AppointmentsContext.Provider value={value}>{children}</AppointmentsContext.Provider>
  );
}
