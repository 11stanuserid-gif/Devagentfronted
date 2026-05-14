const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "https://devagent-1.onrender.com/api";
const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL ?? "https://devagent-1.onrender.com";

export const env = {
  apiUrl,
  socketUrl
};
