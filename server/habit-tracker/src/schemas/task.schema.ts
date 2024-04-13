import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
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