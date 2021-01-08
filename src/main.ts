import { config } from 'dotenv';
config();
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);
  await app.listen(Number(process.env.SERVER_PORT));

  if (!Number(process.env.PRODUCTION)) {
    console.log("Ready at http://localhost:" + process.env.SERVER_PORT + "/");
  }
}
bootstrap();

async function setupSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('Feelibrary')
    .setDescription('Feelibrary api swagger')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
}
