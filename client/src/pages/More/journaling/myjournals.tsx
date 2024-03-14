import React, { useEffect, useState } from "react";
import { useAnimatedValue, View, Text, Modal, Pressable, StyleSheet, Image, FlatList } from "react-native";
import { Entypo, MaterialIcons,FontAwesome, Feather, AntDesign } from '@expo/vector-icons';
import Takevideo from "./videoJoun/videojournaling";
import { greeting } from "../../../../utils/date";
import { Video } from "expo-av";
import {useSelector, useDispatch} from 'react-redux'
import { RootState } from "../../../store/store";
import {startVideoRecording, stopVideoRecording} from "../../../store/jounalActions"
interface NewProps {
    visible: boolean,
    onClose: () => void
}

const MyJournals: React.FC<NewProps> =({visible, onClose})=>{
    const recordVideo = useSelector((state:RootState)=> state.journalData.recordVideo)
    
    const dispatch = useDispatch()
    const [newAudio, isNewAudio] = useState(false);
    const [newDoc, isNewDoc] = useState(false);
    const [jmode, isJmodeOpen] = useState(false);
    //update video state
    const [videoList, setVideoList] = useState<Array<{videoUri: any}>>([]);
    
    //handle video journal
    const handleVideoJournal = (videoData: {videoUri: any})=>{
        console.log("this is video data",videoData);
        setVideoList((prevList)=>[...prevList, videoData])
    }


    // useEffect(()=>{
    //     setopened(visible);
    // }, [visible]);
    
    // handle video modal

    
    const openMode = () =>{
        isJmodeOpen(true);
    }
    const closeMode = ()=>{
        isJmodeOpen(false);
    }
    const launchJournalmode = (jmode: boolean) => {
        
            return(<Modal
            visible={jmode}><View style={styles.container}>
                <Pressable style={styles.XContainer} onPress={closeMode} >
                <Feather name="x-circle" size={24} color="black"/>
                </Pressable>
                <Text>How are you doing today</Text>
                <Pressable onPress={()=> dispatch(startVideoRecording())} style={styles.video}>
                        <Text>Take a video</Text>
            <Entypo name="video-camera" size={24} color="black" />
            </Pressable>
            <Takevideo newVideo={recordVideo} closeVideo={()=>{dispatch(stopVideoRecording())}} onVideoUpload={handleVideoJournal}/>
            <Pressable style={styles.video}>
                <Text>Record</Text>
            <MaterialIcons name="audiotrack" size={24} color="black" />
            </Pressable>
            <Pressable style={styles.video}>
                <Text>Write it down</Text>
            <FontAwesome name="pencil-square-o" size={24} color="black" />
            </Pressable>


            </View></Modal>)
        


    }


    return(
    <Modal
        animationType="slide"
        visible={visible}
       // transparent={true}
        ><View style={[styles.container]}>
            <Pressable style={styles.XContainer} onPress={()=> onClose()} >
                <Feather name="x-circle" size={24} color="black"/>
                </Pressable>
            <Image source={{uri: 'https://images.pexels.com/photos/18340828/pexels-photo-18340828/free-photo-of-man-in-traditional-north-american-indigenous-clothing.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load'}}
             style={styles.image} />
        <Text style={styles.gtext}>{greeting()}</Text>
        <View style={{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, alignSelf: "stretch"}}/>
        
        <Pressable onPress={openMode} >
            <AntDesign name="pluscircle" size={45} color="#DFBD43" />

            </Pressable>
            {launchJournalmode(jmode)}
            <FlatList
            data = {videoList}
            keyExtractor={(item, index)=>index.toString()}
            renderItem={({item})=>(
                <Video
                style={styles.videoCont}
                source={{uri: item.videoUri}}
                useNativeControls
                //resizeMode="contain"
                />
            )}/>
            
    </View></Modal>);

}

const styles = StyleSheet.create({
container:{
    //position: "relative",
        flex: 1,
        backgroundColor: 'rgba(255, 253, 244, 0.96)',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 20,
        gap: 10,
        //marginBottom: "80%",
        height: "100%"
        //alignSelf: "flex-start"

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
    videoCont:{
        width: "35%",
        height: 315,
    },
    video:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: 200,
        height: 50,
        //borderBlockColor: "brown",
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        margin: 10,
        shadowColor: 'rgba(255, 255, 255, 0.14)',
        shadowOffset:{
            width: 0,
            height: 16
        }}
})

export default MyJournals;
