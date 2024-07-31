import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Camera, CameraType } from "expo-camera/legacy";
import { AppDispatch, RootState } from "../../../../../../store/store";

import { useDispatch, useSelector } from "react-redux";
import { updateAlbum } from "../../../../../../store/journals/journals.action";
import { Feather } from "@expo/vector-icons";
import { Video } from "expo-av";

interface NewProps {
    vidVisible: boolean;
    onClose: () => void;
}

const RecordVideo: React.FC<NewProps> = ({ vidVisible, onClose }) => {
    const [isRecording, setIsRecording] = useState(false);
    return(<></>)
}

export default RecordVideo;
