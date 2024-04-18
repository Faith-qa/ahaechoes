import {Schema} from "mongoose";

export class UpdateHabitDto {
    goal: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    habit: string;
    notes: string[]
}