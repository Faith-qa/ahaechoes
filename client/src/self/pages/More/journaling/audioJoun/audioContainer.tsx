import React, {useCallback, useEffect, useState} from 'react';
import {Audio, InterruptionModeAndroid, InterruptionModeIOS} from 'expo-av';
import {useDispatch} from 'react-redux';
//import uuid from 'uuid';
import moment from 'moment';
import {updateAlbum} from "../../../../../store/journals/journals.action";
import {AppDispatch} from "../../../../../store/store";
import RecordAudioScreenView from "./RecordAudioScreen";
import {Modal} from "react-native";
//import { audioOperations } from '../../modules/audio';
//import screens from '../../navigation/screens';


interface RecordingStatus {
    durationMillis: number;
    isRecording: boolean;
    isDoneRecording: boolean;
}
interface NewProps {
    audVisible: boolean;
    onClose: () => void;
}
const RecordAudioScreen:React.FC<NewProps> = ({
    audVisible,
    onClose
                                              }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [recording, setRecording] = useState<any>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [durationMillis, setDurationMillis] = useState(0);
    const [isDoneRecording, setIsDoneRecording] = useState(false);
    const [fileUrl, setFileUrl] = useState(null);
    const [audioName, setAudioName] = useState('');
    const [permissionResponse, requestPermission] = Audio.usePermissions();




    const setAudioMode = useCallback(async (allowsRecordingIOS: boolean) => {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS,
                interruptionModeIOS: InterruptionModeIOS.DoNotMix,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
            });
        } catch (error) {
            console.log(error); // eslint-disable-line
        }
    }, []);

    // @ts-ignore
    const recordingCallback = useCallback(({ durationMillis, isRecording, isDoneRecording }) => {
        setDurationMillis(durationMillis);
        setIsRecording(isRecording);
        setIsDoneRecording(isDoneRecording);
    }, []);

    const onStartRecording = useCallback(async () => {
        console.log("on the onstart recording function")

        try {
            if(permissionResponse?.status !== 'granted'){
                console.log('Requesting permissions')
                await requestPermission()
            }
            if(!recording) {
                await setAudioMode(true);
                const newRecording = new Audio.Recording();
                newRecording.setOnRecordingStatusUpdate(recordingCallback);
                newRecording.setProgressUpdateInterval(200);
                setFileUrl(null);
                await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
                await newRecording.startAsync();
                setRecording(newRecording);

            } else {
                recording.setOnRecordingStatusUpdate(null);
                setRecording(null)
            }
            /*if (recording) {

                recording.setOnRecordingStatusUpdate(null);
                setRecording(null);
            }

            await setAudioMode(true);

            const newRecording = new Audio.Recording();
            newRecording.setOnRecordingStatusUpdate(recordingCallback);
            newRecording.setProgressUpdateInterval(200);

            setFileUrl(null);

            await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await newRecording.startAsync();

            setRecording(newRecording);*/
        } catch (error) {
            console.log(error); // eslint-disable-line
        }
    }, [recording, setAudioMode, recordingCallback]);

    const onEndRecording = useCallback(async () => {
        try {
            await recording.stopAndUnloadAsync();
            await setAudioMode(false);
        } catch (error) {
            console.log(error); // eslint-disable-line
        }

        if (recording) {
            const fileUrl = recording.getURI();
            recording.setOnRecordingStatusUpdate(null);
            setRecording(null);
            setFileUrl(fileUrl);
        }
    }, [recording, setAudioMode]);

    const onCancelRecording = useCallback(async () => {
        if (!recording) return;

        try {
            await recording.stopAndUnloadAsync();
        } catch (error) {
            // do nothing
        }

        recording.setOnRecordingStatusUpdate(null);
        setRecording(null);
    }, [recording]);

    const onSubmit = useCallback(async() => {
        if (audioName && fileUrl) {
            /*const audioItem = {
                id: uuid(),
                recordDate: moment().format(),
                title: audioName,
                audioUrl: fileUrl,
                duration: durationMillis,
            };*/
            try{
                await dispatch(updateAlbum({ journUri: fileUrl, newName: audioName })).unwrap();
                setAudioName('');
                setIsDoneRecording(false);
                onClose();

            }catch(err){console.error(err)}

            //navigation.navigate(screens.LibraryTab);
        }
    }, [audioName, fileUrl, durationMillis, dispatch, ])

    const onCancelSave = useCallback(() => {
        setAudioName('');
        setIsDoneRecording(false);
        setFileUrl(null);
    }, []);

    /*useEffect(() => {
        return () => {
            onCancelRecording();
            setRecording(null);
        };
    }, [onCancelRecording]);*/

    return (
        <Modal
            visible={audVisible}
            animationType={"slide"}
        >
        <RecordAudioScreenView
            onStartRecording={onStartRecording}
            onEndRecording={onEndRecording}
            onCancelRecording={onCancelRecording}
            onSubmit={onSubmit}
            onCancelSave={onCancelSave}
            audioName={audioName}
            setAudioName={setAudioName}
            isRecording={isRecording}
            isDoneRecording={isDoneRecording}
            durationMillis={durationMillis}
            fileUrl={fileUrl}
        /></Modal>
    );
};

export default RecordAudioScreen;