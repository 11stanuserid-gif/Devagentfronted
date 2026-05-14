"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LockKeyhole, Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth-store";

export default function RegisterPage() {
  const router = useRouter();
  const { register, loading, error } = useAuthStore();
  const [name, setName] = useState("DevFlow Builder");
  const [email, setEmail] = useState("builder@devflow.ai");
  const [password, setPassword] = useState("password123");

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-xl rounded-[2rem]">
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>Register and connect the premium frontend to the production backend.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-400">Name</label>
            <div className="relative">
              <UserRound className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
              <Input className="pl-10" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
          </div>
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
                await register({ name, email, password });
                router.push("/dashboard");
              } catch {
                // handled by store
              }
            }}
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>
          <p className="text-center text-sm text-slate-500">
            Already have an account? <Link href="/login" className="text-violet-200 hover:text-white">Sign in</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
