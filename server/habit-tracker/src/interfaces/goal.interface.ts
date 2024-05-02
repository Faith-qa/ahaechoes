import { Document, Schema } from "mongoose";

export interface Goal extends Document {
   user: Schema.Types.ObjectId;
   goal: string;
   habitKind: 'daily' | 'weekly' | 'monthly';
   tracker: {
       daily?:{
           time: Date;
           reminderDays: string[];
       };
       weekly?: {
           reminderDay: string;
           time: Date;
       };
       monthly?:{
           week: number;
           day: string;
           time: Date;
       }
   };
   habits?: [any]
}