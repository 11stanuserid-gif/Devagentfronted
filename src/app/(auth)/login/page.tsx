"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bot, LockKeyhole, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error } = useAuthStore();
  const [email, setEmail] = useState("demo@devflow.ai");
  const [password, setPassword] = useState("password123");

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="glass rounded-[2rem] border border-violet-500/15 p-8 md:p-10">
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-3">
              <Bot className="h-6 w-6 text-violet-200" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-violet-200/70">DevFlow AI</p>
              <h1 className="text-3xl font-semibold text-white">Developer Operating System</h1>
            </div>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            Manage chats, code, tasks, terminals, memory, deployments, and realtime agents inside one premium AI-native workspace.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["Realtime chat", "Streaming responses, markdown, code blocks and file drops"],
              ["Agent telemetry", "Observe orchestration, workflows, logs and progress live"],
              ["Workspace control", "Monaco, terminal, kanban, deployments and memory search"]
            ].map(([title, description]) => (
              <div key={title} className="rounded-3xl border border-slate-800/70 bg-slate-950/50 p-4">
                <h3 className="mb-2 text-sm font-semibold text-white">{title}</h3>
                <p className="text-sm text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="rounded-[2rem]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Connect to the live DevFlow backend and continue building.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
                <Input className="pl-10" value={email} onChange={(event) => setEmail(event.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Password</label>
              <div className="relative">
                <LockKeyhole className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
                <Input className="pl-10" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
              </div>
            </div>
            {error ? <div className="rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}
            <Button
              className="w-full"
              disabled={loading}
              onClick={async () => {
                try {
                  await login({ email, password });
                  router.push("/dashboard");
                } catch {
                  // handled by store
                }
              }}
            >
              {loading ? "Signing in..." : "Login"}
            </Button>
            <p className="text-center text-sm text-slate-500">
              No account yet? <Link href="/register" className="text-violet-200 hover:text-white">Create one</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
