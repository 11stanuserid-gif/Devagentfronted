"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { useSocketEvents } from "@/hooks/use-socket-events";

function SocketBootstrap() {
  useSocketEvents();
  return null;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      <SocketBootstrap />
      {children}
      <Toaster richColors theme="dark" position="top-right" />
    </ThemeProvider>
  );
}
