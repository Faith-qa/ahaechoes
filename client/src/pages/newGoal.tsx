import React from "react";
import { View, Modal, StyleSheet, Pressable, Text, TextInput } from "react-native";
import { Ionicons, MaterialIcons} from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';

const NewGoal: React.FC=()=>{
    return(
        <Modal>
            <View style={styles.container}>
            <Pressable style={styles.XContainer}>
            <Ionicons name="arrow-back-circle-outline" size={24} color="black" />

            </Pressable>
                <Text style={styles.heading}>
                    Create New Goal
                </Text>

                <Text>What goal do you have in mind</Text>
                <TextInput/>
                <Text>What daily habits can you cultivate to achieve this goal</Text>
                <View>
                    <TextInput/>
                    <Pressable><MaterialIcons name="add-box" size={24} color="black" /></Pressable>
                </View>
                <Text>What timelines are you giving yourself.</Text>
                <Picker>
                    <Picker.Item label= "3 months" value="3 months"/>
                    <Picker.Item label= "6 months" value="6 months"/>
                    <Picker.Item label="1 year" value="I year"/>
                </Picker>
                <Text>In momments of doubt what would be your source of motivation</Text>
                <TextInput/>
                
            </View>

        </Modal>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 253, 244, 0.96)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30
      
      },
      XContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        //alignItems: "center",
        gap: 10,
        alignSelf: "flex-start"
    },
    title: {
        color:"#444",
        fontFamily: "Inter",
        fontSize:20,
        fontWeight: "600",
        lineHeight:27.5,
        marginTop:20,
        marginBottom:20,
        alignSelf:"flex-start"
    },
    heading: {
        color:"#444",
        fontFamily: "Inter",
        fontSize:20,
        fontWeight: "600",
        lineHeight:27.5,
        marginTop:20,
        marginBottom:20,
        //alignSelf:"flex-start"
    },


})

export default NewGoal;
