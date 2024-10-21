import {configureStore,combineReducers} from "@reduxjs/toolkit";
import journalReducer from './journalReducers'
//import authReducer from "./auth/auth.slice";
import challengeReducer from "./calendar/challenges.slice"
import journalsReducer from "./journals/journals.slice"
import goalReducer from "./goals/newGoal.slice"
import globalReducer from './global/global.slice';


const rootReducer = combineReducers({
    //journalData: journalReducer,
    //auth: authReducer,
    goal: goalReducer,
    challenge: challengeReducer,
    journal: journalsReducer,
    globalState: globalReducer
}); 
export const store = configureStore({
    reducer: rootReducer
})
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;



