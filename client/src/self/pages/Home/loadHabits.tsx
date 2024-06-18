import React, {useEffect, useState} from "react";
import { StyleSheet, View, Text, FlatList, Pressable, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import getFormattedDate from "../../../../utils/date";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, Feather } from '@expo/vector-icons';
import {RootState} from "../../../store/store";
import {useSelector} from "react-redux";

const LoadHabits: React.FC = ()=>{
    const {challenges, loading} = useSelector((state: RootState)=> state.goal)
    const today = getFormattedDate();
    //const [habits, setHabit] = useState(challenges);
    const [completed, setCompleted] = useState<boolean[]>(Array(challenges.length).fill(false));
    const [selectedIndex, setSelectedIndex] = useState<number>(1);

    useEffect(() => {
        setCompleted(Array(challenges.length).fill(false));
    }, [challenges]);

    const handlePress = (index: number) => {
        setSelectedIndex(index);
        setCompleted(completed.map((item, idx) => idx === index ? !item : item));


    }
    const checkbox = (index: number): any => {



        return (
            <Pressable onPress={()=> handlePress(index)} >
                {completed[index] ? <Ionicons name="checkbox" size={20} style={styles.Checkbox}/> :<Feather name="square" size={20}  style={styles.Checkbox}/>
                }
            </Pressable>
        )
    }





    return (
        <View>
            <Text style={styles.todayText}>Challenge yourself Today</Text>
            <View style={styles.container}>
                {challenges.length > 0 &&  (
                    challenges.map((challenge, index: number) => (
                        <View key={index} style={styles.itemHold}>
                            {checkbox(index)}
                            <Text style={completed[index] ? styles.strikethrough : styles.text}>{challenge.challenge}</Text>

                        </View>
                    ))
                )
                }
            </View>
        </View>
    );


}
   
   
   



const styles = StyleSheet.create({
    todayText:{
        color: "#365b6d",
        fontFamily: "Raleway_700Bold",
        fontSize:20,
        fontStyle: "normal",
        fontWeight: "600",
        padding: 10,
        alignSelf: "baseline"
    },
    container: {
        //display: "flex",
        width: 388,
        paddingBottom:10,
        flexDirection: "column",
        alignItems: "center"

        
    },
    itemHold: {
        width:388,
        height: 72,
        flexShrink: 0,
        borderRadius: 20,
        borderWidth: 2,
        padding: 20,
        borderColor: "#D6D6D6",
        margin: 5,
        flexDirection: 'row',
        gap: 20

    }, 
   
    text: {
        color: '#365b6d',
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "400",

    },
    image:{
        width: 70,
        height: 70,
        flexShrink:0,
        borderRadius: 70,
        padding: 10,
    },
    Checkbox: {
        flexShrink: 0,
        width: 20,
        height: 20,
        color: "#DFBD43",
    }, 
    strikethrough: {
        color: 'black',
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "400",
        textDecorationLine: "line-through",


    }
})
export default LoadHabits;

