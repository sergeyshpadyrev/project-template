import { Controller, Get } from "@nestjs/common";

import { AppService } from "./app.service";
import { Project } from "@repo/core-types";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/health")
  healthCheck(): string {
    return "OK";
  }

  @Get("/projects")
  getProjects(): Promise<Project[]> {
    return this.appService.getProjects();
  }
}
