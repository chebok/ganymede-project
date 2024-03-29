import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as http from 'http';
import 'dotenv/config';

import { AppModule } from './app.module';
import { GameService } from './game.service';
import { GanymedeRoom } from './rooms/ganymede.room';
import { Globals } from './utils/globals';

const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 2567;

const ROOMS = [GanymedeRoom];

async function bootstrap(port: number) {
  const app = express();

  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(app));
  nestApp.enableShutdownHooks();
  nestApp.enableCors();
  nestApp.init();

  const httpServer = http.createServer(app);

  const gameSvc = nestApp.get(GameService);

  gameSvc.createServer(httpServer);

  ROOMS.forEach((r) => {
    console.info(`Registering room: ${r.name}`);
    gameSvc.defineRoom(r.name, r);
  });

  gameSvc.listen(port).then(() => {
    console.info(`Application started on ${port} at ${new Date()}`);
    Globals.nestApp = nestApp;
  });
}

bootstrap(PORT);
