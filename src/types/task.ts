export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  assignee?: string;
  milestone?: string;
}

export interface AgentLog {
  id: string;
  agent: string;
  message: string;
  level: "info" | "success" | "warning" | "error";
  createdAt: string;
}

export interface TerminalLine {
  id: string;
  type: "command" | "stdout" | "stderr";
  content: string;
  createdAt: string;
}
