import { NestFactory } from '@nestjs/core';
import ports from '@repo/config-ports';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  await app.listen(process.env.PORT ?? ports.appApi);
}

void bootstrap();
