import s from "./textJournLib/styles";
import {FlatList, Text, TouchableOpacity} from "react-native";
import {Card} from "@rneui/base";
import React, {useEffect, useState} from "react";
import {ResizeMode, Video} from "expo-av";
import {Ionicons} from "@expo/vector-icons";

interface MediaItem  {
    index: number,
    type: 'txt'|'audio'|'video';
    uri: any;
}
interface NewProps {
    processJourns: () => Promise<MediaItem[] | undefined>;
}

const JounGalaryScreen:React.FC<NewProps>= ({
    processJourns
                                            }
) => {
    const [mediaData, setMediaData] = useState<MediaItem[]>()
    const [loading, setLoading] = useState<boolean>(true); // Loading state


    useEffect(() => {
        const fetchJournals = async()=>{
            try{
                const fetched = await processJourns();
                if(fetched){
                    setMediaData(fetched)
                }
            }catch(err){
                console.error("error fetching journals", err)
            }finally {
                setLoading(false)

            }
        };
        fetchJournals()
    }, [processJourns]);

    const truncateNote = (note: string) => {
        return note.length > 255 ? note.substring(0, 100) + '...' : note;
    };

    const renderItem =  ({item}: {item: MediaItem})=>{
        if (item.type === 'txt') {
            return(
                <Card containerStyle={s.card}>
                    <Text style={s.title}>{item.uri.date}</Text>
                    <Text style={s.text}>{truncateNote(item.uri.note)}</Text>
                </Card>
            )
        }
        return(<TouchableOpacity>
            {item.type == 'video' ? (
                <Video
                    source={{uri: item.uri}}
                    resizeMode={ResizeMode.COVER}
                    shouldPlay={false}/>
            ):(
                <Card>
                    <Ionicons name="musical-notes" size={48} color={"black"}/>
                    <Text>Audio</Text>
                </Card>
            ) }
        </TouchableOpacity>)

    }
    return(
        <FlatList data={mediaData}
                  renderItem={renderItem}
                  keyExtractor={(item, index)=> index.toString()}
                  numColumns={3}/>
    )

}

export default JounGalaryScreen;