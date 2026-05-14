import { apiRequest } from "./client";

export interface HealthResponse {
  success?: boolean;
  status?: string;
  error?: string;
}

export function getHealth() {
  return apiRequest<HealthResponse>("/health");
}
