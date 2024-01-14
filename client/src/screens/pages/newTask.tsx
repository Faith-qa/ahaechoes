import React from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const NewTask: React.FC = () =>{
    


    return(
    <View style={styles.container}>
        <Text style={styles.title}>
            Create New Task
        </Text>
        <Text style={styles.title}>Task title</Text>
        
        <View style={styles.titleCont}>
            <TextInput style={styles.input}/>
        </View>
        <Text style={styles.title}>Task Details</Text>
        <View style = {styles.DetailsCont}>
            <TextInput style={styles.detailsIn}/>
        </View>
        <Text style={styles.title}>Time & Date </Text>
        <View>
        <Pressable>
        <Ionicons name="time-outline" size={24} color="#DFBD43" />
        </Pressable>
        <View><Text>18:20</Text></View>
        <Pressable>
            <Ionicons name="calendar-outline" size={24} color="#DFBD43" />
        </Pressable>
        <View><Text>15/12/2024</Text></View>

        </View>

        

    </View>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#black',
        alignItems: 'center',
        justifyContent: 'center',
      
      },
    title: {
        color:"#444",
        fontFamily: "Inter",
        fontSize:20,
        fontWeight: "600",
        lineHeight:27.5
    },

    titleCont: {
        width: 358,
        height: 48,
        flexShrink: 0
    },

    input: {
        color: "#444",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: 18.857,

    },
    DetailsCont: {
        width : 358,
        height: 82,
        flexShrink: 0
    },

    detailsIn: {
        color: "#444",
        fontFamily: "Inter",
        fontSize: 11,
        fontStyle: "normal",
        fontWeight: "400",
        lineheight: 18.857

    }


    })


export default NewTask;