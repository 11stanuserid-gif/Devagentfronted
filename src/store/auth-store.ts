"use client";

import { create } from "zustand";
import type { AuthPayload, AuthSession } from "@/types";
import * as authApi from "@/services/api/auth";

interface AuthState {
  session: AuthSession | null;
  loading: boolean;
  error: string | null;
  setSession: (session: AuthSession | null) => void;
  login: (payload: AuthPayload) => Promise<void>;
  register: (payload: AuthPayload) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  loading: false,
  error: null,
  setSession: (session) => set({ session }),
  login: async (payload) => {
    set({ loading: true, error: null });
    try {
      const session = await authApi.login(payload);
      document.cookie = `devflow_token=${session.token}; path=/; max-age=${60 * 60 * 24 * 7}`;
      set({ session, loading: false });
    } catch (error) {
      set({ loading: false, error: error instanceof Error ? error.message : "Login failed" });
      throw error;
    }
  },
  register: async (payload) => {
    set({ loading: true, error: null });
    try {
      const session = await authApi.register(payload);
      document.cookie = `devflow_token=${session.token}; path=/; max-age=${60 * 60 * 24 * 7}`;
      set({ session, loading: false });
    } catch (error) {
      set({ loading: false, error: error instanceof Error ? error.message : "Register failed" });
      throw error;
    }
  },
  logout: () => {
    document.cookie = "devflow_token=; path=/; max-age=0";
    set({ session: null });
  }
}));
