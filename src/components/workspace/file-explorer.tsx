"use client";

import { ChevronDown, ChevronRight, FileCode2, FolderClosed, FolderOpen, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FileNode } from "@/types";
import { useProjectStore } from "@/store/project-store";
import { cn } from "@/lib/utils";

function FileTreeNode({ node, depth = 0 }: { node: FileNode; depth?: number }) {
  const [open, setOpen] = useState(true);
  const openFile = useProjectStore((state) => state.openFile);

  if (node.type === "folder") {
    return (
      <div>
        <button onClick={() => setOpen((value) => !value)} className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-sm text-slate-300 hover:bg-slate-900/60 hover:text-white" style={{ paddingLeft: depth * 14 + 8 }}>
          {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          {open ? <FolderOpen className="h-4 w-4 text-violet-200" /> : <FolderClosed className="h-4 w-4 text-slate-400" />}
          {node.name}
        </button>
        {open && (
          <div className="space-y-1">
            {node.children?.map((child) => (
              <FileTreeNode key={child.id} node={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button onClick={() => openFile(node)} className={cn("flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-sm text-slate-400 hover:bg-slate-900/60 hover:text-white")} style={{ paddingLeft: depth * 14 + 22 }}>
      <FileCode2 className="h-4 w-4 text-cyan-200" />
      {node.name}
    </button>
  );
}

export function FileExplorer() {
  const fileTree = useProjectStore((state) => state.fileTree);
  const openFiles = useProjectStore((state) => state.openFiles);
  const addFile = useProjectStore((state) => state.addFile);
  const renameFile = useProjectStore((state) => state.renameFile);
  const deleteFile = useProjectStore((state) => state.deleteFile);

  const activeFile = openFiles[openFiles.length - 1];

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>File Explorer</CardTitle>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" onClick={() => {
            const name = window.prompt("New file name", "feature.ts");
            if (name) addFile(name);
          }}>
            <Plus className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" disabled={!activeFile} onClick={() => {
            if (!activeFile) return;
            const name = window.prompt("Rename file", activeFile.name);
            if (name) renameFile(activeFile.id, name);
          }}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" disabled={!activeFile} onClick={() => {
            if (activeFile) deleteFile(activeFile.id);
          }}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-1 overflow-y-auto pb-4">
        {fileTree.map((node) => (
          <FileTreeNode key={node.id} node={node} />
        ))}
      </CardContent>
    </Card>
  );
}
