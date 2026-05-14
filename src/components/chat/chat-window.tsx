"use client";

import { useEffect, useMemo, useRef } from "react";
import { AlertTriangle, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "@/components/chat/message-bubble";
import { Skeleton } from "@/components/ui/skeleton";
import { useChatStore } from "@/store/chat-store";

export function ChatWindow() {
  const chats = useChatStore((state) => state.chats);
  const activeChatId = useChatStore((state) => state.activeChatId);
  const loading = useChatStore((state) => state.loading);
  const error = useChatStore((state) => state.error);
  const streaming = useChatStore((state) => state.streaming);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const activeChat = useMemo(() => chats.find((chat) => chat.id === activeChatId), [activeChatId, chats]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages.length, streaming]);

  if (loading) {
    return (
      <div className="flex h-full flex-col gap-4 p-6">
        <Skeleton className="h-24 w-2/3" />
        <Skeleton className="h-32 w-1/2 self-end" />
        <Skeleton className="h-44 w-3/4" />
      </div>
    );
  }

  if (!activeChat) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-slate-400">
        <div className="rounded-full border border-violet-500/30 bg-violet-500/10 p-4">
          <Sparkles className="h-8 w-8 text-violet-200" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Start a new developer conversation</h3>
          <p className="max-w-xl text-sm">Ask DevFlow AI to review architecture, edit code, search project memory, or orchestrate tasks across agents.</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full px-4 py-5 md:px-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-5">
        {error && (
          <div className="flex items-center gap-3 rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            <AlertTriangle className="h-4 w-4" />
            {error}
          </div>
        )}
        {activeChat.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {streaming && (
          <div className="flex items-center gap-3 text-sm text-cyan-300">
            <div className="flex gap-1">
              <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300 [animation-delay:-0.3s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300 [animation-delay:-0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300" />
            </div>
            DevFlow is streaming a response
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
