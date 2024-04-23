import {Module} from "@nestjs/common";
import {GoalsControllers} from "../controllers/goals.controllers";
import {GoalsServices} from "../services/goals.services";
import {goalsProviders} from "../providers/task.providers";
import {DatabaseModule} from "../db/db.module";


@Module({
    imports:[DatabaseModule],
    controllers: [GoalsControllers],
    providers: [GoalsServices, ...goalsProviders],

})
export class GoalsModule {}