import axios from 'axios';
import {createAsyncThunk} from "@reduxjs/toolkit";
import AsyncStorage, {useAsyncStorage} from "@react-native-async-storage/async-storage";

const api_URL = process.env.EXPO_PUBLIC_API_URI;
if (api_URL === undefined) throw new Error('api url unreachable')
//registration data
interface userRegistrationData {
firstName: string;
lastName: string;
preferredName?: string;
avatar?: string;
email: string;
password: string;
}
//handle registration
interface userLoginData{
    email: string;
    password: string;
}
export const registerUser = createAsyncThunk(
    'auth/register',
    async(userData: userRegistrationData, {rejectWithValue})=>{
        console.log("this is data", userData)
        try{
            const config = {
                headers: {
                    'Content-Type':'application/json'
                },
            }
            //console.log(`${api_URL}/users/signup`)
            const {data} = await axios.post(`${api_URL}/users/signup`, userData, config)
            return data;

        }catch(error){
            return rejectWithValue(error);
        }

    }
)

//handle login
export const loginUser = createAsyncThunk(
    'auth/login',
    async(userData: userLoginData, {rejectWithValue})=>{
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const {data} = await axios.post(
                `${api_URL}/auth/login`, userData, config
            )
            //console.log(data)

            await AsyncStorage.setItem('userToken', data.access_token);



            console.log(data)
            return data;


        }catch(err){
            return rejectWithValue(err);
        }
    }

)

