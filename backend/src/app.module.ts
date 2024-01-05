import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// import * as morgan from 'morgan'
import { monitor } from '@colyseus/monitor';
import { GameService } from './game.service';

@Module({
  imports: [],
  controllers: [],
  providers: [GameService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(morgan('combined')).forRoutes('*');
    consumer.apply(monitor()).forRoutes('/monitor');
  }
}
