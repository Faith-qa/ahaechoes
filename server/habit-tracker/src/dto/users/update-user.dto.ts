import {Schema} from "mongoose";

export class UpdateUserDto{
    readonly firstName?: string;
    readonly lastName?: string;
    readonly preferredName?: string;
    readonly Avatar?: string;
    readonly email: string;
    readonly password?: string;
}