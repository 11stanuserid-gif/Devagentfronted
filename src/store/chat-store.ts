"use client";

import { create } from "zustand";
import { getChats, sendChatMessage } from "@/services/api/chats";
import type { Chat, ChatMessage } from "@/types";
import { mockChats } from "@/utils/mock-data";

interface ChatState {
  chats: Chat[];
  activeChatId: string | null;
  loading: boolean;
  streaming: boolean;
  error: string | null;
  loadChats: (token?: string | null) => Promise<void>;
  setActiveChat: (chatId: string) => void;
  startNewChat: () => void;
  appendStreamChunk: (chatId: string, messageId: string, delta: string, done?: boolean) => void;
  submitMessage: (message: string, token?: string | null, projectId?: string) => Promise<void>;
  renameChat: (chatId: string, title: string) => void;
  deleteChat: (chatId: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: mockChats,
  activeChatId: mockChats[0]?.id ?? null,
  loading: false,
  streaming: false,
  error: null,
  loadChats: async (token) => {
    set({ loading: true, error: null });
    try {
      const chats = await getChats(token);
      set({ chats: chats.length ? chats : mockChats, activeChatId: chats[0]?.id ?? mockChats[0]?.id ?? null, loading: false });
    } catch (error) {
      set({ loading: false, error: error instanceof Error ? error.message : "Failed to load chats", chats: mockChats });
    }
  },
  setActiveChat: (activeChatId) => set({ activeChatId }),
  startNewChat: () => {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: "Untitled chat",
      updatedAt: new Date().toISOString(),
      messages: []
    };
    set((state) => ({ chats: [newChat, ...state.chats], activeChatId: newChat.id }));
  },
  appendStreamChunk: (chatId, messageId, delta, done) => {
    set((state) => ({
      chats: state.chats.map((chat) => {
        if (chat.id !== chatId) return chat;
        const hasMessage = chat.messages.some((message) => message.id === messageId);
        const messages = hasMessage
          ? chat.messages.map((message) =>
              message.id === messageId
                ? { ...message, content: `${message.content}${delta}`, status: done ? "done" : "streaming" }
                : message
            )
          : [
              ...chat.messages,
              {
                id: messageId,
                role: "assistant",
                content: delta,
                createdAt: new Date().toISOString(),
                status: done ? "done" : "streaming"
              }
            ];
        return { ...chat, messages, updatedAt: new Date().toISOString() };
      }),
      streaming: !done
    }));
  },
  submitMessage: async (message, token, projectId) => {
    const state = get();
    const activeChatId = state.activeChatId ?? crypto.randomUUID();
    const optimisticUserMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
      createdAt: new Date().toISOString(),
      status: "done"
    };

    set((prev) => ({
      chats: prev.chats.some((chat) => chat.id === activeChatId)
        ? prev.chats.map((chat) =>
            chat.id === activeChatId
              ? { ...chat, messages: [...chat.messages, optimisticUserMessage], updatedAt: new Date().toISOString() }
              : chat
          )
        : [
            {
              id: activeChatId,
              title: message.slice(0, 42),
              updatedAt: new Date().toISOString(),
              projectId,
              messages: [optimisticUserMessage]
            },
            ...prev.chats
          ],
      activeChatId,
      streaming: true,
      error: null
    }));

    try {
      const response = await sendChatMessage({ chatId: activeChatId, message, projectId }, token);
      set((prev) => ({
        chats: prev.chats.map((chat) =>
          chat.id === activeChatId
            ? {
                ...response.chat,
                messages: [...chat.messages, response.message]
              }
            : chat
        ),
        streaming: false
      }));
    } catch (error) {
      set({ streaming: false, error: error instanceof Error ? error.message : "Failed to send message" });
    }
  },
  renameChat: (chatId, title) => set((state) => ({
    chats: state.chats.map((chat) => (chat.id === chatId ? { ...chat, title } : chat))
  })),
  deleteChat: (chatId) => set((state) => {
    const chats = state.chats.filter((chat) => chat.id !== chatId);
    return { chats, activeChatId: chats[0]?.id ?? null };
  })
}));
