"use client";

import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProjectStore } from "@/store/project-store";
import type { Task } from "@/types";

const columns: Array<{ id: Task["status"]; title: string }> = [
  { id: "todo", title: "Todo" },
  { id: "in_progress", title: "In Progress" },
  { id: "done", title: "Done" }
];

export function TaskBoard() {
  const tasks = useProjectStore((state) => state.tasks);
  const updateTaskStatus = useProjectStore((state) => state.updateTaskStatus);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    updateTaskStatus(result.draggableId, result.destination.droppableId as Task["status"]);
  };

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader>
        <CardTitle>AI Task Board</CardTitle>
      </CardHeader>
      <CardContent>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid gap-4 lg:grid-cols-3">
            {columns.map((column) => (
              <Droppable droppableId={column.id} key={column.id}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[300px] rounded-2xl border border-slate-800/80 bg-slate-950/45 p-3">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white">{column.title}</h3>
                      <Badge>{tasks.filter((task) => task.status === column.id).length}</Badge>
                    </div>
                    <div className="space-y-3">
                      {tasks.filter((task) => task.status === column.id).map((task, index) => (
                        <Draggable draggableId={task.id} index={index} key={task.id}>
                          {(draggableProvided) => (
                            <div ref={draggableProvided.innerRef} {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps} className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-3">
                              <div className="mb-2 flex items-center justify-between gap-2">
                                <p className="text-sm font-medium text-white">{task.title}</p>
                                <Badge className="capitalize">{task.priority}</Badge>
                              </div>
                              <p className="text-xs text-slate-400">{task.description}</p>
                              <div className="mt-3 text-xs text-slate-500">{task.assignee} • {task.milestone}</div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </CardContent>
    </Card>
  );
}
