import mongoose from "mongoose";
import {stringify} from "ts-jest";

export const JournalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    journalEntries: [{
        type: String
    }]
})