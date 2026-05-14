import { apiRequest } from "./client";
import type { Project } from "@/types";

export function getProjects(token?: string | null) {
  return apiRequest<Project[]>("/projects", { token });
}

export function createProject(payload: Partial<Project>, token?: string | null) {
  return apiRequest<Project>("/projects", {
    method: "POST",
    token,
    body: JSON.stringify(payload)
  });
}
