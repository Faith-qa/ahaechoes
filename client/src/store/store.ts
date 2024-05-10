import {configureStore,combineReducers} from "@reduxjs/toolkit";
import journalReducer from './journalReducers'
import authReducer from "./auth/auth.slice";
import challengeReducer from "./calendar/challenges.slice"
import journalsReducer from "./journals/journals.slice"


const rootReducer = combineReducers({
    journalData: journalReducer,
    auth: authReducer,
    challenge: challengeReducer,
    journal: journalsReducer
}); 
export const store = configureStore({
    reducer: rootReducer
})
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;



