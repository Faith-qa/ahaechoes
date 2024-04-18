import {Controller, Patch,Post,Body, Delete} from "@nestjs/common";
import {CreateUserDto} from "../dto/users/create-user.dto";
import {UsersService} from "../services/users.service";
import {User} from "../interfaces/user.interface";
import {AuthService} from "../services/auth.service";
import {UpdateUserDto} from "../dto/users/update-user.dto";
import {hash} from "bcryptjs";

@Controller('users')

export class UsersControllers{
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto){
        let hashPassword:string = '';
        await this.authService.hashPassword(createUserDto.password).then(res=>{
            hashPassword = res;
        })

        const updatedUserDto = {...createUserDto,
        password: hashPassword}
        return this.usersService.create(updatedUserDto)
    }

    @Patch()
    async update(@Body() updatedUserDto: UpdateUserDto, userid:string){
        return this.usersService.update(updatedUserDto, userid);
    }
    @Delete()

    async deleteAccount(@Body() user_id: string){
        return this.usersService.delete(user_id);
    }






}