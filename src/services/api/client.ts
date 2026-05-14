import { env } from "@/config/env";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

interface RequestConfig extends RequestInit {
  token?: string | null;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new ApiError(data?.error || data?.message || "Request failed", response.status);
  }

  return data as T;
}

export async function apiRequest<T>(path: string, config: RequestConfig = {}): Promise<T> {
  const { token, headers, ...rest } = config;

  const response = await fetch(`${env.apiUrl}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers
    },
    cache: "no-store"
  });

  return parseResponse<T>(response);
}
