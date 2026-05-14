import { apiRequest } from "./client";
import type { Chat, ChatMessage } from "@/types";

export function getChats(token?: string | null) {
  return apiRequest<Chat[]>("/chats", { token });
}

export function sendChatMessage(payload: { chatId?: string; message: string; projectId?: string }, token?: string | null) {
  return apiRequest<{ chat: Chat; message: ChatMessage }>("/chat", {
    method: "POST",
    token,
    body: JSON.stringify(payload)
  });
}
