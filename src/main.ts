import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ }));

  app.useStaticAssets(join(__dirname, 'common/assets'), {
    prefix: '/assets/',
  });
  
  // ⭐ Swagger Config
  const config = new DocumentBuilder()
    .setTitle('School Management API')
    .setDescription('API documentation for School Management System')
    .setVersion('1.0')
    .addBearerAuth() // enable JWT token header
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // ⭐ Swagger UI route (latest nest style)
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: '/api/docs-json',
    explorer: true,
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
