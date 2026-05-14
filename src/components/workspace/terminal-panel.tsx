"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, TerminalSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProjectStore } from "@/store/project-store";
import { useAuthStore } from "@/store/auth-store";
import { useTerminal } from "@/hooks/use-terminal";
import { cn } from "@/lib/utils";

export function TerminalPanel() {
  const [command, setCommand] = useState("");
  const terminalLines = useProjectStore((state) => state.terminalLines);
  const token = useAuthStore((state) => state.session?.token);
  const { runCommand, running } = useTerminal(token);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const suggestions = useMemo(() => ["npm run build", "pnpm lint", "git status", "docker logs app"], []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLines.length]);

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader>
        <CardTitle>Realtime Terminal</CardTitle>
      </CardHeader>
      <CardContent className="flex h-[400px] flex-col gap-4">
        <div className="flex-1 overflow-y-auto rounded-2xl border border-slate-800/80 bg-black/70 p-4 font-mono text-sm">
          {terminalLines.map((line) => (
            <div key={line.id} className={cn("mb-2 whitespace-pre-wrap", line.type === "stderr" ? "text-rose-300" : line.type === "command" ? "text-cyan-200" : "text-slate-300")}>
              {line.type === "command" ? "$ " : ""}
              {line.content}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button key={suggestion} onClick={() => setCommand(suggestion)} className="rounded-full border border-slate-800/80 bg-slate-950/60 px-3 py-1 text-xs text-slate-400 transition hover:border-violet-400/40 hover:text-white">
              {suggestion}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <Input value={command} onChange={(event) => setCommand(event.target.value)} placeholder="Run command with AI-synced terminal output" onKeyDown={(event) => {
            if (event.key === "Enter") {
              void runCommand(command);
              setCommand("");
            }
          }} />
          <Button onClick={() => { void runCommand(command); setCommand(""); }} disabled={running || !command.trim()}>
            <TerminalSquare className="h-4 w-4" />
            {running ? "Running" : "Execute"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
