import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const webOrigin = process.env.WEB_ORIGIN;
  if (!webOrigin) {
    throw new Error('WEB_ORIGIN is not defined');
  }

  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: webOrigin });
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Primeira compra API')
    .setDescription('Cadastro de inscrições na jornada da Estácio')
    .setVersion('1.0')
    .build();
  SwaggerModule.setup('docs', app, () => SwaggerModule.createDocument(app, swaggerConfig));
  await app.listen(process.env.PORT ?? 3000);
}

await bootstrap();