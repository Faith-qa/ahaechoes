import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/users/create-user.dto';
import { UpdateUserDto } from '../dto/users/update-user.dto';
import { NotFoundError } from 'rxjs';
import { CloudinaryService } from '../imageUpload-Cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
  constructor(
    private cloudinary: CloudinaryService,
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  //create new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    //find current user
    const existingUser = await this.userModel.findOneAndUpdate(
      { email: updateUserDto.email },
      updateUserDto,
      { new: true },
    );
    if (!existingUser) {
      throw new NotFoundError('user not found');
    }
    return existingUser;
  }
  async findOne(email: string): Promise<User> {
    console.log(email);
    const user = await this.userModel.findOne({ email: email });
    console.log(user);
    if (!user) {
      throw new NotFoundError('user not found');
    }
    return user;
  }

  async delete(user_id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(user_id);
  }

  async updateAvatar(email: string, avatar: string): Promise<User> {
    const existingUser = await this.userModel.findOneAndUpdate(
      { email: email },
      { Avatar: avatar },
      { new: true },
    );
    if (!existingUser) {
      throw new NotFoundError('user not found');
    }
    return existingUser;
  }
}
