import * as FileSystem from 'expo-file-system'
export const createDirectory = async () => {
    const dirUri = FileSystem.documentDirectory + "Journals";

    const dirInfo = await FileSystem.getInfoAsync(dirUri);
    if(!dirInfo.exists){
        await FileSystem.makeDirectoryAsync(dirUri, {intermediates: true});
    }
    return dirUri;

}

export const isAudioFile = (fileUri: string) => {

    let audList = fileUri.split('.')
    if (audList[-1] !== "caf"){
        return false
    }
    return true;
}

export const isVideoFile = (fileUri:string) => {
    let vidList = fileUri.split('.')
    if (vidList[-1] !== "mp4"){
        return false
    }
    return true
}

export const isTextFile = (fileUri: string)=>{
    let txtList = fileUri.split('.')
    if (txtList[-1] !== "txt"){
        return false
    }
    return true
}