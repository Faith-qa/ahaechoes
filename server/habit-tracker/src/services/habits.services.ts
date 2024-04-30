import {Injectable, Inject} from "@nestjs/common";
import {Model} from "mongoose";
import {Habit} from "../interfaces/habits.interface";
import {CreateHabitDto} from "../dto/goals/create-habit.dto";
import {UpdateGoalDto} from "../dto/goals/update-goat.dto";
import {GoalsServices} from "./goals.services";
import {Goal} from "../interfaces/goal.interface";
import {GoalsModule} from "../Modules/goals.module";

@Injectable()
export class HabitServices{
    constructor(@Inject('HABIT_MODEL')
    private habitModel: Model<Habit>,
                private readonly goalService: GoalsServices

    ) {}

    async createHabitAndUpdateGoal(createHabitDto: CreateHabitDto):Promise<Habit>{
        //create Habit
        const newHabit = new this.habitModel(createHabitDto);
        const habit =  await newHabit.save()
         //send the add the habit to the goal tracker
        try {
            const actualGoal = await this.goalService.findOneGoal(createHabitDto.goal);
            if(actualGoal){
                if (actualGoal.habits) { // Check if habits is defined
                    actualGoal.habits.push(habit);
                    await actualGoal.save();
                } else {
                    actualGoal.habits = [habit]; // If habits is undefined, initialize it with an array containing the new habit
                    await actualGoal.save();
                }

            }else{
                throw new Error('Goal not found')
            }
            return habit;

        }catch{
            throw new Error('unable to push habit')
        }



    }


}