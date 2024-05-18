import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { corsConfig } from './configs/cors.config';
import { ValidationPipe } from '@nestjs/common';
import { SeedService } from './seeds/seeds.service';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);

  // Seed Master Data
  const seederService = app.get(SeedService);
  await seederService.run();

  // Enable Cors
  app.enableCors(corsConfig);
  app.useGlobalPipes(new ValidationPipe());

  // Setup Swagger for documentation Rest API
  const config = new DocumentBuilder()
    .setTitle('Library Management API Documentation')
    .setVersion('0.1')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
