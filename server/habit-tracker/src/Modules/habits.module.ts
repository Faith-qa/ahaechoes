import {Module} from "@nestjs/common";
import{TasksServices} from "../services/tasks.services";
import {DatabaseModule} from "../db/db.module";
import {TaskProviders} from "../providers/task.providers";
import {HabitServices} from "../services/habits.services";
import {habitsProviders} from "../providers/habit.providers";
import {GoalsModule} from "./goals.module";
import {GoalsServices} from "../services/goals.services";
import {GoalsProviders} from "../providers/goals.providers";

@Module({
    imports: [DatabaseModule],
    providers:[HabitServices,GoalsServices,...habitsProviders, ...GoalsProviders],
    exports:[HabitServices]
})
export class HabitsModule {}