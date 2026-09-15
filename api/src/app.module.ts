import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { APP_PIPE } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module.js';
import { EnrollmentsModule } from './enrollments/enrollments.module.js';

@Module({
  imports: [PrismaModule, EnrollmentsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    },
  ],
})
export class AppModule {}
