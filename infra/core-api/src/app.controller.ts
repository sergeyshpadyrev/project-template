import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExecutionRequest, ExecutionResponse } from 'typed-remote-procedure-call';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/rpc')
  handleRequestFromCallerSide(
    @Body() body: { request: ExecutionRequest }
  ): Promise<ExecutionResponse> {
    return this.appService.handleRequestFromCallerSide(body.request);
  }

  @Get('/health')
  healthCheck(): string {
    return 'OK';
  }
}
