import { Plus } from "lucide-react";
import { NewAppointmentDialog } from "@/components/appointment-form/new-appointment-dialog";

export function AddAppointmentButton({ date }: { date: string }) {
  return (
    <NewAppointmentDialog
      defaultDate={date}
      trigger={
        <button
          type="button"
          aria-label="Novo agendamento neste dia"
          className="flex items-center justify-center rounded-md border border-dashed border-border/60 py-1.5 text-muted-foreground/70 transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <Plus className="size-3.5" />
        </button>
      }
    />
  );
}
