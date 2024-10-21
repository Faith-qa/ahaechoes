import {createSlice} from "@reduxjs/toolkit";
import {creatChallenge, loadChallenges} from "./newChallenge.action";
//import {useDispatch} from "react-redux";
import {setError, resetError, setOpenErrorCard} from "../global/global.slice";
//import Date from "../../../utils/date";



const initialState = {
    color: "#FFE4C4",
    repeat: false,
    challenges: [{
        challenge: "read 10 pages of a book",
        tracker: 'Daily',
        frequency: 1,
        selectedDay: null,
        selectedDate: null,
        endDate: null,
        commitForDays: 7
    },
        {
            challenge: "exercise for 10 minutes",
            tracker: 'Daily',
            frequency: 1,
            selectedDay: null,
            selectedDate: null,
            endDate: null,
            commitForDays: 7
        },
        {
            challenge: "drink 2l of water",
            tracker: 'Daily',
            frequency: 1,
            selectedDay: null,
            selectedDate: null,
            endDate: null,
            commitForDays: 7
        },
    ],
    openGoalModal: false,
    loading:false,
    openTracker: false,
    openCommitment: false,
    search_date: new Date().toISOString().split('T')[0]


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
        },
        setOpenCommitment: (state, action)=>{
            state.openCommitment = action.payload
        },
        setSearch_Date: (state, action)=>{
            state.search_date = action.payload
        }


    },
    extraReducers:(builder)=>{
        builder
            .addCase(creatChallenge.pending, (state)=>{
                state.loading = true;

            })
            .addCase(creatChallenge.rejected,(state, action)=>{
                state.loading = false;
                // @ts-ignore
                dispatch(setError(action.payload))
        })
            .addCase(creatChallenge.fulfilled, (state, action)=>{
                state.loading = false;
                console.log('action payload:', action.payload)
                state.challenges.push(action.payload)
                console.log("updated challenges,", state.challenges)
            })
            .addCase(loadChallenges.pending, (state)=>{
                resetError()
                state.loading = true;
            })
            .addCase(loadChallenges.fulfilled, (state, action)=>{

                if (action.payload.length > 0){
                    for (var i = 0; i < action.payload.length; i++){
                        state.challenges.push(action.payload[i]);
                    }
                }
                state.loading = false;
            })
            .addCase(loadChallenges.rejected, (state, action)=> {
                state.loading = false;
                setError(action.payload);
                setOpenErrorCard(true);
            })



    }

})

export const {setColor,setOpenGoalModal,
    setOpenTracker, setOpenCommitment, setSearch_Date} = goalSlice.actions

export default goalSlice.reducer;