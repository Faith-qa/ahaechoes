import {Module} from "@nestjs/common";
import {TasksControllers} from "../controllers/tasks.controllers";
import {TaskProviders} from "../providers/task.providers";
import {TasksServices} from "../services/tasks.services";
import {DatabaseModule} from "../db/db.module";

@Module({
    imports:[DatabaseModule],
    controllers: [TasksControllers],
    providers:[TasksServices, ...TaskProviders],
    exports: [TasksServices]

})
export class TasksModule {}