import {Connection} from "mongoose";
import {GoalSchema} from "../schemas/goal.schema";

export const goalsProviders = [
    {
        provide: 'GOAL_MODEL',
        useFactory: (connection: Connection)=> connection.model('Goal', GoalSchema),
        inject: ['DATABASE_CONNECTION']
    }
]