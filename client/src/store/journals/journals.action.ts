import {createAsyncThunk} from "@reduxjs/toolkit";
import * as MedaLibrary from 'expo-media-library'
import {MediaType} from "expo-media-library";
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import {createDirectory} from "./utils";
import mime from 'mime';
import * as worker_threads from "worker_threads";
import focusFieldBy from "react-hook-form/dist/logic/focusFieldBy";

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
            let fileUri: string;

            if (filetype === 'textFile' && content) {
                // Save text content to a file
                fileUri = `${dirUri}/${name}.txt`;
                const tmime = mime.getType(fileUri)
                if (tmime === null)
                    throw Error("invalid file")


                const uri = await FileSystem.StorageAccessFramework.createFileAsync(
                    dirUri,
                    name,
                    tmime
                );
                await FileSystem.writeAsStringAsync(uri, content)

                console.log(uri, "hello mama i made it")
                return uri;
            } else  if(vidAudUrl){
                const mimeT: string | null = mime.getType(vidAudUrl);
                if(mimeT === null){
                    throw Error("invalid")
                }
                const uri = await FileSystem.StorageAccessFramework.createFileAsync(
                    dirUri,
                    name,
                    mimeT
                );

                await FileSystem.writeAsStringAsync(uri, vidAudUrl, { encoding: FileSystem.EncodingType.Base64 });
                return uri; //
            }


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

