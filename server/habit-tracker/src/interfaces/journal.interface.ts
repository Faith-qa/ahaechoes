import {Document, Schema} from "mongoose";

export interface Journal extends Document {
    user: Schema.Types.ObjectId;
    journalEntry: string;
}