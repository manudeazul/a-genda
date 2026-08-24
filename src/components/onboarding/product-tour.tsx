"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TourStepDef {
  target: string | null;
  title: string;
  description: string;
}

const STEPS: TourStepDef[] = [
  {
    target: null,
    title: "Sua agenda",
    description: "Aqui você vê os agendamentos da semana (ou de um dia, no celular). Use as setas pra navegar.",
  },
  {
    target: "appointment-card",
    title: "Detalhes do agendamento",
    description: "Clique em qualquer card pra ver os detalhes completos e poder editar data, horário, responsável ou status.",
  },
  {
    target: "new-appointment",
    title: "Novo agendamento",
    description: "Crie um agendamento novo a qualquer momento por aqui.",
  },
  {
    target: "filters",
    title: "Busca e filtros",
    description: "Procure por cliente ou serviço, ou filtre por status e responsável.",
  },
  {
    target: "theme-toggle",
    title: "Modo claro e escuro",
    description: "Troque o tema da aplicação quando quiser.",
  },
];

const CARD_WIDTH = 288;
const CARD_MARGIN = 12;

export function ProductTour({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  useLayoutEffect(() => {
    if (!current.target) {
      setRect(null);
      return;
    }
    const candidates = document.querySelectorAll<HTMLElement>(`[data-tour="${current.target}"]`);
    const el = Array.from(candidates).find((candidate) => candidate.offsetParent !== null) ?? null;
    if (!el) {
      setRect(null);
      return;
    }
    el.scrollIntoView({ block: "center", behavior: "smooth" });

    function measure() {
      if (el) setRect(el.getBoundingClientRect());
    }
    measure();
    const t = setTimeout(measure, 350);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [current.target]);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onDone();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onDone]);

  function next() {
    if (isLast) {
      onDone();
    } else {
      setStep((value) => value + 1);
    }
  }

  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1024;
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 768;

  const cardLeft = rect
    ? Math.min(Math.max(rect.left, CARD_MARGIN), viewportWidth - CARD_WIDTH - CARD_MARGIN)
    : viewportWidth / 2 - CARD_WIDTH / 2;
  const showAbove = rect ? rect.bottom > viewportHeight * 0.62 : false;
  const cardTop = rect
    ? showAbove
      ? Math.max(CARD_MARGIN, rect.top - 190)
      : rect.bottom + CARD_MARGIN
    : viewportHeight / 2 - 90;

  return (
    <>
      <div
        role="presentation"
        aria-label="Pular tour"
        onClick={onDone}
        className="fixed inset-0 z-[95] bg-black/55 transition-opacity duration-300"
      />
      {rect && (
        <div
          aria-hidden
          className="pointer-events-none fixed z-[96] rounded-xl border-2 border-primary shadow-[0_0_0_4px_rgba(0,0,0,0.15)] transition-all duration-300"
          style={{
            left: rect.left - 6,
            top: rect.top - 6,
            width: rect.width + 12,
            height: rect.height + 12,
          }}
        />
      )}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={current.title}
        className="fixed z-[97] flex w-72 flex-col gap-3 rounded-xl bg-popover p-4 text-popover-foreground shadow-lg ring-1 ring-foreground/10 transition-all duration-300"
        style={{ left: cardLeft, top: cardTop }}
      >
        <div className="flex items-start justify-between gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            Passo {step + 1} de {STEPS.length}
          </span>
          <button
            type="button"
            onClick={onDone}
            aria-label="Pular tour"
            className="-m-1 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="size-3.5" />
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-foreground">{current.title}</p>
          <p className="text-sm text-muted-foreground">{current.description}</p>
        </div>
        <div className="flex items-center justify-between gap-2 pt-1">
          <Button variant="ghost" size="sm" onClick={onDone}>
            Pular
          </Button>
          <Button size="sm" onClick={next}>
            {isLast ? "Concluir" : "Próximo"}
          </Button>
        </div>
      </div>
    </>
  );
}
