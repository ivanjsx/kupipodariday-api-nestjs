// libraries
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

// app modules
import { AppModule } from './app.module';

// providers
import { ConfigService } from '@nestjs/config';

// content

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const validationPipe = new ValidationPipe({ transform: true });
  app.useGlobalPipes(validationPipe);

  const configService = app.get(ConfigService);
  const appPort = configService.get<number>('app.port');

  await app.listen(appPort);
}

bootstrap();
