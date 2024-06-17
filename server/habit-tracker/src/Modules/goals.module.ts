import { Module } from '@nestjs/common';
import { GoalsControllers } from '../controllers/goals.controllers';
import { GoalsServices } from '../services/goals.services';
import { GoalsProviders } from '../providers/goals.providers';
import { DatabaseModule } from '../db/db.module';
import { HabitsModule } from './habits.module';

@Module({
  imports: [DatabaseModule, HabitsModule],
  controllers: [GoalsControllers],
  providers: [GoalsServices, ...GoalsProviders],
  exports: [GoalsServices],
})
export class GoalsModule {}
