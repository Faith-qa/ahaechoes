import {Connection} from "mongoose";
import {HabitsSchema} from "../schemas/habits.schema";

export const goalsProviders = [
    {
        provide: 'HABIT_MODEL',
        useFactory: (connection: Connection)=> connection.model('HABIT', HabitsSchema),
        inject: ['DATABASE_CONNECTION']
    },
]