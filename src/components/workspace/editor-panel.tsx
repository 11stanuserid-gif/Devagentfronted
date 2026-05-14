"use client";

import dynamic from "next/dynamic";
import { Sparkles, Wand2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProjectStore } from "@/store/project-store";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

function detectLanguage(fileName: string) {
  if (fileName.endsWith(".ts") || fileName.endsWith(".tsx")) return "typescript";
  if (fileName.endsWith(".js") || fileName.endsWith(".jsx")) return "javascript";
  if (fileName.endsWith(".json")) return "json";
  if (fileName.endsWith(".md")) return "markdown";
  return "plaintext";
}

export function EditorPanel() {
  const openFiles = useProjectStore((state) => state.openFiles);
  const updateFileContent = useProjectStore((state) => state.updateFileContent);
  const [activeFileId, setActiveFileId] = useState(openFiles[0]?.id ?? null);

  const activeFile = useMemo(() => openFiles.find((file) => file.id === activeFileId) ?? openFiles[0], [activeFileId, openFiles]);

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <CardTitle>Monaco Editor</CardTitle>
          <p className="mt-1 text-sm text-slate-400">Live editing, multiple tabs, autosave-ready AI-assisted editing</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Sparkles className="h-4 w-4" />
            Explain file
          </Button>
          <Button size="sm">
            <Wand2 className="h-4 w-4" />
            AI edit
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex h-[540px] flex-col gap-4">
        <Tabs>
          <TabsList className="overflow-x-auto">
            {openFiles.map((file) => (
              <TabsTrigger key={file.id} active={activeFile?.id === file.id} onClick={() => setActiveFileId(file.id)}>
                {file.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {activeFile ? (
          <div className="overflow-hidden rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-950/70 px-4 py-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Badge>{detectLanguage(activeFile.name)}</Badge>
                <span>{activeFile.path}</span>
              </div>
              <span>autosave enabled</span>
            </div>
            <MonacoEditor
              height="480px"
              theme="vs-dark"
              language={detectLanguage(activeFile.name)}
              value={activeFile.content}
              onChange={(value) => updateFileContent(activeFile.id, value ?? "")}
              options={{
                minimap: { enabled: true },
                fontSize: 14,
                scrollBeyondLastLine: false,
                roundedSelection: true,
                automaticLayout: true
              }}
            />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-slate-800/80 text-sm text-slate-400">
            Open a file to start editing
          </div>
        )}
      </CardContent>
    </Card>
  );
}
