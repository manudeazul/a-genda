"use client";

import { useRef, useState } from "react";
import { ClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const TIME_OPTIONS = Array.from({ length: (19 - 7) * 2 + 1 }, (_, index) => {
  const totalMinutes = 7 * 60 + index * 30;
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const minutes = String(totalMinutes % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
});

export function TimePickerField({
  id,
  value,
  onChange,
  invalid,
}: {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
          requestAnimationFrame(() => {
            listRef.current?.querySelector<HTMLButtonElement>('[data-selected="true"]')?.scrollIntoView({
              block: "center",
            });
          });
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          aria-invalid={invalid}
          className={cn(
            "w-full min-w-0 shrink justify-start font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <ClockIcon className="size-4 shrink-0" />
          <span className="truncate">{value || "Selecione o horário"}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32 p-1" align="start">
        <div ref={listRef} className="scroll-thin flex max-h-56 flex-col gap-0.5 overflow-y-auto">
          {TIME_OPTIONS.map((time) => (
            <button
              key={time}
              type="button"
              data-selected={time === value}
              onClick={() => {
                onChange(time);
                setOpen(false);
              }}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                time === value && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
              )}
            >
              {time}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
