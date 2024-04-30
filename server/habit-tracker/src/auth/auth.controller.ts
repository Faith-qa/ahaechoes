import {Body, Controller, Post,Get, HttpCode, HttpStatus, Request, UseGuards, Req} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {sign} from "jsonwebtoken";
import {SignInDto} from "../dto/users/sign-in.dto";
import {AuthGuard} from "./auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto){
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req:any){
        return req.user;
    }

}