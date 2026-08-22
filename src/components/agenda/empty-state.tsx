import { CalendarSearch } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  title = "Nenhum agendamento encontrado",
  description = "Tente ajustar os filtros ou crie um novo agendamento.",
  action,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <CalendarSearch className="size-6" />
      </div>
      <div>
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}
