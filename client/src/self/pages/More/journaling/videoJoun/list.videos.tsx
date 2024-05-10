import {Video} from "expo-av";
import {RootState, AppDispatch} from "../../../../../store/store";
import {getMediaJournals} from "../../../../../store/journals/journals.action";
import {useSelector, useDispatch} from "react-redux";
import {FlatList, StyleSheet} from "react-native";
import {useEffect, useState} from "react";



const ListVideos:React.FC = () =>{
    const {journals} = useSelector((state: RootState)=> state.journal)
    const [videoList, setVideoList] = useState<string[]>()

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getMediaJournals)
    }, []);

    useEffect(() => {
        setVideoList(journals)
    }, [journals]);


    return (
        <>
            <FlatList
                data={videoList}
                keyExtractor={(item, index) => index.toString()} // Provide a unique key
                renderItem={({ item }) => (
                    <Video
                        source={{ uri: item }}
                        style={styles.vidCont}
                        // Other props for the Video component...
                    />
                )}
            />
        </>
    );
}

const styles = StyleSheet.create({
    vidCont: {
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 10,
            margin: 10,
            padding: 10,
            backgroundColor: '#fff',
        },

})

export default ListVideos;