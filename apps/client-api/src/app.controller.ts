import { Controller, Get } from "@nestjs/common";

import { AppService } from "./app.service";
import { Project } from "@repo/core-types";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/projects")
  getProjects(): Promise<Project[]> {
    return this.appService.getProjects();
  }
}
