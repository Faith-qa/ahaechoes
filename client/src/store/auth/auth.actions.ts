import axios from 'axios';
import {createAsyncThunk} from "@reduxjs/toolkit";
import AsyncStorage, {useAsyncStorage} from "@react-native-async-storage/async-storage";
import {retrieveToken} from "./Authorization";
import {pickImage} from "../../self/pages/Home/profilePic/handleProfilePic";

const api_URL = process.env.EXPO_PUBLIC_API_URI;
if (api_URL === undefined) throw new Error('api url unreachable')
//registration data
interface userRegistrationData {
firstName: string;
lastName: string;
preferredName?: string;
avatar?: string | null;
email: string;
password: string;
}
interface userUpdateProfile {
    avatar: string;
    email: string;
}
//handle registration
interface userLoginData{
    email: string;
    password: string;
}
interface userUpdatePassword{
    email: string;
    newPassword: string;
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
            const token = retrieveToken();
            if (token !== null)
                await AsyncStorage.removeItem('userToken')

            await AsyncStorage.setItem('userToken', data.access_token);

            const profConfig = {
                headers: {
                    Authorization: `Bearer ${data.access_token}`,
                },}
            const profileResponse = await axios.get(
                `${api_URL}/auth/profile`, profConfig
            );
            console.log("these are tue",profileResponse.data)

            return profileResponse.data;
        }catch(err: any){
            return rejectWithValue(err);
        }
    }

)

export const validateExistingUser = createAsyncThunk(
    'auth/userExists',
    async(email: string, {rejectWithValue})=>{
        try {
            const config = {
                headers:{
                    'Content-Type': 'application/json'
                },

            }

            const {data} = await axios.get(
                `${api_URL}/users/${email}`,config

            )
            return data.email

        }catch(err){
            return rejectWithValue(err)
        }
    }
)

export const updatePassword = createAsyncThunk(
    'auth/updatePass',
    async(passdata: userUpdatePassword, {rejectWithValue})=>{
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const {data} = await axios.patch(
                `${api_URL}/forgotpassword`, passdata, config
            )
            return data;
        }catch(err){
            return rejectWithValue(err)
        }
    }
)

// @ts-ignore
export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async(profileData: userUpdateProfile, {rejectWithValue})=>{
        try{

            const token = await retrieveToken();

            //set headers

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await axios.patch(
                `${api_URL}/users`, profileData, config
            )
            console.log("mMm I MASW IT",data)

            return data;
        }catch(err){
            return rejectWithValue(err)
        }
    }
)