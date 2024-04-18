import {Connection} from "mongoose";
import {JournalSchema} from "../schemas/journal.schema";

export const goalsProviders = [
    {
        provide: 'JOURNAL_MODEL',
        useFactory: (connection: Connection)=> connection.model('JOURNAL', JournalSchema),
        inject: ['DATABASE_CONNECTION']
    }
]