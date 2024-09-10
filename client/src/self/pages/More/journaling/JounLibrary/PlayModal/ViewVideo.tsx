import {ResizeMode, Video} from "expo-av";
import {Modal, Pressable, View, StyleSheet} from "react-native";
import React from "react";
import {Card} from "@rneui/base";
import {Feather} from "@expo/vector-icons";

interface NewProps{
    openVid: boolean
    videoUri : string;
    isplaying: boolean;
    onClose: ()=>void
}
const ViewVideo: React.FC<NewProps> = ({
    videoUri,
    isplaying,
    onClose,
                                       openVid}) => {

    return(
        <Modal
        visible={openVid}>
            <Card>
                <Pressable style={styles.XContainer} onPress={()=> onClose}>
                    <Feather name="x-circle" size={24} color="black"/>
                </Pressable>
                <Video
                source={{ uri: videoUri }}
                style={styles.video}
                shouldPlay={isplaying}
                resizeMode= {ResizeMode.CONTAIN}
                useNativeControls={isplaying}
                //onLoad={onLoad}
                //onError={onError}
            /></Card></Modal>)

}


const styles = StyleSheet.create({
    XContainer: {
        display: "flex",
        justifyContent: "flex-end",
        //alignItems: "center",
        gap: 10,
        alignSelf: "center",
        padding: 20,

    },
    video: {
        width: "100%",
        height: "100%"
    },
    card: {
        width: 200,
        height: 200,

    }
})

export default ViewVideo;
