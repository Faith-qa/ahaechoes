import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
//import {retrieveToken} from "../auth/Authorization";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setError, setOpenErrorCard} from "../global/global.slice";
//import {resetError} from "../auth/auth.slice";
const api_URL = process.env.EXPO_PUBLIC_API_URI;

interface BaseChallenge{
    user: string;
    challenge: string;
    //completed?: [number];
    track: 'Daily'|'Weekly' | 'Monthly';
    commitForDays: number;

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
    challengeData?: newChallengeRegistration;
    userId?: string;
    date?: string;
}




//create challenge
export const creatChallenge = createAsyncThunk(
    'goal/new',
    async ({challengeData, userId}: ThunkArg, {dispatch, rejectWithValue})=> {

        try{
            console.log("i'm here")
            //dispatch(resetError())
            console.log("i'm made it here")


            //get token from async storage
            //const token = await retrieveToken();

            //set headers

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer xxx`
                }
            }

            const { data } = await axios.post(
                `${api_URL}/goals/${userId}`, challengeData, /*config*/
            )
            console.log("this is the data:", data)
            return data;

        }catch(err: any){
            console.log("")

            dispatch(setError("server returned" + err.message));
            dispatch(setOpenErrorCard(true))


            return rejectWithValue("server returned" + err.message);
        }

    }
)
//view challenges(read)

export const loadChallenges = createAsyncThunk(
    'goals',
    async({userId, date}: ThunkArg, {dispatch, rejectWithValue})=>{
        try{
            //dispatch(resetError())
            console.log("i'm made it here")


            //get token from async storage
           // const token = await retrieveToken();

            //set headers

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer xxx`
                }
            }

            // pull data from the api

            const {data} = await axios.get(`${api_URL}/goals/${userId}/${date}`, config)
            return data;


        }catch(err: any){
            return rejectWithValue("server returned" + err.message)
        }
    }
)
//update challenges
//delete challenge