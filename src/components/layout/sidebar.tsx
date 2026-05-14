"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Bot, BrainCircuit, FolderGit2, LayoutGrid, Pencil, Plus, Rocket, Search, Settings, MessagesSquare, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useChatStore } from "@/store/chat-store";
import { useProjectStore } from "@/store/project-store";
import { cn, formatRelativeTime, truncate } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: MessagesSquare, label: "Chats" },
  { href: "/projects", icon: FolderGit2, label: "Projects" },
  { href: "/dashboard", icon: Bot, label: "Agents" },
  { href: "/dashboard", icon: BrainCircuit, label: "Memory" },
  { href: "/dashboard", icon: Rocket, label: "Deployments" },
  { href: "/settings", icon: Settings, label: "Settings" }
];

export function Sidebar() {
  const chats = useChatStore((state) => state.chats);
  const activeChatId = useChatStore((state) => state.activeChatId);
  const setActiveChat = useChatStore((state) => state.setActiveChat);
  const startNewChat = useChatStore((state) => state.startNewChat);
  const deleteChat = useChatStore((state) => state.deleteChat);
  const renameChat = useChatStore((state) => state.renameChat);
  const projects = useProjectStore((state) => state.projects);
  const selectedProjectId = useProjectStore((state) => state.selectedProjectId);
  const selectProject = useProjectStore((state) => state.selectProject);
  const [query, setQuery] = useState("");

  const filteredChats = useMemo(
    () => chats.filter((chat) => chat.title.toLowerCase().includes(query.toLowerCase())),
    [chats, query]
  );

  return (
    <aside className="glass glow-border flex h-full w-full flex-col rounded-3xl p-4">
      <div className="flex items-center justify-between gap-3 px-1 py-2">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-violet-200/70">DevFlow AI</p>
          <h1 className="text-xl font-semibold text-white">Operating System</h1>
        </div>
        <LayoutGrid className="h-5 w-5 text-violet-200" />
      </div>

      <Button className="mt-4 w-full justify-start" onClick={startNewChat}>
        <Plus className="h-4 w-4" />
        New Chat
      </Button>

      <nav className="mt-5 grid gap-1">
        {navItems.map((item) => (
          <Link key={item.label} href={item.href} className="flex items-center gap-3 rounded-2xl px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-900/60 hover:text-white">
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      <Separator className="my-5" />

      <div className="space-y-2">
        <p className="px-1 text-xs uppercase tracking-[0.3em] text-slate-500">Projects</p>
        <div className="space-y-1">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => selectProject(project.id)}
              className={cn(
                "w-full rounded-2xl border px-3 py-2 text-left transition",
                selectedProjectId === project.id
                  ? "border-violet-500/40 bg-violet-500/10 text-white"
                  : "border-transparent bg-transparent text-slate-400 hover:border-slate-800/70 hover:bg-slate-900/60 hover:text-white"
              )}
            >
              <div className="text-sm font-medium">{project.name}</div>
              <div className="text-xs text-slate-500">{truncate(project.description ?? "No description", 38)}</div>
            </button>
          ))}
        </div>
      </div>

      <Separator className="my-5" />

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9" placeholder="Search chats" />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        <p className="mb-2 px-1 text-xs uppercase tracking-[0.3em] text-slate-500">History</p>
        <div className="space-y-2 overflow-y-auto pr-1">
          {filteredChats.map((chat) => (
            <motion.button
              key={chat.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setActiveChat(chat.id)}
              className={cn(
                "group w-full rounded-2xl border px-3 py-3 text-left transition",
                activeChatId === chat.id
                  ? "border-cyan-400/30 bg-cyan-400/10"
                  : "border-transparent bg-transparent hover:border-slate-800/80 hover:bg-slate-900/60"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-white">{truncate(chat.title, 28)}</div>
                  <div className="mt-1 text-xs text-slate-500">{formatRelativeTime(chat.updatedAt)}</div>
                </div>
                <div className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
                  <span
                    onClick={(event) => {
                      event.stopPropagation();
                      const title = window.prompt("Rename chat", chat.title);
                      if (title) renameChat(chat.id, title);
                    }}
                    className="rounded-lg p-1 text-slate-500 transition hover:bg-slate-800/90"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </span>
                  <span
                    onClick={(event) => {
                      event.stopPropagation();
                      deleteChat(chat.id);
                    }}
                    className="rounded-lg p-1 text-slate-500 transition hover:bg-slate-800/90"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </aside>
  );
}
