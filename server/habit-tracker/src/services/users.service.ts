import {Model} from "mongoose";
import {Injectable, Inject} from "@nestjs/common";
import {User} from "../interfaces/user.interface";
import {CreateUserDto} from "../dto/users/create-user.dto";
import {UpdateUserDto} from "../dto/users/update-user.dto";
import {NotFoundError} from "rxjs";

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<User>,
    ) {}

    //create new user
    async create(createUserDto: CreateUserDto): Promise<User>{

        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async update(updateUserDto: UpdateUserDto, user_id: string): Promise<User>{
        //find current user
        const existingUser = await this.userModel.findByIdAndUpdate(user_id, updateUserDto,{new: true});
        if (!existingUser){
            throw new NotFoundError('user not found');
        }
        return existingUser;

    }

    async findOne(email: string):Promise<User>{
        const user = await this.userModel.findOne({email: email});
        if(!user){
            throw new NotFoundError("user not found")
        }
        return user;
    }
    
    async delete(user_id: string): Promise<void>{
        await this.userModel.findByIdAndDelete(user_id);
    }



}