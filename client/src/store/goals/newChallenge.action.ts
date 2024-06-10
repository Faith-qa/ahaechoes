import {createAsyncThunk} from "@reduxjs/toolkit";


interface BaseChallenge{
    user: string;
    challenge: string;
    completed: [number];
    track: 'Daily'|'Weekly' | 'Monthly';
    frequency: number;
    endDate: Date;

}
interface DailyChallenge extends BaseChallenge{
    track: 'Daily';
    frequencyDays: number;
}
interface  weeklyChallenge extends BaseChallenge{
    track: "Weekly";
    frequencyWeeks: number;
}
interface monthlyChallenge extends BaseChallenge{
    track: "Monthly";
    frequencyMonths: number;
}

type newChallengeRegistration = DailyChallenge | weeklyChallenge | monthlyChallenge;


//create challenge
//view challenges(read)
//update challenges
//delete challenge