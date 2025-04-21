import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: 'http://192.168.26.231:8081', 
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });


  // Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip unrecognized fields
      forbidNonWhitelisted: true, // Throw error if extra fields exist
      transform: true, // Transform payloads to DTO types
    }),
  );
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
