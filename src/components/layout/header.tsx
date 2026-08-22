import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { NewAppointmentDialog } from "@/components/appointment-form/new-appointment-dialog";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-4 py-3 sm:px-6">
        <Logo />
        <div className="flex items-center gap-2">
          <NewAppointmentDialog />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
