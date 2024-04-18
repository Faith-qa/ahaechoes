import {Schema} from "mongoose";

export class CreateHabitDto {
    goal: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    habit: string;
    notes: string[]
}