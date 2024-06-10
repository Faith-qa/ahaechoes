import { Types } from 'mongoose';

export class GoalBaseDTO {
  user: Types.ObjectId;
  challenge?: string;
  track?: 'Daily' | 'Weekly' | 'Monthly';
  endDate?: Date;
}

export class DailyGoalDTO extends GoalBaseDTO {
  track?: 'Daily';
  frequencyDays?: number;
}

export class WeeklyGoalDTO extends GoalBaseDTO {
  track?: 'Weekly';
  dayofWeek?: string;
  frequencyWeeks?: number;
}

export class MonthlyGoalDTO extends GoalBaseDTO {
  track?: 'Monthly';
  daysofMonth?: number;
  frequencyMonths?: number;
}

export type UpdateGoalDto = DailyGoalDTO | WeeklyGoalDTO | MonthlyGoalDTO;
