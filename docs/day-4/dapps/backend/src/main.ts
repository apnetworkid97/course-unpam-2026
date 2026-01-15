import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_PORT } from 'helpers/deployments';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Simple Storage dApp API')
    .setDescription(`
    👤 Nama   : ADITYA AGUS PRAKOSO  
    🆔 NIM    : 241011450333  
    📚 Course : Day 4 - Backend API dengan NestJS (Avalanche)`)
    .setVersion('1.0')
    .addTag('simple-storage')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, documentFactory);

  await app.listen(SWAGGER_PORT);
}
bootstrap();
