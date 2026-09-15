import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const webOrigin = process.env.WEB_ORIGIN;
  if (!webOrigin) {
    throw new Error('WEB_ORIGIN is not defined');
  }

  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: webOrigin });
  await app.listen(process.env.PORT ?? 3000);
}

await bootstrap();