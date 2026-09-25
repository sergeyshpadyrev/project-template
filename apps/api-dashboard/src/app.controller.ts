import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users/:userId/projects')
  getUserProjects(@Param('userId') userId: string): ReturnType<AppService['getUserProjects']> {
    return this.appService.getUserProjects({ userId });
  }

  @Get('/users')
  getUsers(): ReturnType<AppService['getUsers']> {
    return this.appService.getUsers();
  }

  @Get('/health')
  healthCheck(): string {
    return 'OK';
  }
}
