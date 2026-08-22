import { parseISODate } from "@/lib/date";

export function formatDateLabel(isoDate: string): string {
  const date = parseISODate(isoDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.round((date.getTime() - today.getTime()) / 86_400_000);

  if (diffDays === 0) return "Hoje";
  if (diffDays === 1) return "Amanhã";
  if (diffDays === -1) return "Ontem";

  return date
    .toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      weekday: "short",
    })
    .replace(/\./g, "");
}
