import {createSlice} from "@reduxjs/toolkit";

export const initialState={
    error: null,
    openErrorCard: false

}

const globalStateSlice = createSlice({
    name: 'global',
    initialState,
    reducers:{
        resetError:(state)=>{
            state.error = null
        },
        setError: (state, action)=>{
            state.error = action.payload;
        },
        setOpenErrorCard: (state, action)=>{
            state.openErrorCard = action.payload;
        }
    },
    // extraReducers = ({})
})

export const {resetError, setError,setOpenErrorCard} = globalStateSlice.actions;
export default globalStateSlice.reducer;