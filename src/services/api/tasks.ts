import { apiRequest } from "./client";
import type { MemoryEntry, Task, TerminalLine } from "@/types";

export function getTasks(token?: string | null) {
  return apiRequest<Task[]>("/tasks", { token });
}

export function executeTerminalCommand(payload: { command: string; projectId?: string }, token?: string | null) {
  return apiRequest<{ accepted: boolean; output?: TerminalLine[] }>("/terminal/execute", {
    method: "POST",
    token,
    body: JSON.stringify(payload)
  });
}

export function searchMemory(query: string, token?: string | null) {
  return apiRequest<MemoryEntry[]>(`/memory/search?query=${encodeURIComponent(query)}`, { token });
}
