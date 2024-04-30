import {Model} from "mongoose";
import {Injectable, Inject, UnauthorizedException} from "@nestjs/common";
import {Goal} from "../interfaces/goal.interface";
import {CreateGoalDto} from "../dto/goals/create-goal.dto";
import {UpdateGoalDto} from "../dto/goals/update-goat.dto";
import {NotFoundError} from "rxjs";

@Injectable()
export class GoalsServices{
    constructor (
        @Inject('GOAL_MODEL')
        private goalModel: Model<Goal>,

    ){}

    // CREATE A GOAL

    async create(createGoalDto: CreateGoalDto): Promise<Goal>{
       try{
           const createdGoal = new this.goalModel(createGoalDto);
           return await createdGoal.save();

       } catch{
           throw new Error('something went wrong')
       }

    }
    // updateGoals
    async updateGoal(updatedGoalDto: UpdateGoalDto, goal_id: string):Promise<Goal>{
        const updatedGoal = await this.goalModel.findByIdAndUpdate(goal_id, updatedGoalDto, {new: true});
        if(!updatedGoal){
            throw new NotFoundError("goal does not exist");
        }
        return updatedGoal;
    }

    // find all my goals
    async listmyGoals(user_id: string): Promise<Goal[]>{
        try{
            const goals = await this.goalModel.find({user: user_id}).limit(10);
            return goals;
        }catch(error){
            throw new NotFoundError(error);
        }
    }

    async deleteGoal(goal_id: string): Promise<void>{
        await this.goalModel.findByIdAndDelete(goal_id);
    }

    //find one goal

    async findOneGoal(goal_id: string):Promise<Goal>{
       const goal = await this.goalModel.findById(goal_id);
       if(!goal){
           throw new NotFoundError("goal does not exist")
       }
       return goal;
    }




}