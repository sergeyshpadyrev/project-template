import sdk from '@repo/sdk-app-react';
import { Task, TaskStatus } from '@repo/types';
import { useState } from 'react';

const statusOrder: Task['status'][] = [TaskStatus.Todo, TaskStatus.InProgress, TaskStatus.Done];

const nextStatus = (status: Task['status']): Task['status'] =>
  statusOrder[(statusOrder.indexOf(status) + 1) % statusOrder.length];

const ProjectList = (props: {
  onSelect: (projectId: null | string) => void;
  selectedProjectId: null | string;
}) => {
  const [name, setName] = useState('');

  const projects = sdk.projects.useList();
  const createProject = sdk.projects.useCreate();
  const deleteProject = sdk.projects.useDelete();

  const handleCreate = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    createProject.mutate({ name: trimmed });
    setName('');
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
          onChange={(event) => setName(event.target.value)}
          placeholder="New project name"
          value={name}
        />
        <button disabled={createProject.isPending} type="submit">
          Add
        </button>
      </form>
      <ul>
        {projects.data.map((project) => (
          <li key={project.id}>
            <button
              onClick={() => props.onSelect(project.id)}
              style={{
                fontWeight: project.id === props.selectedProjectId ? 'bold' : 'normal',
              }}
            >
              {project.name} ({project.tasks.length})
            </button>
            <button disabled={deleteProject.isPending} onClick={() => handleDelete(project.id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

const TaskList = (props: { projectId: string }) => {
  const [name, setName] = useState('');

  const tasks = sdk.tasks.useList(props.projectId);
  const createTask = sdk.tasks.useCreate();
  const updateTask = sdk.tasks.useUpdate();
  const deleteTask = sdk.tasks.useDelete();

  const handleCreate = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    createTask.mutate({
      description: '',
      name: trimmed,
      projectId: props.projectId,
      status: TaskStatus.Todo,
    });
    setName('');
  };

  if (tasks.isPending) return <p>Loading tasks…</p>;
  if (tasks.isError) return <p>Failed to load tasks</p>;

  return (
    <section>
      <h2>Tasks</h2>
      <form onSubmit={handleCreate}>
        <input
          onChange={(event) => setName(event.target.value)}
          placeholder="New task name"
          value={name}
        />
        <button disabled={createTask.isPending} type="submit">
          Add
        </button>
      </form>
      <ul>
        {tasks.data.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.status === 'done' ? 'line-through' : 'none',
              }}
            >
              {task.name}
            </span>
            <button
              disabled={updateTask.isPending}
              onClick={() =>
                updateTask.mutate({
                  status: nextStatus(task.status),
                  taskId: task.id,
                })
              }
            >
              {task.status}
            </button>
            <button
              disabled={deleteTask.isPending}
              onClick={() => deleteTask.mutate({ taskId: task.id })}
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
  const [selectedProjectId, setSelectedProjectId] = useState<null | string>(null);

  return (
    <main>
      <h1>Todo</h1>
      <ProjectList onSelect={setSelectedProjectId} selectedProjectId={selectedProjectId} />
      {selectedProjectId ? (
        <TaskList projectId={selectedProjectId} />
      ) : (
        <p>Select a project to see its tasks</p>
      )}
    </main>
  );
};
