import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Habit } from '../interfaces/habits.interface';
import { CreateHabitDto } from '../dto/goals/create-habit.dto';
import { GoalsServices } from './goals.services';

@Injectable()
export class HabitServices {
  constructor(
    @Inject('HABIT_MODEL')
    private habitModel: Model<Habit>,
    private readonly goalService: GoalsServices,
  ) {}

  async createHabitAndUpdateGoal(
    createHabitDto: CreateHabitDto,
  ): Promise<Habit> {
    //create Habit
    const newHabit = new this.habitModel(createHabitDto);
    const habit = await newHabit.save();
    //send the add the habit to the goal tracker

    return habit;
  }
}
