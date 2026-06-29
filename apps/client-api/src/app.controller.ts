import { Controller, Get } from '@nestjs/common';
import { Project } from '@repo/core-types';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/projects')
  getProjects(): Promise<Project[]> {
    return this.appService.getProjects();
  }

  @Get('/health')
  healthCheck(): string {
    return 'OK';
  }
}
