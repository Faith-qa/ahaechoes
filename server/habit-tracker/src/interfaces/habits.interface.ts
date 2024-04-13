import { Document, Schema } from "mongoose";

export interface Habits extends Document {
    goal: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    habit: string;
    notes: string[]
}