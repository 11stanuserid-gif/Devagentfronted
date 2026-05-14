"use client";

import { useEffect } from "react";
import { getSocket } from "@/services/socket/socket";
import { useChatStore } from "@/store/chat-store";
import { useProjectStore } from "@/store/project-store";
import type { SocketStreamPayload, TerminalLine, WorkflowUpdate } from "@/types";

export function useSocketEvents() {
  const appendStreamChunk = useChatStore((state) => state.appendStreamChunk);
  const appendTerminalLine = useProjectStore((state) => state.appendTerminalLine);
  const updateTaskStatus = useProjectStore((state) => state.updateTaskStatus);

  useEffect(() => {
    const socket = getSocket();

    const handleChatStream = (payload: SocketStreamPayload) => {
      appendStreamChunk(payload.chatId, payload.messageId, payload.delta ?? "", payload.done);
    };

    const handleTerminalOutput = (payload: TerminalLine) => appendTerminalLine(payload);
    const handleTaskUpdate = (payload: WorkflowUpdate & { taskId?: string }) => {
      if (payload.taskId && ["todo", "in_progress", "done"].includes(payload.status)) {
        updateTaskStatus(payload.taskId, payload.status as "todo" | "in_progress" | "done");
      }
    };

    socket.on("chat:stream", handleChatStream);
    socket.on("terminal:output", handleTerminalOutput);
    socket.on("task:update", handleTaskUpdate);
    socket.on("agent:update", handleTaskUpdate);
    socket.on("deployment:logs", handleTerminalOutput);
    socket.on("workflow:update", handleTaskUpdate);

    socket.connect();

    return () => {
      socket.off("chat:stream", handleChatStream);
      socket.off("terminal:output", handleTerminalOutput);
      socket.off("task:update", handleTaskUpdate);
      socket.off("agent:update", handleTaskUpdate);
      socket.off("deployment:logs", handleTerminalOutput);
      socket.off("workflow:update", handleTaskUpdate);
      socket.disconnect();
    };
  }, [appendStreamChunk, appendTerminalLine, updateTaskStatus]);
}
