import React, {useEffect, useState} from "react";
import { StyleSheet, View, Text, FlatList, Pressable, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import getFormattedDate from "../../../../utils/date";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, Feather } from '@expo/vector-icons';

const LoadHabits: React.FC = ()=>{
    const today = getFormattedDate();
    const [habits, setHabit] = useState<any>([]);
    const [completed, setCompleted] = useState(false);

    const checkbox = (): any => {

        return (
            <Pressable onPress={()=>setCompleted(!completed)} >
             {completed ? <Ionicons name="checkbox" size={20} style={styles.Checkbox}/> :<Feather name="square" size={20}  style={styles.Checkbox}/> 
             } 
            </Pressable>
        )
    }


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
              >{checkbox()}
              </FlatList>
            </SafeAreaView>) : (<View style={styles.itemHold}> 
            {checkbox()} 
        </View>)
 }  
        </View>
        </View>
      );

}
   
   
   



const styles = StyleSheet.create({
    todayText:{
        color: "#444",
        fontFamily: "inter",
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
        //alignItems: "baseline"


    }, 
   
    text: {
        color: 'black',
        //fontFamily: "Rubik",
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
    },
    Checkbox: {
        flexShrink: 0,
        //size: ,
        width: 20,
        height: 20,
        color: "#DFBD43",
        //fill: "DFBD43"
    }, 
    strikethrough: {
        color: 'black',
        //fontFamily: "Rubik",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "400",
        textDecorationLine: "line-through"

    }
})
export default LoadHabits;

