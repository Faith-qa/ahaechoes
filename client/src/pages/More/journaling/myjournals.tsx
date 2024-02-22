import React, { useEffect, useState } from "react";
import { useAnimatedValue, View, Text, Modal, Pressable, StyleSheet } from "react-native";
import { Entypo, MaterialIcons,FontAwesome, Feather } from '@expo/vector-icons';
import Takevideo from "./videojournaling";

interface NewProps {
    visible: boolean,
    onClose: () => void
}

const MyJournals: React.FC<NewProps> =({visible, onClose})=>{
    const [opened, setopened] = useState(false)
    const [newVideo, isNewVideo] = useState(false);
    const [newAudio, isNewAudio] = useState(false);
    const [newDoc, isNewDoc] = useState(false);


    useEffect(()=>{
        setopened(visible);
    }, [visible]);
    
    // handle video modal

    const openVideo = () =>{
        isNewVideo(true);
    }

    const closeVideo = () => {
        isNewVideo(false);
    }


    return(
    <Modal
        animationType="slide"
        visible={opened}
        transparent={true}
        ><View>
            <Pressable style={styles.XContainer} onPress={()=> onClose()} >
                <Feather name="x-circle" size={24} color="black"/>
                </Pressable>
        <Text>pick an input mode.</Text>
        <View>
            <Pressable onPress={openVideo}>
            <Entypo name="video-camera" size={60} color="black" />
            </Pressable>
            <Pressable>
            <MaterialIcons name="audiotrack" size={24} color="black" />
            </Pressable>
            <Pressable>
            <FontAwesome name="pencil-square-o" size={24} color="black" />
            </Pressable>
            <Takevideo newVideo={newVideo} closeVideo={closeVideo}/>

        </View>
    </View></Modal>);

}

const styles = StyleSheet.create({
    XContainer: {
        display: "flex",
        justifyContent: "flex-end",
        //alignItems: "center",
        gap: 10,
        alignSelf: "stretch"
    },
})

export default MyJournals;
