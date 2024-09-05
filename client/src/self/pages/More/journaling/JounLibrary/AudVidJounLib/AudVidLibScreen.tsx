import React, {useEffect, useState} from "react";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {Card} from "@rneui/base";
import s from "../textJournLib/styles";
import {isAudioFile} from "../../../../../../store/journals/utils";
import { ProgressBar } from 'react-native-paper';
import {useDispatch} from "react-redux";


interface AudVidNote {
    date: string;
    uri: string;
}
interface NewProps {
    processRawAudio: any
}
const AudiVidLibScreen:React.FC<NewProps>= ({
    processRawAudio
                                          }) => {
    const [playbackStatus, setPlaybackStatus] = useState(null)
    const [audVidNotes, setAudVidNotes] = useState<AudVidNote[]>()
    const [loading, setLoading] = useState<boolean>(true); // Loading state


    //useeffect to mount the content
    useEffect(() => {
        const fetchJournals = async()=> {
            try{
                const fetched = await processRawAudio()
                console.log("this is fetched", fetched)
                setAudVidNotes(fetched);
            }catch(err){
                console.error("error fetching media journals", err)
            }finally {
                setLoading(false)
            }

        };
        fetchJournals();
    }, [processRawAudio]);

    const handlePlayPause = () => {

    }

    const getProgress = () => {
        return 1

    }
//                            {playbackStatus ? `${Math.floor(playbackStatus.positionMillis / 1000)}s` : '0s'}

    const renderNoteItem = ({ item }: { item: AudVidNote }) => (
            <Card containerStyle={s.card}>
                {isAudioFile(item.uri) ?<View>
                        <Text style={s.title}>{item.date}</Text>
                    <TouchableOpacity onPress={handlePlayPause} style={s.button}>
                            <Text style={s.buttonText}>"isPlaying ? 'Pause' : 'Play'"</Text>
                        </TouchableOpacity>
                        <ProgressBar progress={getProgress()} color="#6200ee" style={s.progressBar} />
                        <Text style={s.time}>
                            {playbackStatus ? `${Math.floor(playbackStatus / 1000)}s` : '0s'}
                        </Text>
                    </View>
                    :null}


            </Card>
    );


    return(
        <FlatList
            data={audVidNotes}
            renderItem={renderNoteItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
        />
    )
}

export default AudiVidLibScreen;