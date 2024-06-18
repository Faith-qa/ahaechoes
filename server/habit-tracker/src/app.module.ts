import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './Modules/users.module';
import { AuthModule } from './auth/auth.module';
import { GoalsModule } from './Modules/goals.module';
import { TasksModule } from './Modules/tasks.module';
import { JournalsModule } from './Modules/journals.module';
import {CacheModule,CacheInterceptor} from "@nestjs/cache-manager";
import {APP_INTERCEPTOR} from "@nestjs/core";

@Module({
  imports: [CacheModule.register({
    isGlobal: true,
  }),AuthModule, UsersModule, GoalsModule, TasksModule, JournalsModule],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor
  }],
})
export class AppModule {}
