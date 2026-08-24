"use client";

import { Contact, Copy, MapPin, Navigation, NotebookText } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { StatusDot } from "@/components/agenda/status-dot";
import { StatusPicker } from "@/components/agenda/status-picker";
import { AssigneePicker } from "@/components/appointment-form/assignee-picker";
import { DateTimePickerPopover } from "@/components/appointment-form/date-time-picker-popover";
import { useAppointments } from "@/hooks/use-appointments";
import { isOverdue } from "@/lib/appointment";
import { STATUS_CONFIG } from "@/lib/status";
import type { Appointment, AppointmentStatus } from "@/lib/types";

interface DetailRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  action?: React.ReactNode;
}

function DetailRow({ icon, label, value, action }: DetailRowProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
      {action && <div className="flex shrink-0 items-center gap-1">{action}</div>}
    </div>
  );
}

export function AppointmentDetailsDialog({
  appointment,
  onOpenChange,
}: {
  appointment: Appointment | null;
  onOpenChange: (open: boolean) => void;
}) {
  const { updateAppointmentStatus, updateAppointment } = useAppointments();

  function handleStatusChange(status: AppointmentStatus) {
    if (!appointment) return;
    updateAppointmentStatus(appointment.id, status);
    toast.success("Status atualizado", {
      description: `${appointment.description} agora está "${STATUS_CONFIG[status].label}".`,
    });
  }

  function handleDateTimeChange(value: { date: string; time: string }) {
    if (!appointment) return;
    updateAppointment(appointment.id, value);
    toast.success("Agendamento reagendado", {
      description: `${appointment.description} atualizado.`,
    });
  }

  function handleAssigneeChange(assignee: string) {
    if (!appointment) return;
    updateAppointment(appointment.id, { assignee });
    toast.success("Responsável atualizado", {
      description: `${appointment.description} agora com ${assignee}.`,
    });
  }

  async function handleCopyAddress(address: string) {
    try {
      await navigator.clipboard.writeText(address);
      toast.success("Endereço copiado");
    } catch {
      toast.error("Não foi possível copiar o endereço");
    }
  }

  return (
    <Dialog open={Boolean(appointment)} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-x-hidden overflow-y-auto sm:max-w-md">
        {appointment && (
          <>
            <DialogDescription className="sr-only">Detalhes do agendamento</DialogDescription>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2 pr-6">
                <DateTimePickerPopover
                  date={appointment.date}
                  time={appointment.time}
                  onChange={handleDateTimeChange}
                />
                {isOverdue(appointment) && (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-status-cancelled">
                    <StatusDot status={appointment.status} overdue />
                    Atrasado
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-xs text-muted-foreground">{appointment.serviceType}</p>
                <DialogTitle className="text-lg leading-snug">{appointment.description}</DialogTitle>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <AssigneePicker value={appointment.assignee} onChange={handleAssigneeChange} />
                <StatusPicker value={appointment.status} onChange={handleStatusChange} />
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-4">
              <DetailRow icon={<Contact className="size-4" />} label="Cliente" value={appointment.client} />
              {appointment.notes && (
                <DetailRow
                  icon={<NotebookText className="size-4" />}
                  label="Observações"
                  value={appointment.notes}
                />
              )}
              {appointment.address && (
                <DetailRow
                  icon={<MapPin className="size-4" />}
                  label="Endereço"
                  value={appointment.address}
                  action={
                    <>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Copiar endereço"
                        title="Copiar endereço"
                        onClick={() => handleCopyAddress(appointment.address!)}
                      >
                        <Copy />
                      </Button>
                      <Button variant="ghost" size="icon-sm" aria-label="Abrir no Google Maps" asChild>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(appointment.address)}`}
                          target="_blank"
                          rel="noreferrer"
                          title="Abrir no Google Maps"
                        >
                          <Navigation />
                        </a>
                      </Button>
                    </>
                  }
                />
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
