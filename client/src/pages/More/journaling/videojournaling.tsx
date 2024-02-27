import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraType } from 'expo-camera';
import { Button, StyleSheet, Text, Pressable, View,Modal } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import {Video} from 'expo-av';

interface NewProps{
    newVideo: boolean,
    closeVideo: () => void
}
const Takevideo: React.FC<NewProps> = ({newVideo}) =>{
    const cameraRef = useRef<Camera>(null)
    const [visible, setVisible] = useState<boolean>(false);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();
    const [hasAudioPermission, setHasAudioPermission] = useState<boolean>();
    const [isRecording, setIsRecording] = useState(false);
    const [video, setVideo] = useState<any>();
    const [camType, setCamType] = useState(CameraType.front)

    //set default camera permissions

    useEffect(()=>{
         (async() => {
            const camerPermissions = await Camera.requestCameraPermissionsAsync();
            const microprohonePermissions = await Camera.requestMicrophonePermissionsAsync();
            setHasCameraPermission(camerPermissions.status === "granted");
            setHasAudioPermission(microprohonePermissions.status === "granted");
            setVisible(newVideo);





        })();
    }, [newVideo]);

    //confirm has camera permissions
    if (hasAudioPermission === undefined || hasCameraPermission === undefined){
        return(<Text>Requesting Permissions</Text>)
    } else if (!hasAudioPermission) {
        return(<Text>Permissions for microphone not granted</Text>)
    } else if (!hasCameraPermission) {
        return(<Text>Permissions for audio not granted</Text>)
    }

    // function to record video

    const recordVideo = async() =>{
        setIsRecording(true);
        if (cameraRef.current){
        try{
            const options = {
                maxDuration: 60
            }

            cameraRef.current.recordAsync(options).then((recordedVideo)=>{
                setVideo(recordedVideo);
                setIsRecording(false);

            })

        }catch(error) {
            console.error("error during recording:", error);
        }

    }};

    // function to stop recording  video

    const stopRecording = () =>{
        setIsRecording(false);
        setVisible(false);

        cameraRef.current?.stopRecording();
    }

    //function to swtich camera type to front or back
    const switchCam = () =>{
        setCamType(current => (current === CameraType.back ? CameraType.front : CameraType.back))
        console.log("hello i'm here")
    

    }

    // manipulate video file
    if(video){
        return(<SafeAreaView style={styles.container}>
            <Video
                style={styles.video}
                source={{uri: video.uri}}
                useNativeControls
                //resizeMode='contain'
                isLooping/>
                <Button title="share"/>
                <Button title="Discard" onPress={()=> setVideo(undefined)}/>
        </SafeAreaView>)
    }
    return (
        <Modal 
            animationType="slide"
            visible={visible}
            transparent={true}>
        <Camera style={styles.container} ref={cameraRef} type={camType}>
            
            <Pressable onPress={isRecording ? stopRecording : recordVideo} >
                <View style={[styles.startButton, {backgroundColor: !isRecording ? "#fff": "clear"}]}>
                <View style={isRecording ? styles.stopinButton : styles.inButton}></View>
                </View>
            </Pressable>

            

        </Camera></Modal>
    )
}

const styles= StyleSheet.create({
    container :{
        flex: 1,
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
    }

})

  export default Takevideo;
