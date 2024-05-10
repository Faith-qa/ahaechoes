import {createAsyncThunk} from "@reduxjs/toolkit";
import * as MedaLibrary from 'expo-media-library'

interface journMediaData {
    journUri: string; //can be audio or video
}

//create or update album if it exists

export const updateAlbum = createAsyncThunk(
    'updateAlb',
    async(journUri: string, {rejectWithValue})=>{

        try{
        if (journUri ==="" || journUri === undefined){
            throw new Error('URI cannot be an empty string')
        }

        //create asset uri
        const asset = await MedaLibrary.createAssetAsync(journUri)
        //get album library if it exists


        let journals = await MedaLibrary.getAlbumAsync('Journals')

        if (!journals) {
            journals = await  MedaLibrary.createAlbumAsync('Journals', asset)
            return journals
        }
        //add asset to album
        await MedaLibrary.addAssetsToAlbumAsync(asset, journals, false)
        return await MedaLibrary.getAlbumAsync('Journal')
        }catch(err){
            rejectWithValue(err);
        }

    }
)

//get assets from album

export const getMediaJournals = createAsyncThunk(
    'journals',
    async()=>{
        try{
            const journals = await MedaLibrary.getAlbumAsync('Journal')
            if(!journals){
                throw Error('journal does not exists')
            }
            return await MedaLibrary.getAssetsAsync({album: journals});

        }catch(err){
            throw err
        }

    }

)

// create video

