import mongoose from "mongoose";

export const HabitsSchema = new mongoose.Schema({
    goal : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goal'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    habit: {
        type: String,
        required: true,
    },
    notes: [{
        type: String
    }]
})