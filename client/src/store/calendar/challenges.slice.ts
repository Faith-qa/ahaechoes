
/* what happens in the load page*/

// load daily default habits/challenges
//new habit creation
// states goal
import {createSlice} from "@reduxjs/toolkit";
import {registerChallenge} from "./challenges.action";

const initialState = {
    loading: false,

    challenges: [{
        goal: "read 10 pages of a book",
        habitKind: "daily",
        tracker:{
            daily: {
                time: Date,
                reminderDay: ["Mon", "Tue", "Wed", "Thur", "Fri",]
            }
        },
        completed: 0
    },
        {
            goal: "exercise for 10 minutes",
            habitKind: "daily",
            tracker:{
                daily: {
                    time: Date,
                    reminderDay: ["Mon", "Tue", "Wed", "Thur", "Fri",]
                }
            }
        },
        {
            goal: "drink 2 glasses of water",
            habitKind: "daily",
            tracker:{
                daily: {
                    time: Date,
                    reminderDay: ["Mon", "Tue", "Wed", "Thur", "Fri",]
                }
            },
            completed: false
        },],


}


//create slice

const challengeSlice = createSlice({
    name: 'challenge',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
            .addCase(registerChallenge.pending, state => {
                state.loading = true

            })
    }
})

export default  challengeSlice.reducer;
