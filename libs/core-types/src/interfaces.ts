import { Project, Task } from "./entities";

export type ClientServerInterface = {
  createProject(input: { name: string }): Promise<Project>;
  createTask(input: {
    projectId: string;
    task: Omit<Task, "id">;
  }): Promise<Task>;
  deleteProject(input: { projectId: string }): Promise<void>;
  deleteTask(input: { taskId: string }): Promise<void>;
  getProjects(): Promise<Project[]>;
  getTasks(input: { projectId: string }): Promise<Task[]>;
  updateProject(input: { projectId: string; name: string }): Promise<Project>;
  updateTask(input: {
    taskId: string;
    task: Partial<Omit<Task, "id">>;
  }): Promise<Task>;
};
