import {createSlice} from '@reduxjs/toolkit';
import {loginUser, registerUser} from "./auth.actions";
import AsyncStorage from "@react-native-async-storage/async-storage";


//const userToken =  AsyncStorage.getItem('userToken') ? AsyncStorage.getItem('userToken'): null

const initialState = {
    loading: false,
    userInfo:{},
    userToken: null,
    error: null,
    success: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(registerUser.pending,(state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action)=>{
                state.loading = false
                state.success = true
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
                state.userToken = action.payload.userToken
            })
            .addCase(loginUser.rejected, (state, action)=>{
                state.loading = false
                // @ts-ignore
                state.error = action.payload.message
            })



    }
})

export default  authSlice.reducer;
