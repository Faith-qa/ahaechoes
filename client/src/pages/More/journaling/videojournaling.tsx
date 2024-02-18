import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraType } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View,StatusBar } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import {Video} from 'expo-av';

const Takevideo: React.FC = () =>{
    const cameraRef = useRef<Camera>(null)
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();
    const [hasAudioPermission, setHasAudioPermission] = useState<boolean>();
    const [isRecording, setIsRecording] = useState(false);
    const [video, setVideo] = useState<any>();

    //set default camera permissions

    useEffect(()=>{
         (async() => {
            const camerPermissions = await Camera.requestCameraPermissionsAsync();
            const microprohonePermissions = await Camera.requestMicrophonePermissionsAsync();
            setHasCameraPermission(camerPermissions.status === "granted");
            setHasAudioPermission(microprohonePermissions.status === "granted");





        })();
    }, []);

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
        cameraRef.current?.stopRecording();
    }

    // manipulate video file
    if(video){
        return(<SafeAreaView>
            <Video
                source={{uri: video.uri}}
                useNativeControls
                //resizeMode='contain'
                isLooping/>
                <Button title="share"/>
                <Button title="Discard" onPress={()=> setVideo(undefined)}/>
        </SafeAreaView>)
    }
    return (
        <Camera ref={cameraRef}>
            <View>
                <Button title={isRecording ? "stop": "start"} onPress={isRecording ? stopRecording : recordVideo}/>
            </View>
        </Camera>
    )
}

const styles= StyleSheet.create({
    container :{
        flex: 1,
        alignItems:"center"
    }

})

  export default Takevideo;

