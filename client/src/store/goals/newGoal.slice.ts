import {createSlice} from "@reduxjs/toolkit";
import {creatChallenge} from "./newChallenge.action";

type CustomError = {
    message: string;
    code: number;
};
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
    extraReducers:(builder)=>{
        builder
            .addCase(creatChallenge.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(creatChallenge.rejected,(state, action)=>{
                state.loading = false;
                // @ts-ignore
                state.error = action.payload;

        })
            .addCase(creatChallenge.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = null;
                state.challenges.push(action.payload)
            })

    }

})

export const {setColor,setOpenGoalModal,setOpenTracker} = goalSlice.actions

export default goalSlice.reducer;