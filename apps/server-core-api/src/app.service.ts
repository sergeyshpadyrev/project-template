import {
  createExecutor,
  ExecutionRequest,
  ExecutionResponse,
} from "@repo/utils-rpc";
import { Injectable } from "@nestjs/common";
import { ClientServerInterface, Project, Task } from "@repo/core-types";

import { DatabaseService } from "./database.service";

@Injectable()
export class AppService {
  constructor(private readonly database: DatabaseService) {}

  private executor = createExecutor<ClientServerInterface>({
    createProject: (input: { name: string }): Promise<Project> =>
      this.database.createProject(input),
    createTask: (input: {
      projectId: string;
      task: Omit<Task, "id">;
    }): Promise<Task> => this.database.createTask(input),
    deleteProject: (input: { projectId: string }): Promise<void> =>
      this.database.deleteProject(input),
    deleteTask: (input: { taskId: string }): Promise<void> =>
      this.database.deleteTask(input),
    getProjects: (): Promise<Project[]> => this.database.getProjects(),
    getTasks: (input: { projectId: string }): Promise<Task[]> =>
      this.database.getTasks(input),
    updateProject: (input: {
      projectId: string;
      name: string;
    }): Promise<Project> => this.database.updateProject(input),
    updateTask: (input: {
      taskId: string;
      task: Partial<Omit<Task, "id">>;
    }): Promise<Task> => this.database.updateTask(input),
  });

  async handleRequestFromCallerSide(
    request: ExecutionRequest,
  ): Promise<ExecutionResponse> {
    return this.executor.execute(request);
  }
}
