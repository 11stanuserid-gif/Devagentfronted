"use client";

import { create } from "zustand";
import { createProject, getProjects } from "@/services/api/projects";
import { getTasks, searchMemory } from "@/services/api/tasks";
import type { Deployment, FileNode, MemoryEntry, Project, Task, TerminalLine } from "@/types";
import { mockDeployments, mockMemory, mockProjects, mockTasks, mockTerminalLines } from "@/utils/mock-data";

const defaultTree: FileNode[] = [
  {
    id: "folder-1",
    name: "src",
    type: "folder",
    path: "/src",
    children: [
      {
        id: "file-1",
        name: "app.tsx",
        type: "file",
        path: "/src/app.tsx",
        language: "typescript",
        content: "export default function App() {\n  return <div>DevFlow AI</div>;\n}"
      },
      {
        id: "file-2",
        name: "socket.ts",
        type: "file",
        path: "/src/socket.ts",
        language: "typescript",
        content: "import { io } from 'socket.io-client';\nexport const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);"
      }
    ]
  }
];

interface ProjectState {
  projects: Project[];
  selectedProjectId: string | null;
  fileTree: FileNode[];
  openFiles: FileNode[];
  tasks: Task[];
  terminalLines: TerminalLine[];
  memoryEntries: MemoryEntry[];
  deployments: Deployment[];
  loading: boolean;
  loadWorkspace: (token?: string | null) => Promise<void>;
  selectProject: (projectId: string) => void;
  createNewProject: (payload: Partial<Project>, token?: string | null) => Promise<void>;
  openFile: (file: FileNode) => void;
  updateFileContent: (fileId: string, content: string) => void;
  addFile: (name: string) => void;
  renameFile: (fileId: string, name: string) => void;
  deleteFile: (fileId: string) => void;
  appendTerminalLine: (line: TerminalLine) => void;
  searchMemoryEntries: (query: string, token?: string | null) => Promise<void>;
  updateTaskStatus: (taskId: string, status: Task["status"]) => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: mockProjects,
  selectedProjectId: mockProjects[0]?.id ?? null,
  fileTree: defaultTree,
  openFiles: defaultTree[0]?.children?.filter((node) => node.type === "file") ?? [],
  tasks: mockTasks,
  terminalLines: mockTerminalLines,
  memoryEntries: mockMemory,
  deployments: mockDeployments,
  loading: false,
  loadWorkspace: async (token) => {
    set({ loading: true });
    try {
      const [projects, tasks] = await Promise.all([getProjects(token), getTasks(token)]);
      set({
        projects: projects.length ? projects : mockProjects,
        selectedProjectId: projects[0]?.id ?? mockProjects[0]?.id ?? null,
        tasks: tasks.length ? tasks : mockTasks,
        loading: false
      });
    } catch {
      set({ loading: false, projects: mockProjects, tasks: mockTasks });
    }
  },
  selectProject: (selectedProjectId) => set({ selectedProjectId }),
  createNewProject: async (payload, token) => {
    try {
      const project = await createProject(payload, token);
      set((state) => ({ projects: [project, ...state.projects], selectedProjectId: project.id }));
    } catch {
      const fallback: Project = {
        id: crypto.randomUUID(),
        name: payload.name ?? "Untitled project",
        description: payload.description,
        repositoryUrl: payload.repositoryUrl,
        updatedAt: new Date().toISOString(),
        environmentCount: 0,
        deployments: 0
      };
      set((state) => ({ projects: [fallback, ...state.projects], selectedProjectId: fallback.id }));
    }
  },
  openFile: (file) => set((state) => ({
    openFiles: state.openFiles.some((openFile) => openFile.id === file.id) ? state.openFiles : [...state.openFiles, file]
  })),
  updateFileContent: (fileId, content) => set((state) => ({
    openFiles: state.openFiles.map((file) => (file.id === fileId ? { ...file, content } : file)),
    fileTree: state.fileTree.map((node) => ({
      ...node,
      children: node.children?.map((child) => (child.id === fileId ? { ...child, content } : child))
    }))
  })),
  addFile: (name) => set((state) => {
    const fileName = name.endsWith(".tsx") || name.endsWith(".ts") || name.endsWith(".js") || name.endsWith(".md") ? name : `${name}.ts`;
    const newFile: FileNode = {
      id: crypto.randomUUID(),
      name: fileName,
      type: "file",
      path: `/src/${fileName}`,
      language: "typescript",
      content: "// New file\n"
    };

    return {
      fileTree: state.fileTree.map((node) =>
        node.id === "folder-1" ? { ...node, children: [...(node.children ?? []), newFile] } : node
      ),
      openFiles: [...state.openFiles, newFile]
    };
  }),
  renameFile: (fileId, name) => set((state) => ({
    openFiles: state.openFiles.map((file) => (file.id === fileId ? { ...file, name, path: `/src/${name}` } : file)),
    fileTree: state.fileTree.map((node) => ({
      ...node,
      children: node.children?.map((child) => (child.id === fileId ? { ...child, name, path: `/src/${name}` } : child))
    }))
  })),
  deleteFile: (fileId) => set((state) => ({
    openFiles: state.openFiles.filter((file) => file.id !== fileId),
    fileTree: state.fileTree.map((node) => ({
      ...node,
      children: node.children?.filter((child) => child.id !== fileId)
    }))
  })),
  appendTerminalLine: (line) => set((state) => ({ terminalLines: [...state.terminalLines, line] })),
  searchMemoryEntries: async (query, token) => {
    try {
      const memoryEntries = await searchMemory(query, token);
      set({ memoryEntries: memoryEntries.length ? memoryEntries : mockMemory });
    } catch {
      set({ memoryEntries: mockMemory });
    }
  },
  updateTaskStatus: (taskId, status) => set((state) => ({
    tasks: state.tasks.map((task) => (task.id === taskId ? { ...task, status } : task))
  }))
}));
