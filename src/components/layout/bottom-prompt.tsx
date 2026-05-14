"use client";

import { useRef, useState } from "react";
import { Mic, Paperclip, SendHorizonal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChatStore } from "@/store/chat-store";
import { useProjectStore } from "@/store/project-store";
import { useAuthStore } from "@/store/auth-store";

export function BottomPrompt() {
  const [value, setValue] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const submitMessage = useChatStore((state) => state.submitMessage);
  const streaming = useChatStore((state) => state.streaming);
  const projectId = useProjectStore((state) => state.selectedProjectId);
  const token = useAuthStore((state) => state.session?.token);

  const handleSubmit = async () => {
    if (!value.trim() || streaming) return;
    await submitMessage(value, token, projectId ?? undefined);
    setValue("");
  };

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
      }}
      className={`glass relative rounded-3xl border p-3 transition ${dragging ? "border-violet-400/60 bg-violet-500/10" : "border-slate-800/90"}`}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Sparkles className="h-4 w-4 text-violet-200" />
          Prompt DevFlow AI
        </div>
        <div className="text-xs text-slate-500">Shift + Enter for a new line</div>
      </div>

      <Textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            void handleSubmit();
          }
        }}
        placeholder="Ask for code generation, terminal help, memory recall, project planning, deployment analysis…"
        className="min-h-[110px] border-transparent bg-transparent shadow-none focus:border-violet-400/20"
      />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => inputRef.current?.click()}>
            <Paperclip className="h-4 w-4" />
            Upload
          </Button>
          <input ref={inputRef} type="file" className="hidden" multiple />
          <Button variant="ghost" size="sm">
            <Mic className="h-4 w-4" />
            Voice
          </Button>
        </div>
        <Button onClick={() => void handleSubmit()} disabled={!value.trim() || streaming}>
          <SendHorizonal className="h-4 w-4" />
          {streaming ? "Streaming..." : "Send"}
        </Button>
      </div>
    </div>
  );
}
