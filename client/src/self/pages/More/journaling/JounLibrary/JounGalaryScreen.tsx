import s, {width} from "./styles";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {Card} from "@rneui/base";
import React, {useEffect, useState} from "react";
import {ResizeMode, Video} from "expo-av";
import {Ionicons} from "@expo/vector-icons";
import ViewText from "./PlayModal/ViewText";

interface MediaItem  {
    index: any,
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
    const [openText, setOpenText] = useState(false)

    const closeText = () => {
        setOpenText(false)
    }

    useEffect(() => {
        const fetchJournals = async()=>{
            try{
                const fetched = await processJourns();
                console.log("these are fecch", fetched)
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
        return note.length > 50 ? note.substring(0, 100) + '...' : note;
    };

    const renderItem =  ({item}: {item: MediaItem})=>{
        if (item.type === 'txt') {
            return(
                <View>
                <TouchableOpacity style={s.item} onPress={()=>setOpenText(true)}>
                <Card containerStyle={s.image}>
                    <Text>{item.uri.date}</Text>
                    <Text>-----------------------</Text>
                    <Text>{truncateNote(item.uri.note)}</Text>
                </Card></TouchableOpacity>
                    <ViewText title={item.uri.date} content={item.uri.note} open={openText} onClose={closeText}/>
                </View>
            )
        }
        return(<TouchableOpacity style={s.item}>
            {item.type == 'video' ? (
                <Card containerStyle={s.image}>
                <Video
                    style={s.image}
                    source={{uri: item.uri}}
                    resizeMode={ResizeMode.COVER}
                    shouldPlay={false}/></Card>
            ):(

                <Card containerStyle={s.image}>
                    <Ionicons name="musical-notes" size={48} color={"black"}/>
                    <Text>Audio</Text>
                </Card>
            ) }
        </TouchableOpacity>)

    }
    return(

        <FlatList data={mediaData?.slice().reverse()}
                  renderItem={renderItem}
                  keyExtractor={(item, index)=> index.toString()}
                  numColumns={3}
        />

    )

}

export default JounGalaryScreen;