import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import MyJournals from "../pages/More/journaling/myjournals";
import Takevideo from "../pages/More/journaling/videojournaling";

const More: React.FC = () => {
    const [visible, setVisible] = useState(false);

    const journal = () =>{
        setVisible(true);
    }

    const closejournal = () =>{
        setVisible(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageCont}>
            {/*<Image source={{uri: 'https://images.pexels.com/photos/18340828/pexels-photo-18340828/free-photo-of-man-in-traditional-north-american-indigenous-clothing.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load'}}
        style={styles.image} />

            <Text>
                Hi,
    </Text>*/}
            <View style={styles.jContainer}>
                <Text style={[styles.jText, {fontSize: 30, fontWeight: "normal"}]}>Your journals</Text>
                <Pressable style={styles.mcont} onPress={()=>journal()}>
                    <Text style={[styles.jText, {alignSelf: "center"}]} >New Entry</Text>
                </Pressable>
            </View>
            <MyJournals visible={visible} onClose={closejournal}/>
            <View style={styles.jContainer}>
            <Text style={[styles.jText, {fontSize: 30, fontWeight:"normal"}]}>Get inspired...</Text>
            </View>
            
                <Image source={{uri:'https://unsplash.com/photos/black-microphone-on-white-background-gKKB13zJ1ss'}}/>
            <View>

            </View>
            </View>
        </View>
    );
    
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(255, 253, 244, 0.96)',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    
    },
    image:{
        width: 70,
        height: 70,
        flexShrink:0,
        borderRadius: 70,
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