import {Module} from "@nestjs/common";
import {JounalsServices} from "../services/jounals.services";
import {JounalsControllers} from "../controllers/jounals.controllers";
import {DatabaseModule} from "../db/db.module";
import {journalsProviders} from "../providers/journals.providers";


@Module({
    imports: [DatabaseModule],
    controllers: [JounalsControllers],
    providers:[JounalsServices, ...journalsProviders],
    exports: [JounalsServices]
})
export class JournalsModule {}