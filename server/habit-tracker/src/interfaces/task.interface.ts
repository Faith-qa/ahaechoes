import { Document, Schema } from "mongoose";

export interface Task extends Document {
    user: Schema.Types.ObjectId;
    title: string;
    status: boolean;
    details: string;
    dueDate: Date;
    time: Date;
}