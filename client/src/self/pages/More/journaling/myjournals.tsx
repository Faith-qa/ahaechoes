import React, {useEffect, useState} from "react";
import {View, Text, Modal, Pressable, StyleSheet, Image, FlatList, TouchableOpacity} from "react-native";
import { Entypo, MaterialIcons,FontAwesome, Feather, AntDesign } from '@expo/vector-icons';
import { greeting } from "../../../../../utils/ndate";
import {useSelector, useDispatch} from 'react-redux'
import {AppDispatch, RootState} from "../../../../store/store";
import * as MediaLibrary from "expo-media-library";

import RecordVideoScreenContainer from "./videoJoun/record_vid_cont";
import TextJournCont from "./textJoun";
import RecordAudioScreen from "./audioJoun/audioContainer";
import {useNavigation} from "@react-navigation/native";
import JournGalaryContainer from "./JounLibrary/JournGalaryContainer";
import ProfilePicContainer from "../../Home/profilePic";

interface NewProps {
    visible: boolean,
    onClose: () => void,
}

const MyJournals: React.FC<NewProps> =({ visible, onClose})=>{
    const {userInfo} = useSelector((state:RootState)=> state.auth)
    
    const dispatch = useDispatch<AppDispatch>()
    const [newAudio, isNewAudio] = useState(false);
    const [newDoc, isNewDoc] = useState(false);
    const [jmode, isJmodeOpen] = useState(false);
    const [newVideo, isNewVideo] = useState(false)
    //update video state
    const [videoList, setVideoList] = useState<Array<{videoUri: any}>>([]);

    const navigation = useNavigation()
    //handle video journal

    const openJounNavigation = () => {

        // @ts-ignore
        navigation.navigate('Journals', {
            screen: 'TextJouns',
        });    }

    useEffect(() => {
        (async () => {
            await MediaLibrary.requestPermissionsAsync().then(()=>{
                console.log("permission granted")
            });
        })
    }, []);
    const openCam = () => {
        isNewVideo(true)
    }
    const handleVideoJournal = (videoData: {videoUri: any})=>{
        console.log("this is video data",videoData);
        setVideoList((prevList)=>[...prevList, videoData])
    }
    const openAudio = () => {
        isNewAudio(true)
    }
    const closeAudion= () => {
        isNewAudio(false)
    }

    const openText = () => {
        isNewDoc(true)
    }

    const closeDoc = () => {
        isNewDoc(false)
    }
    const closeCam = () =>{
        isNewVideo(false)
    }



    
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
                <Pressable onPress={()=> openCam()} style={styles.video}>
                        <Text>Take a video</Text>
            <Entypo name="video-camera" size={24} color="black" />
            </Pressable>
                {/*<RecordVideo vidVisible={newVideo} onClose={closeCam}/>*/}
                <RecordVideoScreenContainer vidVisible={newVideo} onClose={closeCam}/>

                <Pressable style={styles.video}  onPress={()=> openAudio()}>
                <Text>Record</Text>
                 <MaterialIcons name="audiotrack" size={24} color="black" />
            </Pressable>
                <RecordAudioScreen audVisible={newAudio} onClose={closeAudion}/>
                <Pressable style={styles.video} onPress={()=> openText()}>
                <Text>Write it down</Text>
            <FontAwesome name="pencil-square-o" size={24} color="black" />
            </Pressable>
                <TextJournCont onTextVisible={newDoc} onTextClose={closeDoc}/>
            </View></Modal>)
        


    }


    // @ts-ignore
    return(
    <Modal
        animationType="slide"
        visible={visible}
       // transparent={true}

        >

        <View style={[styles.container]}>
            <Pressable style={styles.XContainer} onPress={()=> onClose()} >
                <Feather name="x-circle" size={24} color="black"/>
                </Pressable>
            <ProfilePicContainer/>
        <Text style={styles.gtext}>{`${greeting()}${userInfo.firstName}, how are you?`}</Text>
        <Pressable onPress={openMode} style={{}} >
            <AntDesign name="pluscircle" size={45} color="#DFBD43"  />
        </Pressable>
        {launchJournalmode(jmode)}
        <View style={{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, alignSelf: "stretch",     marginBottom: 20, // Add space after the line
        }}/>

            {/*}<TextLibContainer/>
        <AudVidLibContainer/>*/}

    </View>
        <JournGalaryContainer/>

    </Modal>);

}

const styles = StyleSheet.create({
container:{
    //position: "relative",
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'flex-start',
        //justifyContent: 'center',
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
        fontFamily: 'Raleway_400Regular',
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
