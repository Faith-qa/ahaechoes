import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {updateAlbum, getMediaJournals} from "./journals.action";



interface JournalState {
    journUri: any;
    loading: boolean;
    mediaJournals: any[];
    error: any | null;


}
const initialState: JournalState = {
    journUri: "",
    loading: false,
    mediaJournals: [],
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
                state.journUri = action.payload
            })
            .addCase(updateAlbum.rejected, (state, action)=>{
                state.loading = false
                // @ts-ignore
                state.error = action.payload

            })
            .addCase(getMediaJournals.pending, (state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(getMediaJournals.fulfilled, (state, action)=>{
                state.loading = false
                state.loading = false
                state.mediaJournals = action.payload
            })
            .addCase(getMediaJournals.rejected, (state, action)=>{
                state.loading = false
                state.error = action.payload
            })

    }
})

export default journalsSlice.reducer