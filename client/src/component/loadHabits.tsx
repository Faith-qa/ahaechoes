import React, {useEffect, useState} from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity,Image, Button, Pressable } from "react-native";
//import {MMKVLoader} from "react-native-mmkv-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import getFormattedDate from "../../utils/date";
import AsyncStorage from "@react-native-async-storage/async-storage";

//const MMKV = new MMKVLoader().initialize();

const LoadHabits: React.FC = ()=>{
    const today = getFormattedDate();
    const [habits, setHabit] = useState<any>([])

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const value = await AsyncStorage.getItem(today);
                if (value != null) {
                    const jsonVal = JSON.parse(value);
                    setHabit(jsonVal.Task)
                }
            }catch (e) {
                console.error(e)
            }
        };
        fetchData();
        
    }, [today]);

    const Item: React.FC<{ task: string }> = ({ task }) => (
        <View>
          <Text>{task}</Text>
        </View>
      );
    if (habits.length > 0) {
        return (
            <SafeAreaView>
              <FlatList
                data={habits}
                renderItem={({ item }) => <Item task={item.task} />}
                keyExtractor={(item) => item.id.toString()}
              />
            </SafeAreaView>
          );
    }
    return (
        <View style = {styles.container}>
          <Image
            source={{
              uri:
                'https://plus.unsplash.com/premium_photo-1684330691489-2eb2620db612?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            style={styles.image}
          />
          <Text>You don't have any habits you are tracking today.</Text>
          <Pressable
            onPress={() => {
              alert('Feature coming');
            }}
          >
            <Icon name="add-circle-outline" />
          </Pressable>
        </View>
      );

}
   
   
   



const styles = StyleSheet.create({
    todayText:{
        color: "#444",
        fontFamily: "Rubik",
        fontSize:20,
        fontStyle: "normal",
        fontWeight: "600",
        padding: 10,
        alignSelf: "baseline"
    },
    container: {
        display: "flex",
        width: 388,
        paddingBottom:10,
        flexDirection: "column",
        alignItems: "center"

        
    },
    itemHold: {
        width:360,
        height: 72,
        flexShrink: 0,
        borderRadius: 20,
        borderWidth: 2,
        padding: 10,
        borderColor: "#D6D6D6",
        alignItems: "baseline"


    }, 
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#D6D6D6",
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",    
    },
    checkedCheckBox:{
        backgroundColor:"#OOF"
    },
    uncheckedCheckbox:{
        backgroundColor: "transparent"
    },
    text: {
        color: 'black',
        fontFamily: "Rubik",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "400",
        //textDecorationLine: "line-through"

    },
    image:{
        width: 70,
        height: 70,
        flexShrink:0,
        borderRadius: 70,
        padding: 10,
    }
})
export default LoadHabits;

