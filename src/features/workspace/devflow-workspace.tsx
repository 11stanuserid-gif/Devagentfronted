import { ChatFeature } from "@/features/chat";
import { BottomPrompt } from "@/components/layout/bottom-prompt";
import { FileExplorer } from "@/components/workspace/file-explorer";
import { EditorPanel } from "@/components/workspace/editor-panel";
import { TerminalPanel } from "@/components/workspace/terminal-panel";
import { TaskBoard } from "@/components/workspace/task-board";

export function DevflowWorkspace() {
  return (
    <div className="grid h-full gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
      <div className="min-h-0">
        <FileExplorer />
      </div>
      <div className="grid min-h-0 gap-4 xl:grid-rows-[minmax(0,1fr)_auto_auto]">
        <div className="glass min-h-0 overflow-hidden rounded-3xl border border-slate-800/80">
          <ChatFeature />
        </div>
        <EditorPanel />
        <div className="grid gap-4 xl:grid-cols-[1fr_1.05fr]">
          <TerminalPanel />
          <TaskBoard />
        </div>
        <BottomPrompt />
      </div>
    </div>
  );
}
