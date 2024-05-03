import {configureStore,combineReducers} from "@reduxjs/toolkit";
import journalReducer from './journalReducers'
import authReducer from "./auth/auth.slice";


const rootReducer = combineReducers({
    journalData: journalReducer,
    auth: authReducer,
}); 
export const store = configureStore({
    reducer: rootReducer
})
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;



