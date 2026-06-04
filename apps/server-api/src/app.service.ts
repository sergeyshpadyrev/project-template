import {
  createExecutor,
  ExecutionRequest,
  ExecutionResponse,
} from "@repo/utils-rpc";
import { Injectable } from "@nestjs/common";
import { ClientServerInterface, Project, Task } from "@repo/core-types";

@Injectable()
export class AppService {
  private executor = createExecutor<ClientServerInterface>({
    createProject: (input: { name: string }): Promise<Project> => {
      throw new Error("Method not implemented.");
    },
    createTask: (input: {
      projectId: string;
      task: Omit<Task, "id">;
    }): Promise<Task> => {
      throw new Error("Method not implemented.");
    },
    deleteProject: (input: { projectId: string }): Promise<void> => {
      throw new Error("Method not implemented.");
    },
    deleteTask: (input: { taskId: string }): Promise<void> => {
      throw new Error("Method not implemented.");
    },
    getProjects: (): Promise<Project[]> => {
      throw new Error("Method not implemented.");
    },
    getTasks: (input: { projectId: string }): Promise<Task[]> => {
      throw new Error("Method not implemented.");
    },
    updateProject: (input: {
      projectId: string;
      name: string;
    }): Promise<Project> => {
      throw new Error("Method not implemented.");
    },
    updateTask: (input: {
      taskId: string;
      task: Partial<Omit<Task, "id">>;
    }): Promise<Task> => {
      throw new Error("Method not implemented.");
    },
  });

  async handleRequestFromCallerSide(
    request: ExecutionRequest,
  ): Promise<ExecutionResponse> {
    return this.executor.execute(request);
  }
}
