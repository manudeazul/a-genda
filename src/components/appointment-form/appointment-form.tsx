"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerField } from "@/components/appointment-form/date-picker-field";
import { TimePickerField } from "@/components/appointment-form/time-picker-field";
import { ASSIGNEES, SERVICE_TYPES } from "@/lib/mock-data";
import type { NewAppointmentInput } from "@/lib/types";

interface AppointmentFormProps {
  formId: string;
  defaultDate?: string;
  onSubmit: (input: NewAppointmentInput) => void;
}

interface FormState {
  description: string;
  client: string;
  serviceType: string;
  date: string;
  time: string;
  assignee: string;
  address: string;
  notes: string;
}

const INITIAL_STATE: FormState = {
  description: "",
  client: "",
  serviceType: "",
  date: "",
  time: "",
  assignee: "",
  address: "",
  notes: "",
};

export function AppointmentForm({ formId, defaultDate, onSubmit }: AppointmentFormProps) {
  const [form, setForm] = useState<FormState>(() => ({
    ...INITIAL_STATE,
    date: defaultDate ?? "",
  }));
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.description.trim()) nextErrors.description = "Descreva o agendamento.";
    if (!form.client.trim()) nextErrors.client = "Informe o cliente.";
    if (!form.serviceType) nextErrors.serviceType = "Selecione o tipo de serviço.";
    if (!form.date) nextErrors.date = "Selecione a data.";
    if (!form.time) nextErrors.time = "Selecione o horário.";
    if (!form.assignee) nextErrors.assignee = "Selecione o responsável.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    onSubmit({
      description: form.description.trim(),
      client: form.client.trim(),
      serviceType: form.serviceType,
      date: form.date,
      time: form.time,
      assignee: form.assignee,
      address: form.address.trim() || undefined,
      notes: form.notes.trim() || undefined,
    });
    setForm(INITIAL_STATE);
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
          placeholder="Ex: Análise de vibração em motores e redutores"
          aria-invalid={Boolean(errors.description)}
        />
        {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="serviceType">Tipo de serviço</Label>
        <Select value={form.serviceType} onValueChange={(value) => updateField("serviceType", value)}>
          <SelectTrigger id="serviceType" className="w-full" aria-invalid={Boolean(errors.serviceType)}>
            <SelectValue placeholder="Selecione o serviço" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_TYPES.map((service) => (
              <SelectItem key={service} value={service}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.serviceType && <p className="text-xs text-destructive">{errors.serviceType}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex min-w-0 flex-col gap-1.5">
          <Label htmlFor="date">Data</Label>
          <DatePickerField
            id="date"
            value={form.date}
            onChange={(value) => updateField("date", value)}
            invalid={Boolean(errors.date)}
          />
          {errors.date && <p className="text-xs text-destructive">{errors.date}</p>}
        </div>
        <div className="flex min-w-0 flex-col gap-1.5">
          <Label htmlFor="time">Horário</Label>
          <TimePickerField
            id="time"
            value={form.time}
            onChange={(value) => updateField("time", value)}
            invalid={Boolean(errors.time)}
          />
          {errors.time && <p className="text-xs text-destructive">{errors.time}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="client">Cliente</Label>
        <Input
          id="client"
          value={form.client}
          onChange={(event) => updateField("client", event.target.value)}
          placeholder="Nome do cliente"
          aria-invalid={Boolean(errors.client)}
        />
        {errors.client && <p className="text-xs text-destructive">{errors.client}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="assignee">Responsável</Label>
        <Select value={form.assignee} onValueChange={(value) => updateField("assignee", value)}>
          <SelectTrigger id="assignee" className="w-full" aria-invalid={Boolean(errors.assignee)}>
            <SelectValue placeholder="Selecione o responsável" />
          </SelectTrigger>
          <SelectContent>
            {ASSIGNEES.map((assignee) => (
              <SelectItem key={assignee} value={assignee}>
                {assignee}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.assignee && <p className="text-xs text-destructive">{errors.assignee}</p>}
      </div>

      <div className="flex flex-col gap-1.5 border-t border-border/60 pt-4">
        <Label htmlFor="notes">Observações (opcional)</Label>
        <Input
          id="notes"
          value={form.notes}
          onChange={(event) => updateField("notes", event.target.value)}
          placeholder="Detalhes adicionais"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="address">Endereço (opcional)</Label>
        <Input
          id="address"
          value={form.address}
          onChange={(event) => updateField("address", event.target.value)}
          placeholder="Rua, número, bairro"
        />
      </div>
    </form>
  );
}
