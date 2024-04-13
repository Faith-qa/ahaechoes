import mongoose from "mongoose";

export const TaskSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    details: {
        type: String
    },
    dueDate: Date,
    time: Date
})