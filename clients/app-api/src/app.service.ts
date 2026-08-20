import { Injectable } from '@nestjs/common';
import rpc from '@repo/sdk-app';
import {
  AppClientServerInterface,
  CreateProjectInput,
  CreateTaskInput,
  DeleteProjectInput,
  DeleteTaskInput,
  GetTasksInput,
  UpdateProjectInput,
  UpdateTaskInput,
} from '@repo/types-app';

@Injectable()
export class AppService implements AppClientServerInterface {
  createProject(input: CreateProjectInput): ReturnType<AppClientServerInterface['createProject']> {
    return rpc.createProject(input);
  }

  createTask(input: CreateTaskInput): ReturnType<AppClientServerInterface['createTask']> {
    return rpc.createTask(input);
  }

  deleteProject(input: DeleteProjectInput): ReturnType<AppClientServerInterface['deleteProject']> {
    return rpc.deleteProject(input);
  }

  deleteTask(input: DeleteTaskInput): ReturnType<AppClientServerInterface['deleteTask']> {
    return rpc.deleteTask(input);
  }

  getProjects(): ReturnType<AppClientServerInterface['getProjects']> {
    return rpc.getProjects();
  }

  getTasks(input: GetTasksInput): ReturnType<AppClientServerInterface['getTasks']> {
    return rpc.getTasks(input);
  }

  updateProject(input: UpdateProjectInput): ReturnType<AppClientServerInterface['updateProject']> {
    return rpc.updateProject(input);
  }

  updateTask(input: UpdateTaskInput): ReturnType<AppClientServerInterface['updateTask']> {
    return rpc.updateTask(input);
  }
}
