import { CreateProjectInput } from './dto/createProject';
import { CreateTaskInput } from './dto/createTask';
import { DeleteProjectInput } from './dto/deleteProject';
import { DeleteTaskInput } from './dto/deleteTask';
import { GetTasksInput } from './dto/getTasks';
import { UpdateProjectInput } from './dto/updateProject';
import { UpdateTaskInput } from './dto/updateTask';
import { Task, Project } from '@repo/types';

export {
  CreateProjectInput,
  CreateTaskInput,
  DeleteProjectInput,
  DeleteTaskInput,
  GetTasksInput,
  UpdateProjectInput,
  UpdateTaskInput,
};

export type AppClientServerInterface = {
  createProject(input: CreateProjectInput): Promise<Project>;
  createTask(input: CreateTaskInput): Promise<Task>;
  deleteProject(input: DeleteProjectInput): Promise<void>;
  deleteTask(input: DeleteTaskInput): Promise<void>;
  getProjects(): Promise<Project[]>;
  getTasks(input: GetTasksInput): Promise<Task[]>;
  updateProject(input: UpdateProjectInput): Promise<Project>;
  updateTask(input: UpdateTaskInput): Promise<Task>;
};
