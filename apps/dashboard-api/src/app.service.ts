import { Injectable } from '@nestjs/common';
import { createExecutor, ExecutionRequest, ExecutionResponse } from '@repo/utils-rpc';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { DatabaseService } from './database.service';
import { GetUserProjectsInput } from '@repo/types-dashboard/dto/getUserProjects';
import { DashboardClientServerInterface } from '@repo/types-dashboard';

@Injectable()
export class AppService {
  private executor = createExecutor<DashboardClientServerInterface>({
    getUsers: () => this.database.getUsers(),
    getUserProjects: this.withValidation(GetUserProjectsInput, (input: GetUserProjectsInput) =>
      this.database.getUserProjects(input)
    ),
  });

  constructor(private readonly database: DatabaseService) {}

  async handleRequestFromCallerSide(request: ExecutionRequest): Promise<ExecutionResponse> {
    return this.executor.execute(request);
  }

  private withValidation<I extends object, O>(
    inputClass: ClassConstructor<I>,
    handle: (i: I) => O
  ) {
    return (input: I) => {
      try {
        validateOrReject(plainToInstance(inputClass, input));
      } catch (error) {
        throw new Error('Validation not passed');
      }

      return handle(input);
    };
  }
}
