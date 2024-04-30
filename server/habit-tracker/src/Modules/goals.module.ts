import {Module} from "@nestjs/common";
import {GoalsControllers} from "../controllers/goals.controllers";
import {GoalsServices} from "../services/goals.services";
import {GoalsProviders} from "../providers/goals.providers";
import {DatabaseModule} from "../db/db.module";
import {AuthService} from "../auth/auth.service";
import {HabitServices} from "../services/habits.services";
import {HabitsModule} from "./habits.module";
import {habitsProviders} from "../providers/habit.providers";

@Module({
    imports:[DatabaseModule,HabitsModule],
    controllers: [GoalsControllers],
    providers: [GoalsServices,HabitServices,...GoalsProviders, ...habitsProviders],
    exports: [GoalsServices]

})
export class GoalsModule {}