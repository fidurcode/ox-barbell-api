import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { configDotenv } from 'dotenv';

configDotenv();

function getSwaggerConfig(app: INestApplication<AppModule>) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ox Barbell Api')
    .setDescription('API for Ox Barbell App')
    .setVersion('1.0')
    .addTag('open-api')
    .addBearerAuth()
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );
  SwaggerModule.setup('open-api', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });
}
async function bootstrap() {
  const app: INestApplication<AppModule> = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  getSwaggerConfig(app);

  await app.listen(process.env.PORT || 3000);
}
bootstrap().then(
  () => console.log('App Running'),
  (err) => console.log(err),
);
