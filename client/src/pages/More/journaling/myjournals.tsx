import React, { useEffect, useState } from "react";
import { useAnimatedValue, View, Text, Modal, Pressable } from "react-native";
import { Entypo, MaterialIcons,FontAwesome } from '@expo/vector-icons';
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


    return(<View>
        {opened ? <View>
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
    </View>: "" }</View>);

}

export default MyJournals;
