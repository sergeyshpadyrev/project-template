import { Injectable } from '@nestjs/common';
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
import { createExecutor, ExecutionRequest, ExecutionResponse } from 'typed-remote-procedure-call';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { DatabaseService } from './database.service';

@Injectable()
export class AppService {
  private executor = createExecutor<AppClientServerInterface>({
    createProject: this.withValidation(CreateProjectInput, (input: CreateProjectInput) =>
      this.database.createProject(input)
    ),
    createTask: this.withValidation(CreateTaskInput, (input: CreateTaskInput) =>
      this.database.createTask(input)
    ),
    deleteProject: this.withValidation(DeleteProjectInput, (input: DeleteProjectInput) =>
      this.database.deleteProject(input)
    ),
    deleteTask: this.withValidation(DeleteTaskInput, (input: DeleteTaskInput) =>
      this.database.deleteTask(input)
    ),
    getProjects: () => this.database.getProjects(),
    getTasks: this.withValidation(GetTasksInput, (input: GetTasksInput) =>
      this.database.getTasks(input)
    ),
    updateProject: this.withValidation(UpdateProjectInput, (input: UpdateProjectInput) =>
      this.database.updateProject(input)
    ),
    updateTask: this.withValidation(UpdateTaskInput, (input: UpdateTaskInput) =>
      this.database.updateTask(input)
    ),
  });

  constructor(private readonly database: DatabaseService) {}

  async handleRequestFromCallerSide(request: ExecutionRequest): Promise<ExecutionResponse> {
    return this.executor.execute(request);
  }

  private withValidation<I, O>(inputClass: ClassConstructor<I>, handle: (i: I) => O) {
    return (input: I) => {
      try {
        validateOrReject(plainToInstance(inputClass as any, input));
      } catch (error) {
        throw new Error('Validation not passed');
      }

      return handle(input);
    };
  }
}
