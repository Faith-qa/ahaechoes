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
                    /*TO DO, Send data to database */
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
  
    return (
        <View>
            <Text style={styles.todayText}>Today's task</Text>
        <View style = {styles.container}>
            {habits.length > 0 ? (<SafeAreaView>
              <FlatList
                data={habits}
                renderItem={({ item }) => <Item task={item.task} />}
                keyExtractor={(item) => item.id.toString()}
                style={styles.itemHold}
              />
            </SafeAreaView>) : (<View style={styles.itemHold}> 
                <Text style={styles.text}>No habits created, yet</Text>
          {/*<Pressable
            onPress={() => {
              alert('Feature coming');
            }}
          >
            <Icon name="add-circle-outline" />
        </Pressable>*/}
        </View>)
 }
         
        </View>
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
        //flexDirection: 'row',
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

