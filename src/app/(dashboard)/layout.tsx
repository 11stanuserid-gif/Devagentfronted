"use client";

import { useEffect, useState } from "react";
import { Menu, PanelRightClose, PanelLeftClose } from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { RightPanel } from "@/components/layout/right-panel";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/app-store";
import { useChatStore } from "@/store/chat-store";
import { useProjectStore } from "@/store/project-store";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { leftSidebarOpen, rightSidebarOpen, toggleLeftSidebar, toggleRightSidebar } = useAppStore();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const token = useAuthStore((state) => state.session?.token);
  const loadChats = useChatStore((state) => state.loadChats);
  const loadWorkspace = useProjectStore((state) => state.loadWorkspace);

  useEffect(() => {
    void loadChats(token);
    void loadWorkspace(token);
  }, [loadChats, loadWorkspace, token]);

  return (
    <div className="h-screen overflow-hidden p-3 md:p-4">
      <div className="grid h-full gap-4 xl:grid-cols-[280px_minmax(0,1fr)_340px]">
        <div className={cn("hidden h-full xl:block", !leftSidebarOpen && "xl:hidden")}>
          <Sidebar />
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <div className="glass flex items-center justify-between rounded-3xl px-4 py-3">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="xl:hidden" onClick={() => setMobileSidebarOpen((value) => !value)}>
                <Menu className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden xl:inline-flex" onClick={toggleLeftSidebar}>
                <PanelLeftClose className="h-4 w-4" />
              </Button>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-violet-200/70">Workspace</p>
                <h2 className="text-lg font-semibold text-white">Realtime AI Developer OS</h2>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleRightSidebar}>
              <PanelRightClose className="h-4 w-4" />
            </Button>
          </div>
          <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
        </div>

        <div className={cn("hidden h-full xl:block", !rightSidebarOpen && "xl:hidden")}>
          <RightPanel />
        </div>
      </div>

      {mobileSidebarOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/70 p-4 xl:hidden" onClick={() => setMobileSidebarOpen(false)}>
          <div className="h-full max-w-xs" onClick={(event) => event.stopPropagation()}>
            <Sidebar />
          </div>
        </div>
      ) : null}
    </div>
  );
}
