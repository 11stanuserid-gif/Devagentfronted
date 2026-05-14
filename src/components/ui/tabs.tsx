"use client";

import { cn } from "@/lib/utils";

export function Tabs({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("flex flex-col gap-3", className)}>{children}</div>;
}

export function TabsList({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("inline-flex rounded-2xl border border-slate-800/80 bg-slate-950/70 p-1", className)}>{children}</div>;
}

export function TabsTrigger({ className, active, onClick, children }: { className?: string; active?: boolean; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-xl px-3 py-2 text-sm transition-colors",
        active ? "bg-violet-500/20 text-white" : "text-slate-400 hover:text-white",
        className
      )}
    >
      {children}
    </button>
  );
}
