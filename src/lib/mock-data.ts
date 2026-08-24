import { addDays, toISODate } from "@/lib/date";

import type { Appointment } from "@/lib/types";

// Datas relativas a "hoje" para que a agenda sempre pareça atual ao rodar a demo.
function isoDateOffset(days: number): string {
  return toISODate(addDays(new Date(), days));
}

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    client: "Samarco Mineração",
    description:
      "Análise de vibração em motores e redutores da linha de beneficiamento",
    serviceType: "Análise de Vibração",
    date: isoDateOffset(0),
    time: "08:00",
    assignee: "Rafael Mendes",
    status: "in-progress",
    address: "Unidade Industrial - Anchieta/ES",
    notes:
      "Priorizar os ativos críticos da linha 03 e registrar medições no sistema.",
    createdAt: new Date().toISOString(),
  },

  {
    id: "2",
    client: "ArcelorMittal Brasil",
    description:
      "Coleta de amostras e avaliação da condição do óleo de redutores",
    serviceType: "Análise de Óleo",
    date: isoDateOffset(0),
    time: "08:30",
    assignee: "Camila Rodrigues",
    status: "scheduled",
    address: "Planta Industrial - Serra/ES",
    notes:
      "Coletar amostras dos equipamentos identificados no plano de lubrificação.",
    createdAt: new Date().toISOString(),
  },

  {
    id: "3",
    client: "Suzano Papel e Celulose",
    description:
      "Inspeção termográfica em painéis elétricos e equipamentos rotativos",
    serviceType: "Termografia",
    date: isoDateOffset(0),
    time: "14:00",
    assignee: "André Oliveira",
    status: "scheduled",
    address: "Unidade Industrial - Aracruz/ES",
    createdAt: new Date().toISOString(),
  },

  {
    id: "4",
    client: "Vale S.A.",
    description:
      "Implantação de plano de gestão da lubrificação para ativos críticos",
    serviceType: "Gestão da Lubrificação",
    date: isoDateOffset(1),
    time: "08:30",
    assignee: "Marcos Ferreira",
    status: "scheduled",
    address: "Complexo Industrial - Vitória/ES",
    notes:
      "Mapear pontos críticos, revisar lubrificantes utilizados e validar periodicidades.",
    createdAt: new Date().toISOString(),
  },

  {
    id: "5",
    client: "Petrobras",
    description:
      "Inspeção ultrassônica para identificação de vazamentos em sistemas industriais",
    serviceType: "Ultrassom",
    date: isoDateOffset(-1),
    time: "09:00",
    assignee: "Camila Rodrigues",
    status: "done",
    address: "Unidade Operacional - São José dos Campos/SP",
    notes:
      "Relatório técnico entregue ao responsável pela manutenção.",
    createdAt: new Date().toISOString(),
  },

  {
    id: "6",
    client: "Braskem",
    description:
      "Filtragem e purificação do óleo hidráulico de equipamentos críticos",
    serviceType: "Filtragem de Óleo",
    date: isoDateOffset(-2),
    time: "13:30",
    assignee: "Rafael Mendes",
    status: "done",
    address: "Complexo Petroquímico - Camaçari/BA",
    notes:
      "Realizada filtragem para remoção de partículas e controle de contaminação.",
    createdAt: new Date().toISOString(),
  },

  {
    id: "7",
    client: "CSN - Companhia Siderúrgica Nacional",
    description:
      "Alinhamento de eixos e balanceamento de conjunto motor-bomba",
    serviceType: "Alinhamento e Balanceamento",
    date: isoDateOffset(1),
    time: "15:00",
    assignee: "André Oliveira",
    status: "scheduled",
    address: "Unidade Industrial - Volta Redonda/RJ",
    notes:
      "Equipamento deverá estar disponível para intervenção no horário programado.",
    createdAt: new Date().toISOString(),
  },

  {
    id: "8",
    client: "Usiminas",
    description:
      "Instalação e configuração de sistema de lubrificação automática",
    serviceType: "Lubrificação Automática",
    date: isoDateOffset(2),
    time: "08:00",
    assignee: "Marcos Ferreira",
    status: "scheduled",
    address: "Planta Industrial - Ipatinga/MG",
    notes:
      "Validar pontos de lubrificação e realizar testes de funcionamento após instalação.",
    createdAt: new Date().toISOString(),
  },

  {
    id: "9",
    client: "Raízen",
    description:
      "Inspeção de condição dos ativos e levantamento de pontos de lubrificação",
    serviceType: "Monitoramento de Condição",
    date: isoDateOffset(2),
    time: "10:30",
    assignee: "Rafael Mendes",
    status: "scheduled",
    address: "Unidade Industrial - Piracicaba/SP",
    createdAt: new Date().toISOString(),
  },

  {
    id: "10",
    client: "Anglo American",
    description:
      "Auditoria das rotinas e procedimentos de lubrificação industrial",
    serviceType: "Auditoria de Lubrificação",
    date: isoDateOffset(-3),
    time: "14:00",
    assignee: "Marcos Ferreira",
    status: "cancelled",
    address: "Unidade Industrial - Conceição do Mato Dentro/MG",
    notes:
      "Auditoria reagendada pelo cliente para a próxima semana.",
    createdAt: new Date().toISOString(),
  },
];

export const SERVICE_TYPES = [
  "Análise de Vibração",
  "Análise de Óleo",
  "Termografia",
  "Gestão da Lubrificação",
  "Ultrassom",
  "Filtragem de Óleo",
  "Alinhamento e Balanceamento",
  "Lubrificação Automática",
  "Monitoramento de Condição",
  "Auditoria de Lubrificação",
];

export const ASSIGNEES = [
  "Rafael Mendes",
  "Camila Rodrigues",
  "André Oliveira",
  "Marcos Ferreira",
];