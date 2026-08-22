"use client";

import { Filter, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ASSIGNEES } from "@/lib/mock-data";
import { STATUS_CONFIG, STATUS_ORDER } from "@/lib/status";
import { cn } from "@/lib/utils";
import type { AppointmentStatus } from "@/lib/types";

export type StatusFilter = AppointmentStatus | "all";
export type AssigneeFilter = string | "all";

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  assignee: AssigneeFilter;
  onAssigneeChange: (value: AssigneeFilter) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  className?: string;
}

export function FilterBar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  assignee,
  onAssigneeChange,
  hasActiveFilters,
  onClearFilters,
  className,
}: FilterBarProps) {
  const hasSecondaryFilters = status !== "all" || assignee !== "all";

  return (
    <div className={cn("flex w-full items-center gap-2", className)}>
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar por cliente ou serviço..."
          className="pl-9"
        />
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="relative shrink-0" aria-label="Filtros">
            <Filter />
            {hasSecondaryFilters && (
              <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-primary" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="flex w-64 flex-col gap-3">
          <Select value={status} onValueChange={(value) => onStatusChange(value as StatusFilter)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              {STATUS_ORDER.map((s) => (
                <SelectItem key={s} value={s}>
                  {STATUS_CONFIG[s].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={assignee} onValueChange={onAssigneeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Responsável" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os responsáveis</SelectItem>
              {ASSIGNEES.map((person) => (
                <SelectItem key={person} value={person}>
                  {person}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant="ghost" onClick={onClearFilters} className="justify-start">
              <X />
              Limpar filtros
            </Button>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
