"use client";

import { useEffect, useState } from "react";
import { BellRing, DatabaseZap, LogOut, MoonStar, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { getHealth } from "@/services/api/system";

export default function SettingsPage() {
  const { logoutAndRedirect } = useAuth();
  const [health, setHealth] = useState("checking");

  useEffect(() => {
    getHealth()
      .then((response) => setHealth(response.status || (response.success ? "ok" : "unknown")))
      .catch(() => setHealth("unavailable"));
  }, []);

  return (
    <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>Environment variables, notifications, backend targets and workspace behavior.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-800/80 bg-slate-950/55 p-4">
              <div className="mb-2 flex items-center justify-between gap-2 text-white"><span className="flex items-center gap-2"><DatabaseZap className="h-4 w-4 text-violet-200" /> API Endpoint</span><Badge className="capitalize">{health}</Badge></div>
              <Input value="https://devagent-1.onrender.com/api" readOnly />
            </div>
            <div className="rounded-3xl border border-slate-800/80 bg-slate-950/55 p-4">
              <div className="mb-2 flex items-center gap-2 text-white"><ShieldCheck className="h-4 w-4 text-violet-200" /> Socket Endpoint</div>
              <Input value="https://devagent-1.onrender.com" readOnly />
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-800/80 bg-slate-950/55 p-4">
              <div className="mb-2 flex items-center gap-2 text-white"><BellRing className="h-4 w-4 text-violet-200" /> Notifications</div>
              <p className="text-sm text-slate-400">Streaming alerts, deployment status and agent workflow updates.</p>
            </div>
            <div className="rounded-3xl border border-slate-800/80 bg-slate-950/55 p-4">
              <div className="mb-2 flex items-center gap-2 text-white"><MoonStar className="h-4 w-4 text-violet-200" /> Theme</div>
              <p className="text-sm text-slate-400">Forced dark mode with glassmorphism styling for premium focus.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Session</CardTitle>
          <CardDescription>Manage your authentication and local workspace state.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="danger" className="w-full" onClick={logoutAndRedirect}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
