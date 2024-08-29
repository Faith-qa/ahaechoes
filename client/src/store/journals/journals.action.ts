import {createAsyncThunk} from "@reduxjs/toolkit";
import * as MedaLibrary from 'expo-media-library'
import {MediaType} from "expo-media-library";
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import {createDirectory} from "./utils";

interface journMediaData {
    name: string;
    filetype: 'video'| 'textFile' | 'audio',
    content?:string,
    vidAudUrl?:string
    //can be audio or video
}

//create or update album if it exists

export const updateAlbum = createAsyncThunk(
    'updateAlb',
    async ({ name, filetype, content, vidAudUrl }: journMediaData, { rejectWithValue }) => {
        try {
            const dirUri = await createDirectory();

            if (filetype === 'textFile' && content) {
                let fileUri = `${dirUri}/journal_${Date.now()}.txt`;
                await FileSystem.writeAsStringAsync(fileUri, content,{encoding: FileSystem.EncodingType.UTF8 })
                    .then(async()=>{
                        let fileInfo = await FileSystem.getInfoAsync(fileUri)
                        return fileInfo.uri

                    })
                //asset = await MedaLibrary.createAssetAsync(fileUri);


            } else{
                if(!vidAudUrl)
                    throw Error("invalid file")
                //asset = await MedaLibrary.createAssetAsync(vidAudUrl)
                let asset: any;
                if (filetype == 'audio'){
                    asset = `${dirUri}/recording-${Date.now()}.caf`
                }else {
                    asset = `${dirUri}/recording-${Date.now()}.mp4`

                }

                //move recording to document directory
                await FileSystem.moveAsync({
                    from: vidAudUrl,
                    to: asset
                }).then(async()=>{
                    let fileInfo = await FileSystem.getInfoAsync(asset)
                    console.log(fileInfo)
                    return fileInfo.uri;

                })
            }


            /*await MedaLibrary.getAlbumAsync('Journal')
                .then(async(album)=>{
                    if (album === null){
                        await MedaLibrary.createAlbumAsync('Journals', asset, false);
                    }else {
                        const assetAdded = await MedaLibrary.addAssetsToAlbumAsync(asset, 'Journal', false)
                        if(!assetAdded)
                            throw Error('adding asset failed')
                        return asset.uri
                    }
                })*/


        } catch (err: any) {
            console.error('Error in updateAlbum:', err.message); // Log error message
            return rejectWithValue(err.message); // Reject with the error message
        }
    }
);
//get assets from album

export const getMediaJournals = createAsyncThunk(
    'journals',
    async(_,{rejectWithValue})=>{
        try{
            const journaling = await FileSystem.readDirectoryAsync(await createDirectory());

            return journaling;

        }catch(err: any){
            return rejectWithValue(err.message)
        }

    }

)


// create video

