import {Camera, CameraType} from "expo-camera/legacy";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {Video} from "expo-av";
import {AppDispatch} from "../../../../../../store/store";
import {updateAlbum} from "../../../../../../store/journals/journals.action";
import RecordVideoScreen from "./RecordvideoScreen";
import {Modal} from "react-native";
import * as MediaLibrary from "expo-media-library";

interface NewProps {
    vidVisible: boolean;
    onClose: () => void;
}
const RecordVidCont: React.FC<NewProps> = ({vidVisible, onClose}) => {
    const [cameraType, setCameraType] = useState(CameraType.front);
    const [isRecording, setIsRecording] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [duration, setDuration] = useState(0);
    const [fileUri, setFileUri] = useState<any>(null);
    const [videoName, setVideoName] = useState('');
    const [isDoneRecording, setIsDoneRecording] = useState(false);

    const cameraRef = useRef<Camera>(null);
    const dispatch = useDispatch<AppDispatch>();
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();
    const [hasAudioPermission, setHasAudioPermission] = useState<boolean>();
    const [hasMediaLibraryPermissions, setHasMediaLibraryPermissions] = useState<boolean>();

    useEffect(() => {
        (async () => {
            const cameraPermissions = await Camera.requestCameraPermissionsAsync();
            const microphonePermissions = await Camera.requestMicrophonePermissionsAsync();
            const mediaLibraryPermissions = await MediaLibrary.requestPermissionsAsync();

            setHasCameraPermission(cameraPermissions.status === "granted");
            setHasAudioPermission(microphonePermissions.status === "granted");
            setHasMediaLibraryPermissions(mediaLibraryPermissions.status === "granted");

            console.log("Camera Permission:", cameraPermissions.status);
            console.log("Microphone Permission:", microphonePermissions.status);
            console.log("Media Library Permission:", mediaLibraryPermissions.status);
        })();
    }, [vidVisible]);



    useEffect(() => {
        return () => {
            if(isRecording) stopRecording();
        }
    }, [isRecording]);

    //use camera permissions:


    // toggle camera
    const toggleCameraType = () => {
        setCameraType(prevType =>
        prevType === CameraType.front ? CameraType.front : CameraType.back)
    };

    const handleCameraReady = () =>{
        setIsCameraReady(true);
    }
    const setVideoDuration = () => {
       intervalRef.current = setInterval(()=>{
           setDuration(prevDuration => prevDuration + 100);
       }, 100);
       setDuration(0);
    }

    const stopRecording = async() => {
        console.log('Recording stopped', fileUri);
        if(isRecording && cameraRef.current) {
            await cameraRef.current.stopRecording();
            setIsRecording(false);
            //clearInterval(intervalRef.current);
            if (intervalRef.current !== null){
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }

        }


    }
    const resetState = () => {
        setVideoName('');
        setIsDoneRecording(false);
        setDuration(0);
        setFileUri(null);
    };

    const onStartRecording = async() => {

        //console.log("let's do it")

        if(cameraRef.current) {
            setIsRecording(true)
            try{
                const options = {
                    quality: '4:3',
                    maxDuration: 100

                }

                await cameraRef.current.recordAsync(options).then((data)=>{
                    console.log("this is the recording,", data.uri);
                    setFileUri(data.uri)
                    setIsRecording(false)
                }).catch(err=> console.error(err.message))

                //console.log("i am here now")
                //console.log(recVid.uri)
                //setFileUri(recVid.uri)
            }catch(err: any){
                console.error("Error during recording:", err.message);
                //setIsRecording(false)

                throw Error(err.message)
            }
        } else {
            console.log("camera reference is null");
        }
        /*console.log("mama i made it")
        if(!isCameraReady) {
            console.log("I don't know what happened")
            handleCameraReady()
            console.log(cameraRef.current);
        }
        if(isCameraReady && cameraRef.current) {
            console.log("i made it here love")
            setIsRecording(true);
            setFileUri(null);
            setVideoDuration()
            const file = await cameraRef.current.recordAsync({
                quality: '4:3'
            })

            setFileUri(file.uri);

        } else {

        }*/


    };

    const onEndRecording = async() => {
        await stopRecording();
        setIsDoneRecording(true);
    }

    const toggleRecording = async() =>{
        if (isRecording) {
            await onEndRecording();
            console.log('helo i am ending')

        } else {
            await onStartRecording();
            //console.log('helo i am here')
        }
    }

const onSubmit = async() =>{
        console.log("required", videoName, fileUri);

        if (videoName && fileUri) {

            try {
                await dispatch(updateAlbum({ journUri: fileUri, newName: videoName })).unwrap();
                resetState();
                alert("Update successful!");  // Alert indicating success
            } catch (error) {
                console.error("Error updating album:", error);
                alert("Update failed. Please try again.");  // Alert indicating failure
            }
        }

}

const onCancelSave = () => {
        resetState();

}


    return(<Modal
        visible={vidVisible}
        animationType={"slide"}
    >
        <RecordVideoScreen
        cameraType={cameraType}
        cameraRef = {cameraRef}
        isRecording={isRecording}
        isCameraReady={isCameraReady}
        duration={duration}
        fileurl={fileUri}
        videoName={videoName}
        isDoneRecording={isDoneRecording}
        toggleCameraType={toggleCameraType}
        setCameraRef={cameraRef.current}
        handleCameraReady={handleCameraReady}
        toggleRecording={toggleRecording}
        onSubmit={onSubmit}
        onCancelSave={onCancelSave}
        stopRecording={stopRecording}
        setVideoName={setVideoName}
    /></Modal>)

}
export default RecordVidCont;