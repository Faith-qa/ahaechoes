import {Image, TouchableOpacity, View} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import s from './styles'

interface NewProps{
    uploadedProfile: string | undefined,
    uploadToCloudinary: ()=> Promise<void>
}

const ProfilePicScreen:React.FC<NewProps>= ({uploadedProfile, uploadToCloudinary}) => {
    console.log(uploadedProfile)

    return(
        <View style={s.container}>
            <TouchableOpacity onPress={async () => { await uploadToCloudinary() }} style={s.profileUp}>
                <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
            <Image source={uploadedProfile === undefined ? { uri: 'https://images.pexels.com/photos/18340828/pexels-photo-18340828/free-photo-of-man-in-traditional-north-american-indigenous-clothing.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load'}:
            {uri: uploadedProfile}}
                   style={s.image} />
        </View>
    )
}

export default ProfilePicScreen;