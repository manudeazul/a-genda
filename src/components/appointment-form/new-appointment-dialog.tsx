"use client";

import { useId, useState, type ReactNode } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { AppointmentForm } from "@/components/appointment-form/appointment-form";
import { useAppointments } from "@/hooks/use-appointments";
import type { NewAppointmentInput } from "@/lib/types";

interface NewAppointmentDialogProps {
  trigger?: ReactNode;
  defaultDate?: string;
}

export function NewAppointmentDialog({ trigger, defaultDate }: NewAppointmentDialogProps) {
  const [open, setOpen] = useState(false);
  const formId = useId();
  const { addAppointment } = useAppointments();

  function handleSubmit(input: NewAppointmentInput) {
    const appointment = addAppointment(input);
    setOpen(false);
    toast.success("Agendamento criado com sucesso", {
      description: `${appointment.client} · ${appointment.serviceType}`,
    });
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right" shouldScaleBackground={false}>
      <DrawerTrigger asChild>
        {trigger ?? (
          <Button>
            <Plus />
            Novo agendamento
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent className="flex flex-col overflow-hidden sm:max-w-md">
        <DrawerClose asChild>
          <Button variant="ghost" size="icon-sm" className="absolute top-4 right-4" aria-label="Fechar">
            <X />
          </Button>
        </DrawerClose>
        <DrawerHeader className="shrink-0">
          <DrawerTitle>Novo agendamento</DrawerTitle>
        </DrawerHeader>
        <div className="scroll-thin min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-4 pb-4">
          <AppointmentForm formId={formId} defaultDate={defaultDate} onSubmit={handleSubmit} />
        </div>
        <DrawerFooter className="shrink-0 flex-row justify-end gap-2 border-t border-border/60">
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button type="submit" form={formId}>
            Criar agendamento
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
