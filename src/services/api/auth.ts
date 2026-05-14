import { apiRequest } from "./client";
import type { AuthPayload, AuthSession } from "@/types";

export function login(payload: AuthPayload) {
  return apiRequest<AuthSession>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function register(payload: AuthPayload) {
  return apiRequest<AuthSession>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
