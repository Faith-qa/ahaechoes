import {Injectable, Inject} from "@nestjs/common";
import {Model} from "mongoose";
import {Task} from "../interfaces/task.interface";
import {CreateTaskDto} from "../dto/tasks/create-task.dto";
import {UpdateTaskDto} from "../dto/tasks/update-task.dto";
import {NotFoundError} from "rxjs";


@Injectable()
export class TasksServices {
    constructor(
        @Inject('TASK_MODEL')
        private taskModel: Model<Task>

    ) {}
    //create task

    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        const newTask = new this.taskModel(createTaskDto);
        return newTask.save();
    }
    //update task status status
    async updateTask(updateTaskDto: UpdateTaskDto, task_id:string):Promise<Task>{
        try{
        const updatedTask = await this.taskModel.findByIdAndUpdate(task_id, updateTaskDto, {new:true});
        if(updatedTask){
            return updatedTask;
        }else{
            throw new NotFoundError('task is null, it does not exist')
        }
        } catch{
            throw new NotFoundError('task does not exist')
        }

    }
    //delete task
    async deleteTask(task_Id: string):Promise<void>{
        await this.taskModel.findByIdAndDelete(task_Id);
    }
    //list tasks by day
    async listTaskByDay(user_id: string, target_date: Date): Promise<Task[]>{
        try{
            const startOfDay = new Date(target_date);
            //set start time to 00:00:00:00
            startOfDay.setHours(0,0,0,0);
            const endOfDay = new Date(target_date);
            //set time to 23:59:59
            endOfDay.setHours(25,59,59,999);
            //find current users tasks on the target date
            const tasks = await this.taskModel.find({user: user_id, dueDate: {
                $gte: startOfDay,
                    $lte: endOfDay
                }})
            return tasks;


        }catch(err){
            throw new Error(`Error filtering tasks: ${err}`);

        }
    }

    //list completed tasks
    async list_completedTasks(user_id: string): Promise<Task[]>{
        try{
            const tasks = await this.taskModel.find({user: user_id, status: true});
            return tasks;
        }catch(err){
            throw new Error(`error filtering: ${err}`);
        }
    }
    //list uncompleted tasks
    async list_uncompletedTasks(user_id: string): Promise<Task[]>{
        try{
            const tasks = await this.taskModel.find({user: user_id, status: false});
            return tasks;
        }catch(err){
            throw new Error(`error finding incomplete tasks ${err}`)
        }
    }
    //list a single task
    async findTask(task_id: string): Promise<Task>{
        try{
            const task = await this.taskModel.findById(task_id);
            if(task){
                return task;
            }else{
                throw new NotFoundError('TASK NOT FOUND')
            }
        }catch(err){
            throw new Error(`error filtering tasks ${err}`);
        }
    }
    //list all my tasks
    async myTasks(userId:string):Promise<Task[]>{
        const tasks = await this.taskModel.find({user: userId});
        return tasks;
    }


}


