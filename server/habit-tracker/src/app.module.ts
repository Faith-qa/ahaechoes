import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsersModule} from "./Modules/users.module";
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from "./auth/auth.module";
import {GoalsModule} from "./Modules/goals.module";

@Module({
  imports: [AuthModule, UsersModule, GoalsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
