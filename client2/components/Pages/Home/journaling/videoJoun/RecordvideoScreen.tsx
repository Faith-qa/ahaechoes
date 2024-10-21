import { MutableRefObject, Dispatch, SetStateAction } from 'react';
import s from './styles';
import {colors} from "../styling";
import {View, Text, TouchableOpacity, TextInput} from "react-native";
import {Camera} from "expo-camera/legacy";
import {Ionicons, FontAwesome} from "@expo/vector-icons";
import { Button } from '@rneui/themed';
import Icon from "../icon";
import {durationToStr} from "../utils/dateHepers";


interface NewProps {
    cameraType: any;
    isRecording: boolean;
    cameraRef: any;
    duration: number;
    isCameraReady: boolean;
    toggleCameraType: ()=>void;
    fileurl: string;
    videoName: string;
    isDoneRecording: boolean;
    setCameraRef: any;
    toggleRecording: ()=>void;
    handleCameraReady: ()=>void;
    stopRecording: ()=>void;
    onSubmit: ()=>void;
    onCancelSave: ()=>void;
    setVideoName:Dispatch<SetStateAction<string>>;

}
const RecordVideoScreen: React.FC<NewProps> = (
    {
        cameraType,
        isRecording,
        isCameraReady,
        toggleCameraType,
        cameraRef,
        duration,
        toggleRecording,
        stopRecording,
        isDoneRecording,
        onSubmit,
        videoName,
        setVideoName,
        onCancelSave,
        setCameraRef,
        handleCameraReady
    }
)=> {
    if (isDoneRecording) {
        return (
            <View style={s.inputContainer}>
                <TouchableOpacity
                    onPress={onCancelSave}
                    style={s.cancelCross}>
                    <Icon size={36} IconSet={Ionicons} iconName="mdClose"/>
                </TouchableOpacity>
                <TextInput
                    style={s.inputStyle}
                    placeholder="Give a name for your video"
                    value={videoName}
                    onChangeText={setVideoName}
                    onSubmitEditing={onSubmit}
                    underlineColorAndroid={colors.transparent}
                    autoCorrect={false}
                    returnKeyType="done"
                    autoFocus/>
                <Button
                    titleStyle={s.submitText}
                    buttonStyle={s.submitButton}
                    title="Continue"
                    onPress={onSubmit}
                    disabled={!videoName}
                />
            </View>
        );
    }
    return(
        <View style={s.container}>
            <View style={s.innerContainer}>
                <Camera
                    type={cameraType}
                    onCameraReady={handleCameraReady}
                    style={s.camera}
                    ref={cameraRef}/>
                <View style={s.footer}>
                    {isRecording && (
                        <TouchableOpacity
                            style={s.left}
                            onPress={stopRecording}>
                            <Text style={s.cancel}>Cancel</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        style={[s.recordButton, s.center]}
                        onPress={toggleRecording}>
                        {isRecording ? (
                            <Icon IconSet={FontAwesome} iconName="stop"
                                  size={34} color={colors.recordVideo.recording}/>
                        ): (
                            <View style={s.record}/>
                        )}
                    </TouchableOpacity>
                    <View style={s.right}>
                        {isRecording ? (
                            <Text style={s.duration}>
                                {durationToStr(duration)}
                            </Text>
                        ): (
                            <TouchableOpacity onPress={toggleCameraType}>
                                <Icon size={62} IconSet={Ionicons} iconName={"camera-reverse-outline"}/>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </View>
    )

}

export default RecordVideoScreen;