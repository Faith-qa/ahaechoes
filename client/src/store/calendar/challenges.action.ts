import {createAsyncThunk} from "@reduxjs/toolkit";

const api_URL = "http://10.0.2.2:3000/auth";

interface challengeRegistration{
    user:string;
    goal: string;
    completed: [number];
    habitKind: 'daily'|'weekly'|'monthly';
    tracker:{
        daily?:{
            time: string;
            reminderDays: string[];
        }
        weekly?: {
            reminderDay: string;
            time: string;
        };
        monthly?:{
            week: number;
            day: string;
            time: string;
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

