import React from "react";

interface NewProps {
    onStartRecording: ()=> void;
    onEndRecording : () => void;
    onCancelRecording: ()=> void;
    onSubmit: () => void;
    onCancelSave: ()=> void;
    audioName: string;
    setAudioName: any;
    isRecording: any;
    isDoneRecording: any;
    durationMillis: number;
    fileUrl: string | null;
}
const RecordAudioScreenView:React.FC<NewProps> = () => {

    return(<></>)

}
export default RecordAudioScreenView;