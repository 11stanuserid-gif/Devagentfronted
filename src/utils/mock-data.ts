import type { AgentLog, Chat, ChatMessage, Deployment, MemoryEntry, Project, Task, TerminalLine } from "@/types";

export const mockProjects: Project[] = [
  {
    id: "proj-1",
    name: "DevFlow OS",
    description: "Realtime AI developer workspace",
    repositoryUrl: "https://github.com/example/devflow",
    updatedAt: new Date().toISOString(),
    environmentCount: 8,
    deployments: 3
  },
  {
    id: "proj-2",
    name: "Agent Mesh",
    description: "Multi-agent automation project",
    repositoryUrl: "https://github.com/example/mesh",
    updatedAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    environmentCount: 4,
    deployments: 1
  }
];

export const mockMessages: ChatMessage[] = [
  {
    id: "msg-1",
    role: "assistant",
    content: "# Welcome to DevFlow AI\n\nYour AI developer operating system is live. Ask for architecture reviews, ship code faster, inspect logs, or coordinate multi-agent workflows.",
    createdAt: new Date().toISOString(),
    status: "done"
  }
];

export const mockChats: Chat[] = [
  {
    id: "chat-1",
    title: "Build frontend shell",
    projectId: "proj-1",
    updatedAt: new Date().toISOString(),
    messages: mockMessages
  },
  {
    id: "chat-2",
    title: "Optimize websocket pipeline",
    projectId: "proj-1",
    updatedAt: new Date(Date.now() - 1000 * 60 * 32).toISOString(),
    messages: []
  }
];

export const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Connect Socket.IO stream events",
    description: "Wire chat:stream, task:update, terminal:output channels",
    status: "in_progress",
    priority: "high",
    assignee: "Realtime Agent",
    milestone: "Core Platform"
  },
  {
    id: "task-2",
    title: "Ship Monaco editor tabs",
    description: "Enable language detection, autosave and AI actions",
    status: "todo",
    priority: "medium",
    assignee: "Workspace Agent",
    milestone: "Core Platform"
  },
  {
    id: "task-3",
    title: "Design deployment dashboard",
    description: "Visualize build logs, environment variables and release history",
    status: "done",
    priority: "low",
    assignee: "Platform Agent",
    milestone: "Release"
  }
];

export const mockLogs: AgentLog[] = [
  {
    id: "log-1",
    agent: "Planner",
    message: "Synthesizing repository structure and feature ownership",
    level: "info",
    createdAt: new Date().toISOString()
  },
  {
    id: "log-2",
    agent: "Coder",
    message: "Streaming Next.js app-router implementation",
    level: "success",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString()
  }
];

export const mockTerminalLines: TerminalLine[] = [
  {
    id: "term-1",
    type: "command",
    content: "pnpm dev",
    createdAt: new Date().toISOString()
  },
  {
    id: "term-2",
    type: "stdout",
    content: "▲ Next.js 15.3.2 ready on http://localhost:3000",
    createdAt: new Date().toISOString()
  }
];

export const mockMemory: MemoryEntry[] = [
  {
    id: "mem-1",
    title: "Socket contract",
    category: "realtime",
    snippet: "chat:stream delivers partial tokens and completion payloads",
    updatedAt: new Date().toISOString()
  },
  {
    id: "mem-2",
    title: "Deployment flow",
    category: "release",
    snippet: "Build, validate, release, monitor, rollback",
    updatedAt: new Date(Date.now() - 1000 * 60 * 11).toISOString()
  }
];

export const mockDeployments: Deployment[] = [
  {
    id: "dep-1",
    environment: "production",
    status: "building",
    branch: "main",
    commitSha: "a12f9d0",
    createdAt: new Date().toISOString()
  },
  {
    id: "dep-2",
    environment: "staging",
    status: "ready",
    branch: "release/ui",
    commitSha: "bf45e21",
    createdAt: new Date(Date.now() - 1000 * 60 * 85).toISOString()
  }
];
