export interface Project {
  id: string;
  name: string;
  description?: string;
  repositoryUrl?: string;
  updatedAt: string;
  environmentCount: number;
  deployments: number;
}

export interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  path: string;
  language?: string;
  children?: FileNode[];
  content?: string;
}

export interface Deployment {
  id: string;
  environment: string;
  status: "queued" | "building" | "ready" | "failed";
  branch: string;
  commitSha: string;
  createdAt: string;
}

export interface MemoryEntry {
  id: string;
  title: string;
  category: string;
  snippet: string;
  updatedAt: string;
}
