# a-genda

Sistema de agendamento de serviços — desafio técnico frontend em Next.js, React e TypeScript.

🔗 **Aplicação publicada:** [adicionar link da Vercel aqui]
🔗 **Repositório:** [adicionar link do repositório aqui]

## Como rodar o projeto

Pré-requisitos: Node.js 18+ e npm.

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). Os dados são todos mockados localmente (`src/lib/mock-data.ts`) — não há backend nem variáveis de ambiente necessárias.

Outros scripts disponíveis:

```bash
npm run build   # build de produção
npm run start   # roda o build de produção localmente
npm run lint    # eslint
```

## Tecnologias utilizadas

- **[Next.js](https://nextjs.org/) 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** para estilização
- **[shadcn/ui](https://ui.shadcn.com/)** como base de componentes (Radix UI por baixo) — os componentes gerados vivem em `src/components/ui/` e foram customizados para a paleta e o tema do projeto
- **[vaul](https://vaul.emilkowal.ski/)** para o drawer lateral de criação de agendamento
- **[react-day-picker](https://daypicker.dev/)** + **date-fns** (locale pt-BR) para o seletor de data/calendário
- **[sonner](https://sonner.emilkowal.ski/)** para toasts de feedback
- **lucide-react** para ícones

Nenhum backend, autenticação ou banco de dados.

## Decisões de design e UX

- **Paleta de marca própria** (`#253031`, `#315659`, `#2978a0`, `#bcab79`, `#c6e0ff`) aplicada via CSS variables em `src/app/globals.css`, com temas claro e escuro completos (incluindo `color-scheme` para os controles nativos do navegador — ex.: ícone do seletor de horário — seguirem o tema automaticamente).
- **Fonte Poppins**, carregada via `next/font/google`.
- **Agenda como calendário**: a tela principal mostra uma visão de **semana** no desktop/tablet (colunas por dia) e uma visão de **um dia por vez** no mobile, ambas navegáveis (setas, botão "Hoje" e um seletor de data via popover). A quantidade de dias visíveis no desktop se adapta ao tamanho da tela (7 → 5 → 3 dias), e a navegação avança sempre pela quantidade de dias exibida.
- **Status editável direto no card e no modal** (`StatusPicker`), com um indicador visual que **pulsa em vermelho quando o agendamento está atrasado** (horário já passou e o status continua "Agendado") — um alerta discreto, sem poluir a interface.
- **Ações de endereço**: quando o agendamento tem endereço, é possível copiá-lo ou abrir direto no Google Maps.
- **Estados de interface**: skeleton loading, empty state (com atalho para criar um agendamento direto dali), filtro por status/responsável/busca por texto, e um botão de limpar filtros.
- **Responsividade pensada, não só encolhida**: no mobile, a barra de filtros colapsa em um ícone com popover, o "Novo agendamento" abre como drawer lateral (mesmo formulário do desktop) e a agenda muda de "semana em colunas" para "um dia por vez em cards".
- **Modo claro/escuro completo**: todos os componentes consomem as mesmas variáveis de tema (`src/app/globals.css`) em vez de cores fixas, então a troca entre claro e escuro é automática em qualquer tela — nenhum componente precisou de uma versão separada para cada modo.

## Estrutura do projeto

```
src/
  app/                    # rotas (App Router) — layout raiz e a página única da agenda
  components/
    ui/                   # componentes base gerados via shadcn/ui (Button, Select, Dialog, Drawer...)
    layout/                # cabeçalho, logo, toggle de tema
    agenda/                 # peças reutilizáveis de UI da agenda (badge/dot de status, empty state, filtro...)
    calendar/               # visão de semana, visão de dia, navegação de calendário, card de agendamento
    appointment-form/       # formulário de novo agendamento, drawer, modal de detalhes, seletor de data
  contexts/                # estado global via Context + useReducer (agendamentos e tema)
  hooks/                   # hooks que consomem os contexts + hook de responsividade
  lib/                     # tipos, dados mockados, filtros, formatação de data/status (sem UI)
```

A separação segue um critério simples: `lib/` não conhece React; `contexts/`+`hooks/` guardam estado; `components/ui/` é infraestrutura visual genérica; os demais componentes são compostos a partir dela e do estado, sempre reaproveitando peças já existentes em vez de duplicar (ex.: o mesmo card de agendamento é usado na semana e no dia único; o mesmo `NewAppointmentDialog` é reaproveitado no cabeçalho, no botão "+" de cada coluna e no empty state).

## O que eu faria diferente ou melhoraria com mais tempo

- **Persistência real**: hoje o estado vive só em memória (Context) — um próximo passo natural seria `localStorage` ou um backend de verdade.
- **Testes automatizados**: não há testes unitários/E2E; com mais tempo cobriria os filtros, a lógica de data (`lib/date.ts`, `lib/filters.ts`) e os fluxos de criação/edição de status.
- **Drag and drop entre datas e horários**: arrastar um card direto na visão de semana para reagendá-lo, em vez de precisar abrir o formulário.
- **Formulário com verificação de disponibilidade**: ao escolher data/horário, o formulário poderia consultar a agenda em tempo real, sinalizar conflitos e sugerir os próximos horários livres do responsável selecionado, em vez de aceitar qualquer combinação.
- **Integração com o Google Agenda**: sincronização bidirecional dos agendamentos com uma conta Google, para quem já vive dentro do calendário do Google no dia a dia.
- **Teste de estresse de UI**: validar como cada componente se comporta sob volume alto de dados — muitos agendamentos no mesmo dia, nomes muito longos, muitos dias visíveis ao mesmo tempo — para garantir que a interface degrada bem (com scroll, truncamento, paginação) em vez de quebrar o layout.