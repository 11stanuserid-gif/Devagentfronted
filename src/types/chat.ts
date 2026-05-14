export type MessageRole = "user" | "assistant" | "system";
export type MessageStatus = "pending" | "streaming" | "done" | "error";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
  status?: MessageStatus;
  attachments?: Array<{
    id: string;
    name: string;
    url?: string;
    type: string;
  }>;
}

export interface Chat {
  id: string;
  title: string;
  projectId?: string;
  updatedAt: string;
  messages: ChatMessage[];
}
