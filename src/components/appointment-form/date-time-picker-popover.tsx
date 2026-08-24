"use client";

import { useState } from "react";
import { CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DatePickerField } from "@/components/appointment-form/date-picker-field";
import { TimePickerField } from "@/components/appointment-form/time-picker-field";
import { formatDateLabel } from "@/lib/format";

export function DateTimePickerPopover({
  date,
  time,
  onChange,
}: {
  date: string;
  time: string;
  onChange: (value: { date: string; time: string }) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2.5 h-auto gap-1.5 px-2.5 py-1 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <CalendarClock className="size-4" />
          {formatDateLabel(date)} · {time}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-56 flex-col gap-3" align="start">
        <div className="flex flex-col gap-1.5">
          <Label>Data</Label>
          <DatePickerField value={date} onChange={(value) => onChange({ date: value, time })} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Horário</Label>
          <TimePickerField value={time} onChange={(value) => onChange({ date, time: value })} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
