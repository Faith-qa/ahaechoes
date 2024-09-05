import {createDirectory, isAudioFile, isVideoFile} from "../../../../../../store/journals/utils";
import * as FileSystem from "expo-file-system";
import {useEffect, useState} from "react";
import {getMediaJournals} from "../../../../../../store/journals/journals.action";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../../../store/store";
import AudioLibScreen from "./AudVidLibScreen";
import AudiVidLibScreen from "./AudVidLibScreen";


interface AudVidNote {
    date: string;
    uri: string;
}
const AudVidLibContainer:React.FC = () => {
    const [rawJournals, setRawJournals] = useState<string[]>([])


    const dispatch = useDispatch<AppDispatch>();
    //handle audio uri
    useEffect(() => {
        dispatch(getMediaJournals()).then((action) => {
            // Check if the action is fulfilled and contains the data
            if (getMediaJournals.fulfilled.match(action)) {
                // Set the state with the actual data
                setRawJournals(action.payload);
            } else {
                // Handle the rejected case or other statuses if necessary
                console.error('Failed to fetch journals');
            }
        });


    }, []);
    const handleAudioUri = async(fileUri: string) => {
        if(!isAudioFile(fileUri)){
            if(!(isVideoFile(fileUri))){
                return
            }
        }
        const dirUri = await createDirectory();
        const asset = `${dirUri}/${fileUri}`
        const fileInfo = await FileSystem.getInfoAsync(asset)
        let AudNote = {
            date: "test",
            uri: fileInfo.uri
        }
        return AudNote;
    }

    // return a list of audio file uri
    const processRawAudVid = async() => {
        console.log("raw Journals", rawJournals)
        let AudVids: AudVidNote[] = []
        if (rawJournals == undefined)
            return
        for(var i = 0; i < rawJournals.length; i++){
            const audioUri = await handleAudioUri(rawJournals[i]);

            if(audioUri){
                AudVids.push(audioUri)
            }

        }
        console.log(AudVids);
        return AudVids;
    }



    return(<AudiVidLibScreen processRawAudio={processRawAudVid}/>)
}
export default AudVidLibContainer;