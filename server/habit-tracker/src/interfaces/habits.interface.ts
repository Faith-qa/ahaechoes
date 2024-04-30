import { Document, Schema } from "mongoose";

export interface Habit extends Document {
    goal: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    habit: string;
    notes: string[]
}