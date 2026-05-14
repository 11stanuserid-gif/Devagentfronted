"use client";

import { GitBranch, PlusCircle, UploadCloud } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProjectStore } from "@/store/project-store";

export function ProjectDashboard() {
  const projects = useProjectStore((state) => state.projects);
  const createNewProject = useProjectStore((state) => state.createNewProject);

  return (
    <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>Create projects, import GitHub repositories, upload ZIP archives, and manage environment settings.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {projects.map((project) => (
            <div key={project.id} className="rounded-3xl border border-slate-800/80 bg-slate-950/55 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm text-white">
                <GitBranch className="h-4 w-4 text-violet-200" />
                {project.name}
              </div>
              <p className="text-sm text-slate-400">{project.description}</p>
              <div className="mt-3 text-xs text-slate-500">{project.environmentCount} env vars • {project.deployments} deployments</div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Spin up a fresh workspace or attach an existing codebase.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Project name" id="project-name" />
          <Input placeholder="GitHub repository URL" id="project-repo" />
          <div className="grid gap-2 sm:grid-cols-2">
            <Button onClick={() => {
              const name = (document.getElementById("project-name") as HTMLInputElement | null)?.value;
              const repositoryUrl = (document.getElementById("project-repo") as HTMLInputElement | null)?.value;
              void createNewProject({ name: name || "Untitled project", repositoryUrl });
            }}>
              <PlusCircle className="h-4 w-4" />
              Create
            </Button>
            <Button variant="secondary">
              <UploadCloud className="h-4 w-4" />
              Upload ZIP
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
