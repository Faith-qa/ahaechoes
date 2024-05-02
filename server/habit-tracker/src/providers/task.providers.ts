import {Connection} from "mongoose";
import {TaskSchema} from "../schemas/task.schema";

export const TaskProviders = [
    {
        provide: 'TASK_MODEL',
        useFactory: (connection: Connection)=> connection.model('TASK', TaskSchema),
        inject: ['DATABASE_CONNECTION']
    }
]