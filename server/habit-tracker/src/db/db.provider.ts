import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const db = process.env.db_CONNECTOR;
console.log('hello', db);
if (db === undefined){
    console.log('sorry')
    throw new Error('bye')
}
export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<typeof mongoose> =>

            await mongoose.connect(db),
    },
];