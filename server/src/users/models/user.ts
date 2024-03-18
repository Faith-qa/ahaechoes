import {Schema, model, connect} from 'mongoose';

interface Iuser {
    firstname: string,
    lastname: string,
    preferredname: string,
    avatar?:string,
    email: string,
    password: string
}

const userSchema = new Schema<Iuser>({
    firstname:{
        type: String,
        require: true,
        min: 3,
        max: 256,
    },
    lastname:{
        type: String,
        require: true,
        min: 3,
        max: 256,
    },
    preferredname:{
        type: String,
        min: 3,
        max: 256,
    },
    email:{
        type: String,
        require: true,
        min: 6,
        max: 256,
    },
    avatar:{
        type: String,
        //require: true,
        
    },
    password:{
        type: String,
        require: true,
        min: 6,
        max: 1024,
    },

})

export const User = model<Iuser>('User', userSchema);