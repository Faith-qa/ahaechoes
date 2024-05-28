import React, {useEffect, useRef, useState} from "react";
import {ActivityIndicator, Modal, Pressable, StyleSheet, Text, View} from "react-native";
import {Camera, CameraType} from "expo-camera";
import {AppDispatch, RootState} from "../../../../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {updateAlbum} from "../../../../../store/journals/journals.action";
import {Feather} from "@expo/vector-icons";
import {Video} from "expo-av";

interface NewProps {
    vidVisible: boolean;
    onClose: () => void;
}

const RecordVideo: React.FC<NewProps> = ({ vidVisible, onClose }) => {
    const { journUri, loading } = useSelector((state: RootState) => state.journal);
    const [recording, setRecording] = useState(false);
    const [videoUri, setVideoUri] = useState(journUri);
    const cameraRef = useRef<Camera>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();
    const [hasAudioPermission, setHasAudioPermission] = useState<boolean>();
    const dispatch = useDispatch<AppDispatch>();
    const [timer, setTimer] = useState(0);
    const [showPreview, setShowPreview] = useState(false); // Add state to control preview modal


    useEffect(() => {
        (async () => {
            const cameraPermissions = await Camera.requestCameraPermissionsAsync();
            const microphonePermissions = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraPermissions.status === "granted");
            setHasAudioPermission(microphonePermissions.status === "granted");
        })();
    }, []);

    const startRecording = async () => {
        setRecording(true);
        setTimer(0);
        const recordingResponse = await cameraRef.current?.recordAsync({ maxDuration: 300 });
        if(recordingResponse){
            const {uri} = recordingResponse;
            setVideoUri(uri);
            setRecording(false);
            setShowPreview(true); // Show preview modal after recording

        }

    };

    const stopRecording = () => {
        setRecording(false);
        cameraRef.current?.stopRecording();
    };

    const saveVideo = async () => {
        if (videoUri) {
            await dispatch(updateAlbum(videoUri));
            setShowPreview(false)
            onClose();
        }

    };

    const renderTimer = () => {
        if (recording) {
            return <Text style={styles.timerText}>{Math.floor(timer / 1000)}s</Text>;
        }
        return null;
    };

    const renderControls = () => {
        if (recording) {
            return (
                <Pressable onPress={stopRecording} style={styles.controlButton}>
                    <Feather name="stop-circle" size={48} color="red" />
                </Pressable>
            );
        }
        return (
            <Pressable onPress={startRecording} style={styles.controlButton}>
                <Feather name="video" size={48} color="white" />
            </Pressable>
        );
    };

    return (
        <Modal animationType="slide" visible={vidVisible} transparent={true}>
            <Camera style={styles.container} ref={cameraRef} type={CameraType.front}>
                {renderTimer()}

                <View style={styles.controlsContainer}>
                    {renderControls()}
                    {showPreview && (
                        <View style={styles.previewContainer}>
                            <Video source={{ uri: videoUri }} style={styles.previewVideo} />
                            <Pressable onPress={saveVideo} style={styles.saveButton}>
                                <Feather name="check-circle" size={48} color="green" />
                            </Pressable>
                        </View>
                    )}
                    <Pressable onPress={onClose} style={styles.closeButton}>
                        <Feather name="x" size={24} color="white" />
                    </Pressable>
                </View>
                {loading && <ActivityIndicator />}
            </Camera>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
    },
    controlsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 20,
        gap: 40
    },
    timerText: {
        color: "white",
        fontSize: 24,
        marginBottom: 10,
    },
    controlButton: {
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 50
    },
    previewContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    previewVideo: {
        width: "100%",
        height: "100%",
    },
    closeButton: {
        position: "absolute",
        top: 15,
        left: 20,

    },
    saveButton: {
        position: "absolute",
        top: 20,
        right: 20,
    },
});

export default RecordVideo;
