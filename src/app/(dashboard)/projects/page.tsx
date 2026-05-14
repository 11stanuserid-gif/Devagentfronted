import { ProjectDashboard } from "@/components/workspace/project-dashboard";
import { DeploymentPanel } from "@/components/workspace/deployment-panel";

export default function ProjectsPage() {
  return (
    <div className="grid gap-4">
      <ProjectDashboard />
      <DeploymentPanel />
    </div>
  );
}
