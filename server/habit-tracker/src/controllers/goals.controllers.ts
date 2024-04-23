import {Body, Controller, Post, Get, Patch, Param, Delete} from "@nestjs/common";
import {GoalsServices} from "../services/goals.services";
import {CreateGoalDto} from "../dto/goals/create-goal.dto";
import {UpdateGoalDto} from "../dto/goals/update-goat.dto";
import {Goal} from "../interfaces/goal.interface";
import {UsersService} from "../services/users.service";

@Controller('goals')

export class GoalsControllers{
    constructor(
        private readonly goalsServices: GoalsServices,


    ){}

    @Post()
    async createGoal(@Body() createGoalDto: CreateGoalDto, userId: string):Promise<Goal>{
        //const userid =  mongoose.Types.ObjectId(userId)
        const newGoalDto = {...createGoalDto, user: userId};
        return await this.goalsServices.create(newGoalDto);
    }
    @Get()
    async getGoals(@Param('userId') userId: string):Promise<Goal[]>{
        return await this.goalsServices.listmyGoals(userId);
    }

    @Patch()
    async updateGoals(@Body() updatedGoalDto: UpdateGoalDto, goal_id: string): Promise<Goal>{
        return await this.goalsServices.updateGoal(updatedGoalDto, goal_id);
    }

    @Delete()
    async deleteGoal(@Param('goal_id') goal_id: string): Promise<any>{
        await this.goalsServices.deleteGoal(goal_id);
    }

}