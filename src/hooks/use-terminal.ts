"use client";

import { useState } from "react";
import { executeTerminalCommand } from "@/services/api/tasks";
import { useProjectStore } from "@/store/project-store";

export function useTerminal(token?: string | null) {
  const [running, setRunning] = useState(false);
  const appendTerminalLine = useProjectStore((state) => state.appendTerminalLine);
  const selectedProjectId = useProjectStore((state) => state.selectedProjectId);

  const runCommand = async (command: string) => {
    if (!command.trim()) return;
    setRunning(true);
    appendTerminalLine({
      id: crypto.randomUUID(),
      type: "command",
      content: command,
      createdAt: new Date().toISOString()
    });

    try {
      const response = await executeTerminalCommand({ command, projectId: selectedProjectId ?? undefined }, token);
      response.output?.forEach((line) => appendTerminalLine(line));
    } catch (error) {
      appendTerminalLine({
        id: crypto.randomUUID(),
        type: "stderr",
        content: error instanceof Error ? error.message : "Command execution failed",
        createdAt: new Date().toISOString()
      });
    } finally {
      setRunning(false);
    }
  };

  return { runCommand, running };
}
