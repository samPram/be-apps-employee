import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors();

  // VERSIONING
  app.setGlobalPrefix('api/v1');

  const configService = app.get(ConfigService);

  await app.listen(configService.get<number>('app.port'));
}
bootstrap();
