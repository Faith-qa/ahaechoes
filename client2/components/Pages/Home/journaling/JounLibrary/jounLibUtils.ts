import {createDirectory, isTextFile} from "@/store/journals/utils";
import * as FileSystem from "expo-file-system";

type MediaItem = {
    index: any;
    type: 'txt'|'audio'|'video';
    uri: string;
}
//handle text file
export const handleTextUri = async(textdata:MediaItem) => {

    if (!isTextFile(textdata.uri)){
        return
    }

    try {


        const note =  await FileSystem.readAsStringAsync(textdata.uri, {encoding: FileSystem.EncodingType.UTF8});

        let Note = {
            date: textdata.index,
            note: note,

        }
        return Note;
    }catch(err: any){
        throw new Error(err.message)
    }

}

export  const getMediaItemUri = async(fileUri: string)=> {

    const dirUri = await createDirectory();
    const asset = `${dirUri}/${fileUri}`
    const fileInfo = await FileSystem.getInfoAsync(asset)
    return fileInfo.uri;
}
