import React, {useEffect, useState} from "react";
import {View, Text, Modal, Pressable, StyleSheet, Image, FlatList, TouchableOpacity} from "react-native";
import { Entypo, MaterialIcons,FontAwesome, Feather, AntDesign } from '@expo/vector-icons';
import {useSelector, useDispatch} from 'react-redux'
//import {AppDispatch, RootState} from "../../../../store/store";
import * as MediaLibrary from "expo-media-library";
import RecordVideoScreenContainer from "./videoJoun/record_vid_cont";
import TextJournCont from "./textJoun";
import RecordAudioScreen from "./audioJoun/audioContainer";
import {useNavigation} from "@react-navigation/native";
import JournGalaryContainer from "./JounLibrary/JournGalaryContainer";
import ProfilePicContainer from "@/components/profilePic";
import s from './styles';
import { greeting } from "@/components/utils/ndate";

const MyJournals: React.FC =()=>{
    //const {userInfo} = useSelector((state:RootState)=> state.auth)
    
    //const dispatch = useDispatch<AppDispatch>()
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
            visible={jmode}><View style={s.container}>
                <Pressable style={s.XContainer} onPress={closeMode} >
                <Feather name="x-circle" size={24} color="black"/>
                </Pressable>
                <Text>How are you doing today</Text>
                <Pressable onPress={()=> openCam()} style={s.video}>
                        <Text>Take a video</Text>
            <Entypo name="video-camera" size={24} color="black" />
            </Pressable>
                {/*<RecordVideo vidVisible={newVideo} onClose={closeCam}/>*/}
                <RecordVideoScreenContainer vidVisible={newVideo} onClose={closeCam}/>

                <Pressable style={s.video}  onPress={()=> openAudio()}>
                <Text>Record</Text>
                 <MaterialIcons name="audiotrack" size={24} color="black" />
            </Pressable>
                <RecordAudioScreen audVisible={newAudio} onClose={closeAudion}/>
                <Pressable style={s.video} onPress={()=> openText()}>
                <Text>Write it down</Text>
            <FontAwesome name="pencil-square-o" size={24} color="black" />
            </Pressable>
                <TextJournCont onTextVisible={newDoc} onTextClose={closeDoc}/>
            </View></Modal>)
        


    }


    // @ts-ignore
    return(

        <View style={[s.container]}>

                {/*<Pressable style={s.XContainer} onPress={()=> onClose()} >
                <Feather name="x-circle" size={24} color="black"/>
                </Pressable>*/}
            <ProfilePicContainer/>
        <Text style={s.gtext}>{`${greeting()} Faith, how are you?`}</Text>
        <Pressable onPress={openMode} style={{}} >
            <AntDesign name="pluscircle" size={45} color="#DFBD43"  />
        </Pressable>
        {launchJournalmode(jmode)}
        <View style={{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, alignSelf: "stretch",     marginTop: 20,  // Add space after the line
        }}/>

            {/*}<TextLibContainer/>
        <AudVidLibContainer/>*/}


        <JournGalaryContainer/>
        </View>
    );

}


export default MyJournals;
