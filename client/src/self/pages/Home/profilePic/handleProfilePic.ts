import * as ImagePicker from 'expo-image-picker';


export const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect:[4,3],
        quality: 1,
        base64: true
    })
    if(!result.canceled){
        let base64Img = `data:image/jpg;base64,${result.assets[0].base64}`;

        return base64Img;
    }
}
