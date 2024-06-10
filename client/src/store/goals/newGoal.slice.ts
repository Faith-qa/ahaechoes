import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    color: "#FFE4C4",
    repeat: false,
    challenges: [{
        newChallenge: "read 10 pages of a book",
        tracker: 'Daily',
        frequency: 1,
        selectedDay: null,
        selectedDate: null,
        endDate: null
    },
        {
            newChallenge: "exercise for 10 minutes",
            tracker: 'Daily',
            frequency: 1,
            selectedDay: null,
            selectedDate: null,
            endDate: null
        },
        {
            newChallenge: "drink 2l of water",
            tracker: 'Daily',
            frequency: 1,
            selectedDay: null,
            selectedDate: null,
            endDate: null
        },
    ],
    openGoalModal: false,
    loading:false,
    error: null,
    openTracker: false


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
        },
        setOpenTracker: (state, action)=>{
            state.openTracker = action.payload
        }

    },
    extraReducers:()=>{}

})

export const {setColor,setOpenGoalModal,setOpenTracker} = goalSlice.actions

export default goalSlice.reducer;