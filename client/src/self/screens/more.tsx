import React, { useState } from "react";
import {View, Text, StyleSheet, Image, Pressable, TouchableOpacity} from "react-native";
import MyJournals from "../pages/More/journaling/myjournals";
import Takevideo from "../pages/More/journaling/videoJoun/videojournaling";
import { useNavigation } from "@react-navigation/native";
import {useSelector, useDispatch} from 'react-redux'
import { RootState } from "../../store/store";
import { closeJournalSection, openJournalSection } from "../../store/jounalActions";
import PlayList from "../screens/spotifyPlaylist";
import {Link} from 'expo-router';

const More: React.FC = () => {
    //const [visible, setVisible] = useState(false);
    //const isJournalSectionVisible = useSelector((state: RootState) => state.journalData.isJournalSection)
    const [openJournals, setOpenJournal] = useState(false)

    const openJournalSection = () =>{
        setOpenJournal(true)
    }
    const closeJournalSection = () =>{
        setOpenJournal(false)
    }
    const openListenIn = () =>{
        return(<PlayList/>)
    }

    
    const dispatch = useDispatch();
    
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.imageCont}>
           
            <View style={styles.jContainer}>
                <Text style={[styles.jText, {fontSize: 30, fontWeight: "normal"}]}>Your journals</Text>
                <Pressable style={styles.mcont} onPress={()=> openJournalSection()}>
                    <Text style={[styles.jText, {alignSelf: "center"}]} >New Entry</Text>
                </Pressable>
            </View>
            <MyJournals visible={openJournals} onClose={()=>closeJournalSection()}/>
            <View style={styles.jContainer}>
            <Text style={[styles.jText, {fontSize: 30, fontWeight:"normal"}]}>Get inspired...</Text>
            </View>
            <View style={[styles.jContainer, {backgroundColor: "#019090", borderRadius: 10}]}>
                <Text style={[styles.jText, {fontSize: 20, fontWeight:"normal"}]}>Coffee chats with Amina</Text>
                <Image source={{uri:'https://images.unsplash.com/photo-1585102651425-8caf7848e44b?q=80&w=2962&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}} style={styles.image}/>
                </View>
                <TouchableOpacity onPress={()=>{openListenIn()}}>
                <View style={[styles.jContainer, {backgroundColor: "#BA4B41", borderRadius: 10, height: 125}]}>
                    <Text style={[styles.jText, {fontSize: 20, fontWeight:"normal", }]}>Listen in, your weekly pod</Text>
                    <Image source={require('../../../assets/headphones.webp')} style={styles.image}/>
                </View></TouchableOpacity>


            <View>

            </View>
            </View>
        </View>
    );
    
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    
    },
    image:{
        width: 100,
        height: 100,
        flexShrink:0,
        //borderRadius: 70,
        padding: 10,
    },
    imageCont:{
        position: "absolute",
        alignSelf:"flex-start",
        marginBottom: "80%",
        padding: 20,

        
    },
    jContainer :{
        width: 300,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection:"row",
        margin: 10,
        padding: 10,
        gap: 35

    },
    jText:{
        fontSize: 16,
        fontWeight: "bold",
        color: "#4D4117",

    },
    mcont:{
        width: 100,
        height: 50,
        borderRadius: 20,
        backgroundColor:"#DFBD43",
        alignItems: "center",
        padding: 12
    }
})

export default More;