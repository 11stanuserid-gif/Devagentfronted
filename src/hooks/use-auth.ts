"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export function useAuth() {
  const router = useRouter();
  const store = useAuthStore();

  return {
    ...store,
    logoutAndRedirect: () => {
      store.logout();
      router.push("/login");
    }
  };
}
