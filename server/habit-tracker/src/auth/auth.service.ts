import {Injectable, UnauthorizedException} from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import {UsersService} from "../services/users.service";
import {JwtService} from "@nestjs/jwt";
import {buildSolutionReferences} from "ts-loader/dist/instances";
import {NotFoundError} from "rxjs";
import {compare} from "bcryptjs";

@Injectable()
export class AuthService{
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService


    ){}

    async hashPassword(password: string): Promise<string>{
        const salt = await bcrypt.genSalt(10);

        const hashedPssword = await bcrypt.hash(password, salt);
        return hashedPssword;
    }

    async signIn(email: string, password: string):Promise<{access_token: string}>{
        const user = await this.usersService.findOne(email);
        const passValidation = await bcrypt.compare(password, user.password);
        if(!passValidation) throw new UnauthorizedException();
        const payload = {sub: user._id, preferredName: user.preferredName}
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }







}

