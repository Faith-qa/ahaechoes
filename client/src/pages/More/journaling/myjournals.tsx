import React, { useEffect, useState } from "react";
import { useAnimatedValue, View, Text, Modal, Pressable, StyleSheet, Image } from "react-native";
import { Entypo, MaterialIcons,FontAwesome, Feather } from '@expo/vector-icons';
import Takevideo from "./videojournaling";
import { DayOfTheWeek } from "expo-calendar";
import DaysOfWeekButtons from "../../Home/thisWeek";
import { greeting } from "../../../../utils/date";

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
       // transparent={true}
        ><View style={styles.container}>
            <Pressable style={styles.XContainer} onPress={()=> onClose()} >
                <Feather name="x-circle" size={24} color="black"/>
                </Pressable>
            <Image source={{uri: 'https://images.pexels.com/photos/18340828/pexels-photo-18340828/free-photo-of-man-in-traditional-north-american-indigenous-clothing.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load'}}
             style={styles.image} />
        <Text style={styles.gtext}>{greeting()}</Text>
        <View style={{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, alignSelf: "stretch"}}/>
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

    </View></Modal>);

}

const styles = StyleSheet.create({
container:{
    position: "relative",
        flex: 1,
        backgroundColor: 'rgba(255, 253, 244, 0.96)',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 20,
        gap: 10

},
    XContainer: {
        display: "flex",
        justifyContent: "flex-end",
        //alignItems: "center",
        gap: 10,
        alignSelf: "center",
        padding: 20,

    },
    image:{
        width: 70,
        height: 70,
        flexShrink:0,
        borderRadius: 70,
        padding: 20,
        //alignSelf: "flex-start"
    },
    gtext:{
        flexDirection: 'row', // inline-flex equivalent
        padding: 4,
        alignItems: 'flex-start',
        justifyContent: 'flex-start', // align-items equivalent for main axis
        gap: 8,
        //color: '#FFF',
        fontFamily: 'Rubik',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
       // padding: 10,
      //  lineHeight: 25,
    },
})

export default MyJournals;
