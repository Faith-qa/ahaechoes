import {Schema} from "mongoose";

export class CreateHabitDto {
    goal:string;
    user: string;
    habit: string;
    notes?: string[]
}