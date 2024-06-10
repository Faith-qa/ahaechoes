import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './Modules/users.module';
import { AuthModule } from './auth/auth.module';
import { GoalsModule } from './Modules/goals.module';
import { TasksModule } from './Modules/tasks.module';
import { JournalsModule } from './Modules/journals.module';

@Module({
  imports: [AuthModule, UsersModule, GoalsModule, TasksModule, JournalsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
