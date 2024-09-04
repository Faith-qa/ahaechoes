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
    if (audList[audList.length-1] !== "caf"){
        return false
    }
    return true;
}

export const isVideoFile = (fileUri:string) => {
    let vidList = fileUri.split('.')
    if (vidList[vidList.length-1] !== "mp4"){
        return false
    }
    return true
}

export const isTextFile = (fileUri: string)=>{
    let txtList = fileUri.split('.')
    if (txtList[txtList.length -1] !== "txt"){
        return false
    }
    return true
}

