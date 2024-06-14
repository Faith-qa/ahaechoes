import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {retrieveToken} from "../auth/Authorization";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setError, setOpenErrorCard} from "../global/global.slice";
import {resetError} from "../auth/auth.slice";
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
    async ({challengeData, userId}: ThunkArg, {dispatch, rejectWithValue})=> {

        try{
            console.log("i'm here")
            dispatch(resetError())
            console.log("i'm made it here")


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

        }catch(err: any){
            console.log("i'm made it here")

            dispatch(setError(err.message));
            dispatch(setOpenErrorCard(true))


            return rejectWithValue("server returned" + err.message);
        }

    }
)
//view challenges(read)
//update challenges
//delete challenge