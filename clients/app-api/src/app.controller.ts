import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateProjectInput,
  CreateTaskInput,
  UpdateProjectInput,
  UpdateTaskInput,
} from '@repo/types-app';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/projects')
  createProject(@Body() input: CreateProjectInput): ReturnType<AppService['createProject']> {
    return this.appService.createProject(input);
  }

  @Post('/projects/:projectId/tasks')
  createTask(
    @Param('projectId') projectId: string,
    @Body() input: Omit<CreateTaskInput, 'projectId'>
  ): ReturnType<AppService['createTask']> {
    return this.appService.createTask({ ...input, projectId });
  }

  @Delete('/projects/:projectId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteProject(@Param('projectId') projectId: string): ReturnType<AppService['deleteProject']> {
    return this.appService.deleteProject({ projectId });
  }

  @Delete('/tasks/:taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTask(@Param('taskId') taskId: string): ReturnType<AppService['deleteTask']> {
    return this.appService.deleteTask({ taskId });
  }

  @Get('/projects')
  getProjects(): ReturnType<AppService['getProjects']> {
    return this.appService.getProjects();
  }

  @Get('/projects/:projectId/tasks')
  getTasks(@Param('projectId') projectId: string): ReturnType<AppService['getTasks']> {
    return this.appService.getTasks({ projectId });
  }

  @Get('/health')
  healthCheck(): string {
    return 'OK';
  }

  @Patch('/projects/:projectId')
  updateProject(
    @Param('projectId') projectId: string,
    @Body() input: Omit<UpdateProjectInput, 'projectId'>
  ): ReturnType<AppService['updateProject']> {
    return this.appService.updateProject({ ...input, projectId });
  }

  @Patch('/tasks/:taskId')
  updateTask(
    @Param('taskId') taskId: string,
    @Body() input: Omit<UpdateTaskInput, 'taskId'>
  ): ReturnType<AppService['updateTask']> {
    return this.appService.updateTask({ ...input, taskId });
  }
}
