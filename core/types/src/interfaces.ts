import { Project, Task } from './entities';

export type ClientServerInterface = {
  createProject(input: { name: string }): Promise<Project>;
  createTask(input: { projectId: string; task: Omit<Task, 'id'> }): Promise<Task>;
  deleteProject(input: { projectId: string }): Promise<void>;
  deleteTask(input: { taskId: string }): Promise<void>;
  getProjects(): Promise<Project[]>;
  getTasks(input: { projectId: string }): Promise<Task[]>;
  updateProject(input: { name: string; projectId: string }): Promise<Project>;
  updateTask(input: { task: Partial<Omit<Task, 'id'>>; taskId: string }): Promise<Task>;
};
