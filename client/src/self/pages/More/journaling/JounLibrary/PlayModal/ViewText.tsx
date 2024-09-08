import s from "../../textJoun/styles";
import {Image, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import React, {useState} from "react";
import {Feather} from "@expo/vector-icons";

interface NewProps{
    title: string;
    content: string;
    open: boolean;
    onClose: ()=>void;
}
const ViewText:React.FC<NewProps> = ({title, content, open, onClose}) =>{

    return(
        <Modal
            visible={open}
            transparent={true}
        >
        <View style={s.container}>
            <Pressable style={styles.XContainer} onPress={()=> onClose()} >
                <Feather name="x-circle" size={24} color="black"/>
            </Pressable>
            <View style={s.notebook}>
                <View style={s.titleCont}>
                    <Text style={s.input}>{title}</Text>
                </View>
                <View style={{borderBottomColor: "#dddddd", borderBottomWidth: 1}}/>
                <Text style={[s.input, {paddingVertical: 12, paddingHorizontal: 10}]}>{content}</Text>

            </View>
        </View></Modal>
    )
}

const styles = StyleSheet.create({
    XContainer:{
        display: "flex",
        justifyContent: "flex-end",
        //alignItems: "center",
        gap: 10,
        alignSelf: "center",
        padding: 20,
    }
})

export default ViewText;