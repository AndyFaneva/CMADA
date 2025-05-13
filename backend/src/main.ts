import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin:'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true,
  })

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/', // l'URL d'accès aux fichiers
  });

  app.useGlobalPipes(new ValidationPipe({
    transform:true,
    whitelist:true,
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
