"use client";

import { io, type Socket } from "socket.io-client";
import { env } from "@/config/env";

let socket: Socket | null = null;

export function getSocket() {
  if (!socket) {
    socket = io(env.socketUrl, {
      transports: ["websocket", "polling"],
      autoConnect: false,
      reconnection: true
    });
  }

  return socket;
}
