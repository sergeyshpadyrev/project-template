import { Injectable } from '@nestjs/common';
import { ClientServerInterface, CreateProjectInput, CreateTaskInput, DeleteProjectInput, DeleteTaskInput, GetTasksInput, Project, Task, UpdateProjectInput, UpdateTaskInput } from '@repo/core-types';
import { createExecutor, ExecutionRequest, ExecutionResponse } from '@repo/utils-rpc';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { DatabaseService } from './database.service';

@Injectable()
export class AppService {
  private executor = createExecutor<ClientServerInterface>({
    createProject: this.withValidation(CreateProjectInput,  (input) => this.database.createProject(input)),
    createTask: this.withValidation(CreateTaskInput, (input) => this.database.createTask(input)),
    deleteProject: this.withValidation(DeleteProjectInput, (input) => this.database.deleteProject(input)),
    deleteTask: this.withValidation(DeleteTaskInput, (input) => this.database.deleteTask(input)),
    getProjects:() => this.database.getProjects(),
    getTasks: this.withValidation(GetTasksInput, (input) => this.database.getTasks(input)),
    updateProject: this.withValidation(UpdateProjectInput, (input) => this.database.updateProject(input)),
    updateTask: this.withValidation(UpdateTaskInput, (input) => this.database.updateTask(input)),
  });

  constructor(private readonly database: DatabaseService) {}

  async handleRequestFromCallerSide(request: ExecutionRequest): Promise<ExecutionResponse> {
    return this.executor.execute(request);
  }

  private withValidation<  I extends object, O>(inputClass: ClassConstructor<I>, handle: (i: I) => O) {
    return (input: I) => {

      try {
        validateOrReject(plainToInstance(inputClass, input));

      } catch (error) {
        throw new Error("Validation not passed")
      }
      
      return handle(input)
    };
  }
}
