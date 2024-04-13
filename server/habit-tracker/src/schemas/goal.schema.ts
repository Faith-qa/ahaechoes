import mongoose from "mongoose";

export const GoalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    goal: {
        type: String,
    },
    habitKind: {
        type: String,
        enum: ['daily', 'weekly', 'monthly'],
        required: true
    },

    tracker: {
        type: {
            daily: {
                time: Date,
                reminderDays: [String]
            },
            weekly: {
                reminderDay: String,
                time: Date
            },
            monthly: {
                week: Number,
                day: String,
                time: Date
            }
        },
        required: function() {
            return this.habitKind === 'daily' || this.habitKind === 'weekly' || this.habitKind === 'monthly';
        },
        habits: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Habit'
        }],
        motivation: {
            type: [String],
        }


},


})