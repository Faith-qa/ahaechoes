import { Document, Schema } from 'mongoose';

export interface GoalBase extends Document {
  user: Schema.Types.ObjectId;
  challenge: string;
  track: 'Daily' | 'Weekly' | 'Monthly';
  endDate: Date;
}

interface DailyGoal extends GoalBase {
  track: 'Daily';
  frequencyDays: number;
}

interface WeeklyGoal extends GoalBase {
  track: 'Weekly';
  dayofWeek: string;
  frequencyWeeks: number;
}
interface MonthlyGoal extends GoalBase {
  track: 'Monthly';
  daysofMonth: number;
  frequencyMonths: number;
}

export type Goal = DailyGoal | WeeklyGoal | MonthlyGoal;

/*export interface Goal extends Document {
  user: Schema.Types.ObjectId;
  goal: string;
  habitKind: 'daily' | 'weekly' | 'monthly';
  tracker: {
    daily?: {
      time: Date;
      reminderDays: string[];
    };
    weekly?: {
      reminderDay: string;
      time: Date;
    };
    monthly?: {
      week: number;
      day: string;
      time: Date;
    };
  };
  habits?: [any];
}*/
