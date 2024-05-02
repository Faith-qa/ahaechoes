import mongoose from "mongoose";

export const JournalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    journalEntry: {
        type: String,
        required: true

    },

}, { timestamps: true });