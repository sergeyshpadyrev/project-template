import { Injectable } from "@nestjs/common";
import sdk from "@repo/core-sdk";
import { Project } from "@repo/core-types";

@Injectable()
export class AppService {
  getProjects(): Promise<Project[]> {
    return sdk.call.getProjects();
  }
}
