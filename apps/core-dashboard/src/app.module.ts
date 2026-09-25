import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database.service';

@Module({
  controllers: [AppController],
  imports: [],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
