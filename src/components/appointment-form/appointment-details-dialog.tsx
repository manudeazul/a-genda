"use client";

import { Contact, Copy, MapPin, Navigation, NotebookText, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { StatusPicker } from "@/components/agenda/status-picker";
import { useAppointments } from "@/hooks/use-appointments";
import { formatDateLabel } from "@/lib/format";
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
  const { updateAppointmentStatus } = useAppointments();

  function handleStatusChange(status: AppointmentStatus) {
    if (!appointment) return;
    updateAppointmentStatus(appointment.id, status);
    toast.success("Status atualizado", {
      description: `${appointment.description} agora está "${STATUS_CONFIG[status].label}".`,
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
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        {appointment && (
          <>
            <DialogDescription className="sr-only">Detalhes do agendamento</DialogDescription>

            <div className="flex flex-col gap-3 pr-6">
              <div className="flex flex-col gap-0.5">
                <p className="text-xm text-muted-foreground">{formatDateLabel(appointment.date)} {appointment.time}</p>
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-xs text-muted-foreground">{appointment.serviceType}</p>
                <DialogTitle className="text-lg">{appointment.description}</DialogTitle>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusPicker value={appointment.status} onChange={handleStatusChange} />
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <User className="size-3.5" />
                  {appointment.assignee}
                </span>
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
