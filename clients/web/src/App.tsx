import { useState } from "react";

import { Task } from "@repo/core-types";

import sdk from "@repo/core-sdk-react";

const statusOrder: Task["status"][] = ["todo", "in-progress", "done"];

const nextStatus = (status: Task["status"]): Task["status"] =>
  statusOrder[(statusOrder.indexOf(status) + 1) % statusOrder.length];

const ProjectList = (props: {
  selectedProjectId: string | null;
  onSelect: (projectId: string | null) => void;
}) => {
  const [name, setName] = useState("");

  const projects = sdk.projects.useList();
  const createProject = sdk.projects.useCreate();
  const deleteProject = sdk.projects.useDelete();

  const handleCreate = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    createProject.mutate({ name: trimmed });
    setName("");
  };

  const handleDelete = (projectId: string) => {
    deleteProject.mutate({ projectId });
    if (props.selectedProjectId === projectId) props.onSelect(null);
  };

  if (projects.isPending) return <p>Loading projects…</p>;
  if (projects.isError) return <p>Failed to load projects</p>;

  return (
    <section>
      <h2>Projects</h2>
      <form onSubmit={handleCreate}>
        <input
          placeholder="New project name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <button type="submit" disabled={createProject.isPending}>
          Add
        </button>
      </form>
      <ul>
        {projects.data.map((project) => (
          <li key={project.id}>
            <button
              onClick={() => props.onSelect(project.id)}
              style={{
                fontWeight:
                  project.id === props.selectedProjectId ? "bold" : "normal",
              }}
            >
              {project.name} ({project.tasks.length})
            </button>
            <button
              onClick={() => handleDelete(project.id)}
              disabled={deleteProject.isPending}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

const TaskList = (props: { projectId: string }) => {
  const [name, setName] = useState("");

  const tasks = sdk.tasks.useList(props.projectId);
  const createTask = sdk.tasks.useCreate();
  const updateTask = sdk.tasks.useUpdate();
  const deleteTask = sdk.tasks.useDelete();

  const handleCreate = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    createTask.mutate({
      projectId: props.projectId,
      task: { name: trimmed, description: "", status: "todo" },
    });
    setName("");
  };

  if (tasks.isPending) return <p>Loading tasks…</p>;
  if (tasks.isError) return <p>Failed to load tasks</p>;

  return (
    <section>
      <h2>Tasks</h2>
      <form onSubmit={handleCreate}>
        <input
          placeholder="New task name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <button type="submit" disabled={createTask.isPending}>
          Add
        </button>
      </form>
      <ul>
        {tasks.data.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration:
                  task.status === "done" ? "line-through" : "none",
              }}
            >
              {task.name}
            </span>
            <button
              onClick={() =>
                updateTask.mutate({
                  taskId: task.id,
                  task: { status: nextStatus(task.status) },
                })
              }
              disabled={updateTask.isPending}
            >
              {task.status}
            </button>
            <button
              onClick={() => deleteTask.mutate({ taskId: task.id })}
              disabled={deleteTask.isPending}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export const App = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );

  return (
    <main>
      <h1>Todo</h1>
      <ProjectList
        selectedProjectId={selectedProjectId}
        onSelect={setSelectedProjectId}
      />
      {selectedProjectId ? (
        <TaskList projectId={selectedProjectId} />
      ) : (
        <p>Select a project to see its tasks</p>
      )}
    </main>
  );
};
