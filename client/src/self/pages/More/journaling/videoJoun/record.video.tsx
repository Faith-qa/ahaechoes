import {View, Text, Pressable, StyleSheet, ActivityIndicator, Modal} from "react-native";
import {Camera, CameraType} from "expo-camera";
import React, {useEffect, useRef, useState} from "react";
import {RootState, AppDispatch} from "../../../../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {updateAlbum} from "../../../../../store/journals/journals.action";
import { Feather } from '@expo/vector-icons';
import * as MedaLibrary from "expo-media-library";


//import openCamera State
interface NewProps{
    vidVisible: boolean,
    onClose: ()=> void
}


const RecordVideo: React.FC<NewProps> = ({vidVisible, onClose}) =>{
    const {journUri, loading} = useSelector((state: RootState)=>state.journal)
    const [recording, setIsrecording] = useState(false)
    const cameraRef = useRef<Camera>(null)
    const [video, setVideo] = useState(journUri)
    const [camType, setCamType] = useState(CameraType.front)
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();
    const [hasAudioPermission, setHasAudioPermission] = useState<boolean>();
    const [hasMediaLibraryPermissions, setHasMediaLibraryPermissions] = useState<boolean>();

    const [isvisible, setVisible] = useState(false)



    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        (async() => {
            const camerPermissions = await Camera.requestCameraPermissionsAsync();
            const microprohonePermissions = await Camera.requestMicrophonePermissionsAsync();
            const mediaLibraryPermissions = await MedaLibrary.requestPermissionsAsync();
            setHasCameraPermission(camerPermissions.status === "granted");
            setHasAudioPermission(microprohonePermissions.status === "granted");
            setHasMediaLibraryPermissions(mediaLibraryPermissions.status === "granted")
            setVisible(vidVisible);





        })();
    }, [isvisible]);

    //confirm has camera permissions
    if (hasAudioPermission === undefined || hasCameraPermission === undefined){
        return(<Text>Requesting Permissions</Text>)
    } else if (!hasAudioPermission) {
        return(<Text>Permissions for microphone not granted</Text>)
    } else if (!hasCameraPermission) {
        return(<Text>Permissions for audio not granted</Text>)
    }

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
                        //setVisible(false)

                    })
            }catch(err){
                throw err
            }
        }

    //stop recording

    }
    console.log(video)
    const stopRecording = async()=>{
        setIsrecording(false)
        cameraRef.current?.stopRecording();
        onClose();
    }

    //save video
    const saveVideo = async() => {
        await dispatch(updateAlbum(video)) ? console.log("successfull") : console.log("not successful")
        onClose()
    }




    return(
        <Modal
            animationType="slide"
            visible={vidVisible}
            transparent={true}>

            <Camera style={styles.container} ref={cameraRef} type={camType}>
                <Pressable onPress={stopRecording}>
                    <Feather name="x" size={24} color="white" style={styles.end} />
                </Pressable>


                <Pressable onPress={recording ? saveVideo : startRecording} >
                    <View style={[styles.startButton, {backgroundColor: !recording ? "#fff": "clear"}]}>
                        <View style={recording ? styles.stopinButton : styles.inButton}></View>
                    </View>
                    {loading && <ActivityIndicator/>}
                </Pressable>



            </Camera></Modal>


    )

}

const styles= StyleSheet.create({
    container :{
        //flex: 1,
        height: "100%",
        width: "100%",
        flexDirection: "row",
        alignItems:"flex-end",
        justifyContent: "center",
        padding: 10,
    },
    buttonContainer:{
        width: 80,
        height:50,
        borderRadius: 40,
        //backgroundColor: "#fff",
        alignSelf:"flex-end",
        padding: 10

    },
    video: {
        flex: 1,
        alignSelf: "stretch",
    },
    startButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: '#fff',
        //backgroundColor: "#fff",
        alignItems: "center",
        borderWidth: 2,
        padding:10,

    },
    inButton: {
        width: 10,
        height: 10,
        backgroundColor: "#fff",

    },
    stopinButton: {
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: "red",
        margin: 3
    },
    end:{
        alignSelf: "flex-end",

    }


})

export default RecordVideo