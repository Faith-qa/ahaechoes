import {Injectable, Inject} from "@nestjs/common";
import {Model} from "mongoose";
import {Task} from "../interfaces/task.interface";


@Injectable()
export class TasksServices {
    constructor(
        @Inject('TASK_MODEL')
        private taskModel: Model<Task>

    ) {}
    //create task

    async create_task()
    //update task status status
    //add notes to task
    //delete task
    //list tasks by day
    //list completed tasks
    //list uncompleted tasks
    //list a single task


}


