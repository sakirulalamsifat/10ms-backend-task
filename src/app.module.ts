import { Module, NestModule,MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module'
import {LoggerMiddleware} from './middleware'

import {interceptorProviders} from './helpers/interceptor'
import { AuthModule } from './modules/auth/auth.module';
import { ApifetchModule } from './modules/apifetch/apifetch.module';
import { EveneManagementModule } from './modules/event management/eventManagement.module'


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    DatabaseModule,
    AuthModule,
    ApifetchModule,
    EveneManagementModule],
  controllers: [

  ],
  providers: [

     ...interceptorProviders
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

