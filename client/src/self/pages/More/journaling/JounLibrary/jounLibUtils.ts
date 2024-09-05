import {createDirectory, isTextFile} from "../../../../../store/journals/utils";
import * as FileSystem from "expo-file-system";

type MediaItem = {
    index: string;
    type: 'txt'|'audio'|'video';
    uri: string;
}
//handle text file
export const handleTextUri = async(fileUri: string) => {

    if (!isTextFile(fileUri)){
        return
    }

    try {
        const note =  await FileSystem.readAsStringAsync(fileUri, {encoding: FileSystem.EncodingType.UTF8});
        let Note = {
            date: "test",
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
