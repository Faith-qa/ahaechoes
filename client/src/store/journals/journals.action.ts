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
            const asset = await MedaLibrary.createAssetAsync(journUri)
            //get album library if it exists
            console.log("asset created: ", asset);

            let journals = await MedaLibrary.getAlbumAsync('Journals')

            //create asset uri

        if (!journals || journals === null) {
            console.log("no journals, I am here")
            await  MedaLibrary.createAlbumAsync('Journals', asset, false).then((data)=>{
                console.log("jounals", data.assetCount)
                return "successful"

            }).catch((err)=>{
                throw Error(err.message)
            })

        }else  {
            console.log("journal exists adding asset to library")
            const assetMoved = await MedaLibrary.addAssetsToAlbumAsync(asset, journals, false)
            if(assetMoved){
                console.log("asset added successfully")
                return "successful"
            } else {
                throw Error("update unsuccessful")
            }

        }

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

