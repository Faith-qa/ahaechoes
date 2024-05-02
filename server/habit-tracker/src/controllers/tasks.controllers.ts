import {Body, Controller, Post, Get, Param, Patch, UseGuards, HttpCode, Delete} from "@nestjs/common";
import {TasksServices} from "../services/tasks.services";
import {CreateTaskDto} from "../dto/tasks/create-task.dto";
import {UpdateTaskDto} from "../dto/tasks/update-task.dto";
import {Task} from "../interfaces/task.interface";
import {AuthGuard} from "../auth/auth.guard";


@Controller('tasks')

export class TasksControllers{
    constructor(
        private readonly tasksServices: TasksServices
    ) {}

    @UseGuards(AuthGuard)
    @Post(':userId')
    async createTask(@Body() createTaskDto: CreateTaskDto, @Param('userId') userId:string): Promise<Task>{
        const newTasDto = {...createTaskDto, user: userId};
        return await this.tasksServices.createTask(newTasDto);
    }

    @UseGuards(AuthGuard)
    @Patch(':userId/:taskId')
    async updateTask(@Body() updateTaskDto: UpdateTaskDto, @Param('taskId') taskId: string): Promise<Task>{
        return await this.tasksServices.updateTask(updateTaskDto, taskId);
    }

    @UseGuards(AuthGuard)
    @Delete(':userId/:taskId')
    async deleteTask(@Param('taskId') taskId: string): Promise<void>{
        await this.tasksServices.deleteTask(taskId);
    }

    @UseGuards(AuthGuard)
    @Get('byDate/:userId/:targetDate')
    async  getTasksByDate(@Param('userId') userId: string, @Param('targetDate') targetDate: Date):Promise<Task[]>{
        return await this.tasksServices.listTaskByDay(userId, targetDate);
}

    @UseGuards(AuthGuard)
    @Get('tasksCompleted/:userId')
    async getCompletedTasks(@Param('userId') userId: string):Promise<Task[]>{
        return await this.tasksServices.list_completedTasks(userId);
    }

    @UseGuards(AuthGuard)
    @Get('tasksNotComplete/:userId')
    async getIncompleteTasks(@Param('userId') userId: string): Promise<Task[]>{
        return await this.tasksServices.list_uncompletedTasks(userId);

    }

    @UseGuards(AuthGuard)
    @Get(':userId/:taskId')
    async getAtask(@Param('taskId') taskId: string):Promise<Task>{
        return await this.tasksServices.findTask(taskId);
    }

    @UseGuards(AuthGuard)
    @Get(':userId')
    async getAllTasks(@Param('userId') userId: string):Promise<Task[]>{
        return await this.tasksServices.myTasks(userId);
    }



}
