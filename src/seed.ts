import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RoomsService } from './services/rooms.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const roomsService = app.get(RoomsService);
  await roomsService.seed();
  await app.close();
}

bootstrap();
