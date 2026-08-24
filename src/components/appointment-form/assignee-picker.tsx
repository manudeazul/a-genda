"use client";

import { User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ASSIGNEES } from "@/lib/mock-data";

export function AssigneePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        size="sm"
        className="h-auto min-w-0 shrink gap-1.5 rounded-md border-none px-1.5 py-1 text-sm text-muted-foreground shadow-none hover:bg-muted hover:text-foreground data-[state=open]:bg-muted data-[state=open]:text-foreground"
      >
        <User className="size-3.5 shrink-0" />
        <SelectValue className="truncate" />
      </SelectTrigger>
      <SelectContent position="popper" align="start" sideOffset={4}>
        {ASSIGNEES.map((assignee) => (
          <SelectItem key={assignee} value={assignee}>
            {assignee}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
