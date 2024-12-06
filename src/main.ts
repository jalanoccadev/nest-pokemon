import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2'); // setea prefijo global de toda la aplicación
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remueve datos de un DTO que no se esperaban
      forbidNonWhitelisted: true, // bloquea cuando envias datos que no se esperaban
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
