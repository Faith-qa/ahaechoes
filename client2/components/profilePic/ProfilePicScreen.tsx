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
            <Image source={uploadedProfile === undefined ? {uri: "https://images.unsplash.com/photo-1710896460187-ecaba345d0d9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}:{uri: uploadedProfile}}
                   style={s.image} />
        </View>
    )
}

export default ProfilePicScreen;