import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../services/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    const hashedPssword = await bcrypt.hash(password, salt);
    return hashedPssword;
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    const passValidation = await bcrypt.compare(password, user.password);
    if (!passValidation) throw new UnauthorizedException();
    const payload = { user: user };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async updatePassword(email: string, password: string): Promise<User> {
    const hashedPassword = await this.hashPassword(password);
    const updatedUserDto = {
      email: email,
      password: hashedPassword,
    };
    return await this.usersService.update(updatedUserDto);
  }
}
