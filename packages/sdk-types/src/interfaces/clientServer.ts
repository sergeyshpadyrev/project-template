import { CreateProjectInput } from "../inputs/createProject";
import { CreateTaskInput } from "../inputs/createTask";
import { DeleteProjectInput } from "../inputs/deleteProject";
import { DeleteTaskInput } from "../inputs/deleteTask";
import { GetTasksInput } from "../inputs/getTasks";
import { UpdateProjectInput } from "../inputs/updateProject";
import { UpdateTaskInput } from "../inputs/updateTask";
import { Project } from "../models/project";
import { Task } from "../models/task";

export type ClientServerInterface = {
  createProject(input: CreateProjectInput): Promise<Project>;
  createTask(input: CreateTaskInput): Promise<Task>;
  deleteProject(input: DeleteProjectInput): Promise<void>;
  deleteTask(input: DeleteTaskInput): Promise<void>;
  getProjects(): Promise<Project[]>;
  getTasks(input: GetTasksInput): Promise<Task[]>;
  updateProject(input: UpdateProjectInput): Promise<Project>;
  updateTask(input: UpdateTaskInput): Promise<Task>;
};
