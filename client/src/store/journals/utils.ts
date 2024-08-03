import * as FileSystem from 'expo-file-system'
export const createDirectory = async () => {
    const dirUri = FileSystem.documentDirectory + "Journals";

    const dirInfo = await FileSystem.getInfoAsync(dirUri);
    if(!dirInfo.exists){
        await FileSystem.makeDirectoryAsync(dirUri, {intermediates: true});
    }
    return dirUri;

}