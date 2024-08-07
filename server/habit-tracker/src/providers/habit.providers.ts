import {Connection} from "mongoose";
import {HabitsSchema} from "../schemas/habits.schema";

export const habitsProviders = [
    {
        provide: 'HABIT_MODEL',
        useFactory: (connection: Connection)=> connection.model('Habit', HabitsSchema),
        inject: ['DATABASE_CONNECTION']
    },
]