import {Body, Controller, Post, Get, Patch, Param, Delete, UseGuards, HttpCode} from "@nestjs/common";
import {Journal} from "../interfaces/journal.interface";
import {JounalsServices} from "../services/jounals.services";
import {CreateJournalDto} from "../dto/Journals/create-journal.dto";
import {UpdateJournalDto} from "../dto/Journals/update-journal.dto";
import useRealTimers = jest.useRealTimers;

@Controller('journals')
export class JounalsControllers{
    constructor(
        private readonly journalServices: JounalsServices
    ) {}

    @Post(':userId')
    async createJournal(@Body() createJournalDto: CreateJournalDto, @Param('userId') userId: string):Promise<Journal>{
        const newJournalDto = {...createJournalDto, user: userId};
        return await this.journalServices.createJournal(newJournalDto);
    }

    @Patch(':userId/:journalId')
    async updateJournal(@Body() updateJournalDto: UpdateJournalDto, @Param('journalId') journalId:string, @Param('userId') userId: string): Promise<Journal>{
        const newUpdateDto = {...updateJournalDto, user: userId}
        return await this.journalServices.updateJournal(newUpdateDto, journalId);

    }

    @Get(':userId/:journalId')
    async getOneJournal(@Param('journalId') journalId: string):Promise<Journal>{
        return await this.journalServices.findOneJournal(journalId);
    }

    @Get(':userId')
    async getAllJournals(@Param('userId') userId: string): Promise<Journal[]>{
        return await this.getAllJournals(userId);
    }

    @Delete(':userId/:journalId')
    async deleteJournal(@Param('journalId') journalId: string): Promise<void>{
        await this.journalServices.deleteJournal(journalId);
    }
}