import React from "react";
import {View, Text, TouchableOpacity, TextInput} from "react-native";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import Icon from '../icon';
import {durationToStr} from "../utils/dateHepers";
import s from './styles';
import {colors} from "../styling";
import { Button } from '@rneui/themed';
import PropTypes from "prop-types";


interface NewProps {
    onStartRecording: ()=> void;
    onEndRecording : () => void;
    onCancelRecording: ()=> void;
    onSubmit: () => void;
    onCancelSave: ()=> void;
    audioName: string;
    setAudioName: (name:string)=> void;
    isRecording: any;
    isDoneRecording:boolean;
    durationMillis: number;
    fileUrl: string | null;
}
const RecordAudioScreenView:React.FC<NewProps> = ({
    onStartRecording,
    onEndRecording,
    onCancelRecording,
    onSubmit,
    onCancelSave,
    audioName,
    setAudioName,
    isDoneRecording,
    isRecording,
    durationMillis,
    fileUrl
                                                  }) => {
    if(isDoneRecording){
        return(
            <View style={s.inputContainer}>
                <TouchableOpacity
                    onPress={onCancelSave}
                    style={s.cancelCross}
                >
                    <Icon
                        size={36}
                        color={colors.red}
                        IconSet={Ionicons}
                        iconName="mid-close"
                    />
                </TouchableOpacity>
                <TextInput
                    style={s.inputStyle}
                    placeholder="Give a name for your audio"
                    value={audioName}
                    onChangeText={setAudioName}
                    underlineColorAndroid={colors.transparent}
                    autoCorrect={false}
                    onSubmitEditing={onSubmit}
                    returnKeyType="done"
                    autoFocus
                />
                <Button
                    titleStyle={s.submitText}
                    buttonStyle={s.submitButton}
                    title="Continue"
                    onPress={onSubmit}
                    disabled={!audioName}
                />

            </View>
        );
    } else if (isRecording) {
        return(
            <View style={s.container}>
                <View style={s.durationContainer}>
                    <Text style={s.durationText}>
                        {durationToStr(durationMillis)}
                    </Text>
                </View>
                <TouchableOpacity
                    style={[s.recordButton, s.recordingBackground]}
                    onPress={onEndRecording}
                >
                    <Icon
                        size={100}
                        color={colors.audio.recording}
                        IconSet={MaterialIcons}
                        iconName="stop"
                        iconStyle={[s.recordIcon]}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    return(
        <View style={s.container}>
            <TouchableOpacity
                style={[s.recordButton, s.startRecordButton]}
            >
                <Icon
                    size={50}
                    color={colors.audio.startRecordingIcon}
                    IconSet={MaterialIcons}
                    iconName="keyboard-voice"
                    iconStyle={[s.recordIcon]}
                />
            </TouchableOpacity>
        </View>
    );
};

/*RecordAudioScreenView.propTypes = {
    isRecording: PropTypes.bool,
    durationMillis: PropTypes.number,


}*/
export default RecordAudioScreenView;