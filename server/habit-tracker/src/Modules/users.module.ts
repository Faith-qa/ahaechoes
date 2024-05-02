import {Module} from "@nestjs/common";
import {UsersControllers} from "../controllers/users.controllers";
import {UsersService} from "../services/users.service";
import {UsersProviders} from "../providers/user.providers";
import {DatabaseModule} from "../db/db.module";
import {AuthModule} from "../auth/auth.module";
import {AuthService} from "../auth/auth.service";
import {UserSchema} from "../schemas/user.schema";
import { MongooseModule } from "@nestjs/mongoose";


@Module({
    imports: [DatabaseModule]/*add database configurations */,
    controllers: [UsersControllers],
    providers:[UsersService, AuthService, ...UsersProviders],
    exports: [UsersService]


})
export class UsersModule {}