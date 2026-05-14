"use client";

import { Activity, Brain, LoaderCircle, Rocket, Workflow } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProjectStore } from "@/store/project-store";
import { mockLogs } from "@/utils/mock-data";
import { formatRelativeTime } from "@/lib/utils";

export function RightPanel() {
  const tasks = useProjectStore((state) => state.tasks);
  const memoryEntries = useProjectStore((state) => state.memoryEntries);
  const deployments = useProjectStore((state) => state.deployments);

  return (
    <div className="grid h-full gap-4 xl:grid-rows-[1.1fr_1fr_1fr]">
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Agent activity</CardTitle>
              <CardDescription>Realtime workflow + orchestration telemetry</CardDescription>
            </div>
            <Badge className="border-cyan-500/20 text-cyan-200">live</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[240px] pr-2 xl:h-[280px]">
            <div className="space-y-3">
              {mockLogs.map((log) => (
                <div key={log.id} className="rounded-2xl border border-slate-800/80 bg-slate-950/50 p-3">
                  <div className="mb-1 flex items-center gap-2 text-xs text-slate-400">
                    <Activity className="h-3.5 w-3.5" />
                    {log.agent}
                    <span>•</span>
                    {formatRelativeTime(log.createdAt)}
                  </div>
                  <p className="text-sm text-slate-200">{log.message}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current tasks</CardTitle>
          <CardDescription>AI-synced kanban status across agents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {tasks.slice(0, 4).map((task) => (
            <div key={task.id} className="rounded-2xl border border-slate-800/80 bg-slate-950/50 p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-white">{task.title}</span>
                <Badge className="capitalize">{task.status.replace("_", " ")}</Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <LoaderCircle className="h-3.5 w-3.5" />
                {task.assignee ?? "Unassigned"}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Memory context</CardTitle>
            <CardDescription>Indexed workspace knowledge graph</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {memoryEntries.slice(0, 3).map((entry) => (
              <div key={entry.id} className="rounded-2xl border border-slate-800/80 bg-slate-950/50 p-3">
                <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
                  <Brain className="h-3.5 w-3.5" />
                  {entry.category}
                </div>
                <div className="text-sm text-white">{entry.title}</div>
                <div className="mt-1 text-xs text-slate-400">{entry.snippet}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deployment pulse</CardTitle>
            <CardDescription>Build status, release logs and environments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {deployments.slice(0, 2).map((deployment) => (
              <div key={deployment.id} className="rounded-2xl border border-slate-800/80 bg-slate-950/50 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-sm text-white">
                    <Rocket className="h-4 w-4 text-violet-200" />
                    {deployment.environment}
                  </div>
                  <Badge className="capitalize">{deployment.status}</Badge>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                  <Workflow className="h-3.5 w-3.5" />
                  {deployment.branch} • {deployment.commitSha}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
