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
    async ({ journUri, newName }: { journUri: string, newName: string }, { rejectWithValue }) => {
        try {
            if (!journUri) {
                throw new Error('URI cannot be an empty string or undefined');
            }

            const asset = await MedaLibrary.createAssetAsync(journUri);
            console.log("Asset created: ", asset);

            let journals = await MedaLibrary.getAlbumAsync('Journals');

            if (!journals) {
                console.log("No Journals album found, creating one.");
                journals = await MedaLibrary.createAlbumAsync('Journals', asset, false);
                console.log("Journals album created: ", journals);
            } else {
                console.log("Journals album exists, adding asset to it.");
                await MedaLibrary.addAssetsToAlbumAsync([asset], journals.id, false).then((stat )=>{
                    if(stat){
                        console.log("this was successful")
                    }else{
                        console.log("unsuccessful")
                    }

                });

            }

            return asset.uri;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);
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

