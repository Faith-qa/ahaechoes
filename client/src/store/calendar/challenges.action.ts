import {createAsyncThunk} from "@reduxjs/toolkit";

const api_URL = "http://10.0.2.2:3000/auth";

interface challengeRegistration{
    user:string;
    goal: string;
    completed: [number];
    habitKind: 'daily'|'weekly'|'monthly';
    tracker:{
        daily?:{
            time:Date;
            reminderDays: string[];
        }
        weekly?: {
            reminderDay: string;
            time: Date;
        };
        monthly?:{
            week: number;
            day: string;
            time: Date;
        }
    }
}

export const registerChallenge = createAsyncThunk(
    'challenge/register',
    async(challengeData: challengeRegistration ,{rejectWithValue}):Promise<any>=>{
       console.log(challengeData);
       return challengeData
}
)

