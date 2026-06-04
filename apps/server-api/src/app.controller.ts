import { Body, Controller, Get, Post } from "@nestjs/common";

import { AppService } from "./app.service";
import {
  ExecutionRequest,
  ExecutionResponse,
} from "typed-remote-procedure-call";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/health")
  healthCheck(): string {
    return "OK";
  }

  @Post("/rpc")
  handleRequestFromCallerSide(
    @Body() body: { request: ExecutionRequest },
  ): Promise<ExecutionResponse> {
    return this.appService.handleRequestFromCallerSide(body.request);
  }
}
