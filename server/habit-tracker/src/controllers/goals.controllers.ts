import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { GoalsServices } from '../services/goals.services';
import { CreateGoalDto } from '../dto/goals/create-goal.dto';
import { UpdateGoalDto } from '../dto/goals/update-goat.dto';
import { Goal } from '../interfaces/goal.interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('goals')
export class GoalsControllers {
  constructor(private readonly goalsServices: GoalsServices) {}

  @HttpCode(201)
  @UseGuards(AuthGuard)
  @Post(':userId')
  async createGoal(
    @Request() req: any,
    @Body() createGoalDto: CreateGoalDto,
    @Param('userId') userId: string,
  ): Promise<Goal> {
    if (req.user.user._id !== userId) {
      throw new UnauthorizedException();
    }
    // const userid =  mongoose.Types.ObjectId(userId)
    console.log(userId);
    const newGoalDto = { ...createGoalDto, user: userId };
    return await this.goalsServices.create(newGoalDto);
  }
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Get()
  async getGoals(@Param('userId') userId: string): Promise<Goal[]> {
    return await this.goalsServices.listmyGoals(userId);
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Patch()
  async updateGoals(
    @Body() updatedGoalDto: UpdateGoalDto,
    goal_id: string,
  ): Promise<Goal> {
    return await this.goalsServices.updateGoal(updatedGoalDto, goal_id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Delete()
  async deleteGoal(@Param('goal_id') goal_id: string): Promise<any> {
    await this.goalsServices.deleteGoal(goal_id);
  }

  //create habits and update to goal
  /*@HttpCode(200)
  @Post(':userId/:goalId')
  async addHabits(
    @Body() createHabitDto: CreateHabitDto,
    @Param('userId') userId: string,
    @Param('goalId') goalId: string,
  ): Promise<Goal> {
    const newHabitDTO = { ...createHabitDto, user: userId, goal: goalId };
    await this.habitsService.createHabitAndUpdateGoal(newHabitDTO);
    return await this.goalsServices.findOneGoal(goalId);
  }*/
}
