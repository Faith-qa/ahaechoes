import {View, Text, Pressable, StyleSheet, ActivityIndicator, Modal} from "react-native";
import {Camera, CameraType} from "expo-camera";
import React, {useRef, useState} from "react";
import {RootState, AppDispatch} from "../../../../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {updateAlbum} from "../../../../../store/journals/journals.action";
import { Feather } from '@expo/vector-icons';


//import openCamera State
interface NewProps{
    vidVisible: boolean
}


const RecordVideo: React.FC<NewProps> = ({vidVisible}) =>{
    const {journUri, loading} = useSelector((state: RootState)=>state.journal)
    const [recording, setIsrecording] = useState(false)
    const cameraRef = useRef<Camera>()
    const [video, setVideo] = useState(journUri)
    const [camType, setCamType] = useState(CameraType.front)
    const [visible, setVisible] = useState(vidVisible)

    const dispatch = useDispatch<AppDispatch>()

    const startRecording = async() =>{
        //update recording state
        setIsrecording(true);
        if(cameraRef.current){
            try{
                const options = {
                    maxDuration: 300
                }
                cameraRef.current?.recordAsync(options)
                    .then((recordedVideo)=>{
                        setVideo(recordedVideo.uri)
                        setIsrecording(false)
                        setVisible(false)

                    })
            }catch(err){
                throw err
            }
        }

    //stop recording

    }
    const stopRecording = async()=>{
        setIsrecording(false)
        setVisible(false)
    }

    //save video
    const saveVideo = async() => {
        await dispatch(updateAlbum(video))
    }




    return(
        <Modal
            animationType="slide"
            visible={visible}
            transparent={true}>
            <Camera type={camType} style={styles.container}>
                <View>
                    <Pressable onPress={stopRecording}>
                        <Feather name="x" size={24} color="black" />
                    </Pressable>
                    <Pressable onPress={recording ? saveVideo : startRecording} style={styles.startStopCont}>
                        <View style={recording ? styles.stopButton: styles.startButton}>
                        </View>
                        {loading && (
                            <ActivityIndicator color={"red"} />
                        )}
                    </Pressable>

                </View>


            </Camera>
        </Modal>


    )

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "space-between",
        width: "100%",


    },
    startButton:{
        height: 50,
        width: 50,
        borderRadius: 50,

    },
    stopButton:{
        height: 50,
        width: 50,
        borderRadius: 20

    },
    startStopCont:{
        position: "absolute",
        bottom: 0,
        justifyContent: "center",
        alignItems: "center"
    }



})