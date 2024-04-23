import {Module} from "@nestjs/common";
import {UsersControllers} from "../controllers/users.controllers";
import {UsersService} from "../services/users.service";
import {UsersProviders} from "../providers/user.providers";
import {DatabaseModule} from "../db/db.module";
import {AuthModule} from "./auth.module";
import {AuthService} from "../services/auth.service";


@Module({
    imports: [DatabaseModule]/*add database configurations */,
    controllers: [UsersControllers],
    providers:[UsersService, AuthService, ...UsersProviders],
    exports: [UsersService]


})
export class UsersModule {}