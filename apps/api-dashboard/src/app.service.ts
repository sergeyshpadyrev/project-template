import { Injectable } from '@nestjs/common';
import rpc from '@repo/sdk-dashboard';
import { DashboardClientServerInterface, GetUserProjectsInput } from '@repo/types-dashboard';

@Injectable()
export class AppService implements DashboardClientServerInterface {
  getUserProjects(
    input: GetUserProjectsInput
  ): ReturnType<DashboardClientServerInterface['getUserProjects']> {
    return rpc.getUserProjects(input);
  }

  getUsers(): ReturnType<DashboardClientServerInterface['getUsers']> {
    return rpc.getUsers();
  }
}
