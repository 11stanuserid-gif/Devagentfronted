export interface SocketStreamPayload {
  chatId: string;
  messageId: string;
  delta?: string;
  done?: boolean;
}

export interface WorkflowUpdate {
  id: string;
  status: string;
  label: string;
  progress?: number;
}
