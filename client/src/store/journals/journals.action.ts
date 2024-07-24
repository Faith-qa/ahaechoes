import {createAsyncThunk} from "@reduxjs/toolkit";
import * as MedaLibrary from 'expo-media-library'
import {MediaType} from "expo-media-library";

interface journMediaData {
    journUri: string;
    newName: string;
    //can be audio or video
}

//create or update album if it exists

export const updateAlbum = createAsyncThunk(
    'updateAlb',
    async({journUri, newName}: journMediaData, {rejectWithValue})=>{

        try{
        if (journUri ==="" || journUri === undefined){
            throw new Error('URI cannot be an empty string')
        }

            let journals = await MedaLibrary.getAlbumAsync('Journals')

            //create asset uri
        const asset = await MedaLibrary.createAssetAsync(journUri)
        //get album library if it exists

            console.log("video saved", asset)



        if (!journals) {
            journals = await  MedaLibrary.createAlbumAsync('Journals', asset)
            return journals
        }
        //add asset to album
        return await MedaLibrary.addAssetsToAlbumAsync(asset, journals, false)
        }catch(err: any){
            rejectWithValue(err.message);
        }

    }
)

//get assets from album

export const getMediaJournals = createAsyncThunk(
    'journals',
    async(_,{rejectWithValue})=>{
        try{
            const journals = await MedaLibrary.getAlbumAsync('Journal')
            if(!journals){
                throw Error('journal does not exists')
            }
            const {assets} = await MedaLibrary.getAssetsAsync({
                album: journals.id,
            });
            return assets;

        }catch(err: any){
            return rejectWithValue(err.message)
        }

    }

)

// create video

