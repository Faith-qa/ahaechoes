import {combineReducers, createStore} from 'redux';
import journalReducer from './journalReducers'


const rootReducer = combineReducers({
    journalData: journalReducer
}); 
export const store = createStore(rootReducer)
export type RootState = ReturnType<typeof rootReducer>;

