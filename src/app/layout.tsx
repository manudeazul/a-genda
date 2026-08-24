import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";
import { AppointmentsProvider } from "@/contexts/appointments-context";
import { Toaster } from "@/components/ui/sonner";
import { OnboardingController } from "@/components/onboarding/onboarding-controller";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "a-genda | Agendamento de serviços",
  description: "Visualize e gerencie os serviços agendados da sua equipe.",
};

// Evita flash de tema errado: aplica a classe "dark" antes da hidratação do React.
const themeInitScript = `
  try {
    var stored = localStorage.getItem("a-genda:theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = stored || (prefersDark ? "dark" : "light");
    if (theme === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${poppins.variable} ${geistMono.variable} h-full overflow-x-hidden antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="h-dvh flex flex-col overflow-hidden bg-background text-foreground">
        <ThemeProvider>
          <AppointmentsProvider>
            {children}
            <Toaster position="top-right" />
            <OnboardingController />
          </AppointmentsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
