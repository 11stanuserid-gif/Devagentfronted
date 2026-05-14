"use client";

import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { CodeBlock } from "@/components/chat/code-block";
import { Badge } from "@/components/ui/badge";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { ChatMessage } from "@/types";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isAssistant = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className={cn("flex", isAssistant ? "justify-start" : "justify-end")}
    >
      <div className={cn("max-w-[90%] rounded-3xl border px-5 py-4 shadow-lg md:max-w-[75%]", isAssistant ? "glass border-slate-700/60" : "border-violet-500/30 bg-violet-500/15")}>
        <div className="mb-3 flex items-center gap-2">
          <Badge className={isAssistant ? "border-cyan-400/30 text-cyan-200" : "border-violet-400/30 text-violet-100"}>
            {isAssistant ? "AI" : "You"}
          </Badge>
          <span className="text-xs text-slate-500">{formatRelativeTime(message.createdAt)}</span>
          {message.status === "streaming" && <span className="text-xs text-cyan-300">streaming…</span>}
        </div>
        <div className="markdown-body prose prose-invert max-w-none text-sm leading-7 prose-pre:p-0 prose-code:text-violet-200">
          <ReactMarkdown
            components={{
              code(props) {
                const { className, children } = props;
                const match = /language-(\w+)/.exec(className || "");
                const value = String(children).replace(/\n$/, "");
                if (match) {
                  return <CodeBlock language={match[1]} value={value} />;
                }
                return <code className="rounded bg-slate-900 px-1.5 py-1 text-xs text-violet-200">{children}</code>;
              }
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}
