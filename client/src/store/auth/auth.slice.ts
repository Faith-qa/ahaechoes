import {createSlice} from '@reduxjs/toolkit';
import {loginUser, registerUser, updatePassword, updateProfile, validateExistingUser} from "./auth.actions";

import AsyncStorage from "@react-native-async-storage/async-storage";
import forgotPassword from "../../self/screens/forgotPassword";


//const userToken =  AsyncStorage.getItem('userToken') ? AsyncStorage.getItem('userToken'): null

const initialState = {
    loading: false,
    forgotPassword: false,
    userExist: false,
    userInfo:{
        firstName: "",
        lastName: "",
        //preferredName: "",
        avatar: "",
        email: "",
        password: ""
    },
    userToken: null,
    error: null,
    success: false,
    userId: null,
    registered: true
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setForgotPassword: (state,action)=>{
            state.forgotPassword = action.payload
        },
        resetError:(state)=>{
            state.error = null
        },
        setUserExist: (state, action)=>{
            state.userExist = action.payload
        },
        setRegistered: (state, action)=> {
            state.registered = action.payload
        }

    },
    extraReducers:(builder)=>{
        builder
            .addCase(registerUser.pending,(state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action)=> {
                state.loading = false
                state.success = true
                // @ts-ignore
                state.userInfo = action.payload
                // @ts-ignore
                state.userId = action.payload._id

            })
            .addCase(registerUser.rejected, (state, action)=>{
                state.loading = false;
                // @ts-ignore
                state.error = action.payload
            })
            //login user
            .addCase(loginUser.pending, (state)=>{
                state.loading = true
                state.error = null

            })
            .addCase(loginUser.fulfilled, (state, action)=>{
                state.loading = false;
                state.userInfo = action.payload.user
                state.success = true
                state.userToken = action.payload.access_token
                state.userId = action.payload.user._id

            })
            .addCase(loginUser.rejected, (state, action)=>{
                state.loading = false
                // @ts-ignore
                state.error = action.payload.message
            })
            //handle forgot password
            .addCase(validateExistingUser.pending, (state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(validateExistingUser.fulfilled, (state, action)=>{
                state.loading = false
                state.userExist = true
            })
            .addCase(validateExistingUser.rejected, (state, action)=>{
                state.loading = false
                //@ts-ignore
                state.error = action.payload.message
            })
            .addCase(updatePassword.pending, (state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(updatePassword.fulfilled, (state, action)=>{
                state.loading = false
                state.error = null
                state.userExist = false
                state.forgotPassword = false
            })
            .addCase(updatePassword.rejected, (state, action)=>{
                state.loading = false
                //@ts-ignore
                state.error = action.payload.message
            })
            .addCase(updateProfile.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = null;
                state.userInfo.avatar = action.payload.avatar
            })
            .addCase(updateProfile.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.rejected, (state, action)=>{
                state.loading = false;
                // @ts-ignore
                state.error = action.payload
            })




    }
})
export const {setForgotPassword, resetError, setUserExist, setRegistered} = authSlice.actions
export default  authSlice.reducer;
