import {createSlice} from "@reduxjs/toolkit";
import {updateAlbum, getMediaJournals} from "./journals.action";


const initialState = {
    journUri: "",
    loading: false,
    journals:[],
    error: null,
}

const journalsSlice = createSlice({
    name: 'journal',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(updateAlbum.pending,(state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(updateAlbum.fulfilled, (state, action)=>{
                state.loading = false
                // @ts-ignore
                state.journUri = action.payload
            })
            .addCase(updateAlbum.rejected, (state, action)=>{
                state.loading = false
                // @ts-ignore
                state.error = action.payload

            })

    }
})

export default journalsSlice.reducer