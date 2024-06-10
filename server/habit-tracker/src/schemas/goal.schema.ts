import mongoose, { Schema } from 'mongoose';

export const GoalSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  challenge: {
    type: String,
    required: true,
  },
  track: {
    type: String,
    required: true,
    enum: ['Daily', 'Weekly', 'Monthly'],
  },
  frequencyDays: {
    type: Number,
    required: function () {
      return this.track === 'Daily';
    },
  },
  frequencyWeeks: {
    type: Number,
    required: function () {
      return this.track === 'Weekly';
    },
  },
  frequencyMonths: {
    type: Number,
    required: function () {
      return this.track === 'Monthly';
    },
  },
});
