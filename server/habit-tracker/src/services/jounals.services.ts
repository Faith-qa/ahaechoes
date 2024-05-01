import {Model} from "mongoose";
import {Injectable, Inject} from "@nestjs/common";
import {Journal} from "../interfaces/journal.interface";
import {CreateJournalDto} from "../dto/Journals/create-journal.dto";
import {UpdateJournalDto} from "../dto/Journals/update-journal.dto";
import {NotFoundError} from "rxjs";

@Injectable()
export class JounalsServices{
    constructor(
        @Inject('JOURNAL_MODEL')
        private journalModel: Model<Journal>
    ) {}
    //create a journal

    async createJournal(createJournalDto: CreateJournalDto):Promise<Journal>{
        const newJournal = new this.journalModel(createJournalDto);
        return await newJournal.save();
    }
    //update a journal
    async updateJournal(updateJournalDto: UpdateJournalDto, journal_id: string): Promise<Journal>{
        const updatedJournal = await this.journalModel.findByIdAndUpdate(journal_id, UpdateJournalDto, {new: true});
        if(updatedJournal){
            return updatedJournal;
        }else{
            throw new NotFoundError('Journal entry does not exist')
        }
    }
    //find a journal
    async findOneJournal(journal_id: string): Promise<Journal>{
        const journal = await this.journalModel.findById(journal_id);
        if(journal){
            return journal;
        }else{
            throw new NotFoundError('journal not found')
        }
    }
    //delete a journal
    async deleteJournal(journal_id: string): Promise<void>{
        await this.journalModel.findByIdAndDelete(journal_id)
    }
    //list all my a journal
    async listMyJournals(user_id: string): Promise<Journal[]>{
        const journals = await this.journalModel.find({user: user_id});
        return journals;
    }
}