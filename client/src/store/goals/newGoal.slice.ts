import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    color: "#FFE4C4",
    repeat: false,
    goal: "",
    openGoalModal: false,
    loading:false,
    error: null,

}

const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers:{
        setColor: (state, action)=>{
            state.color = action.payload
        },
        setOpenGoalModal:(state, action)=>{
            state.openGoalModal = action.payload
        }

    },
    extraReducers:()=>{}

})

export const {setColor,setOpenGoalModal} = goalSlice.actions

export default goalSlice.reducer;