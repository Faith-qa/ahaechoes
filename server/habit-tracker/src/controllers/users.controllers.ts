import {
  Controller,
  Patch,
  Post,
  Body,
  Delete,
  Get,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/users/create-user.dto';
import { UsersService } from '../services/users.service';
import { AuthService } from '../auth/auth.service';
import { UpdateUserDto } from '../dto/users/update-user.dto';
import { User } from '../interfaces/user.interface';

@Controller('users')
export class UsersControllers {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    let hashPassword: string = '';
    await this.authService.hashPassword(createUserDto.password).then((res) => {
      hashPassword = res;
    });

    const updatedUserDto = { ...createUserDto, password: hashPassword };
    return this.usersService.create(updatedUserDto);
  }

  @Patch()
  async update(@Body() updatedUserDto: UpdateUserDto) {
    return this.usersService.update(updatedUserDto);
  }
  @Delete()
  async deleteAccount(@Body() user_id: string) {
    return this.usersService.delete(user_id);
  }

  @Get(':email')
  async findOne(@Param('email') email: string): Promise<User> {
    return await this.usersService.findOne(email);
  }

  @Patch('forgotPassword')
  async updatePassword(@Body() email: string, password: string): Promise<User> {
    return await this.authService.updatePassword(email, password);
  }
}
