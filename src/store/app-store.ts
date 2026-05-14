"use client";

import { create } from "zustand";

interface AppState {
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  bottomPanelOpen: boolean;
  activeWorkspace: "chat" | "editor" | "terminal" | "tasks" | "deployments";
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  toggleBottomPanel: () => void;
  setActiveWorkspace: (workspace: AppState["activeWorkspace"]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  leftSidebarOpen: true,
  rightSidebarOpen: true,
  bottomPanelOpen: true,
  activeWorkspace: "chat",
  toggleLeftSidebar: () => set((state) => ({ leftSidebarOpen: !state.leftSidebarOpen })),
  toggleRightSidebar: () => set((state) => ({ rightSidebarOpen: !state.rightSidebarOpen })),
  toggleBottomPanel: () => set((state) => ({ bottomPanelOpen: !state.bottomPanelOpen })),
  setActiveWorkspace: (activeWorkspace) => set({ activeWorkspace })
}));
