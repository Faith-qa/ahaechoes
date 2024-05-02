import {Schema} from "mongoose";
import {UNKNOWN_EXPORT_MESSAGE} from "@nestjs/core/errors/messages";

export class CreateGoalDto{
readonly user: string;
readonly goal: string;
readonly habitKind: 'daily' | 'weekly' | 'monthly';
readonly tracker: TrackerDto;
}

export class TrackerDto{
    daily?: DailyTrackerDto;
    weekly?: WeeklyTrackerDto;
    monthly?: MonthlyTrackerDto;

}

export class DailyTrackerDto {
    readonly time: Date;
    readonly reminderDays: string[];
}

export class WeeklyTrackerDto{
    readonly reminderDay: string;
    readonly time: Date;
}

export class MonthlyTrackerDto{
    readonly week: number;
    readonly day: string;
    readonly time: Date
}