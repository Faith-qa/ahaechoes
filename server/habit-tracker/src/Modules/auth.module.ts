import {Module} from "@nestjs/common";
import {AuthService} from "../services/auth.service";
import {AuthController} from "../controllers/auth.controller";
import {DatabaseModule} from "../db/db.module";
import {UsersModule} from "./users.module";
import {JwtModule} from "@nestjs/jwt";
import * as dotenv from 'dotenv';
import {UsersService} from "../services/users.service";

dotenv.config()

@Module({
    imports:[UsersModule, JwtModule.register({
        global: true,
        secret: process.env.TOKEN_SECRET,
        signOptions: {expiresIn: '60s'}
    }),],
    providers:[AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule{}