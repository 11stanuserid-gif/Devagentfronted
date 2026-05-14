"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProjectStore } from "@/store/project-store";

export function DeploymentPanel() {
  const deployments = useProjectStore((state) => state.deployments);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deployment Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {deployments.map((deployment) => (
          <div key={deployment.id} className="rounded-2xl border border-slate-800/80 bg-slate-950/55 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-medium text-white">{deployment.environment}</div>
                <div className="text-xs text-slate-500">{deployment.branch} • {deployment.commitSha}</div>
              </div>
              <Badge className="capitalize">{deployment.status}</Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
