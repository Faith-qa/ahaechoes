import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {retrieveToken} from "../auth/Authorization";
import axios from "axios";

const api_URL = process.env.EXPO_PUBLIC_API_URI;
interface BaseChallenge{
    user: string;
    challenge: string;
    completed?: [number];
    track: 'Daily'|'Weekly' | 'Monthly';
    endDate: Date;

}
export interface DailyChallenge extends BaseChallenge{
    track: 'Daily';
    frequencyDays?: number;
}
export interface  weeklyChallenge extends BaseChallenge{
    track: "Weekly";
    frequencyWeeks?: number;
    dayofWeek?: string;
}
export interface monthlyChallenge extends BaseChallenge{
    track: "Monthly";
    frequencyMonths?: number;
    daysofMonth?: number;
}

export type newChallengeRegistration = DailyChallenge | weeklyChallenge | monthlyChallenge ;
interface ThunkArg {
    challengeData: newChallengeRegistration;
    userId: string;
}



//create challenge
export const creatChallenge = createAsyncThunk(
    'goal/new',
    async ({challengeData, userId}: ThunkArg, {rejectWithValue})=> {

        try{
            //get token from async storage
            const token = retrieveToken();

            //set headers

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axios.post(
                `${api_URL}/goals/${userId}`, challengeData, config
            )

            return data;

        }catch(err){
            return rejectWithValue(err);
        }

    }
)
//view challenges(read)
//update challenges
//delete challenge