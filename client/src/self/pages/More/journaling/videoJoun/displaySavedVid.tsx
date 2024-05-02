import { Video } from "expo-av"
import React, { useEffect, useState } from "react"
import { FlatList, StyleSheet } from "react-native"

interface NewProps{
    videoList: Array<{ videoUri: string }>; // Specify the type of videoList

}

const DisplayVideoJournal: React.FC<NewProps>=({videoList})=>{
    //const [videoJourn, setVideoJourn] = useState([]);
    const [currentVideoList, setCurrentVideoList] = useState(videoList)
    console.log("this is video data", videoList)

    /*useEffect(()=>{
        setCurrentVideoList(videoList);
    }, [videoList])*/


    return(
        <FlatList
            data = {videoList}
            keyExtractor={(item, index)=>index.toString()}
            renderItem={({item})=>(
                <Video
                style={styles.videoCont}
                source={{uri: item.videoUri}}
                useNativeControls
                />
            )}/>
    )

}

export default DisplayVideoJournal;

const styles = StyleSheet.create({
    videoCont:{
        width: "35%",
        height: 315,
    }

})