import React, {useState} from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity,Image, Button, Pressable } from "react-native";
import {MMKVLoader} from "react-native-mmkv-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import getFormattedDate from "../../utils/date";

const MMKV = new MMKVLoader().initialize();

const LoadHabits: React.FC = ()=>{
    const today =  getFormattedDate();
    const data = MMKV.indexer.hasKey(today)

    if (data) {
        const value =JSON.parse( MMKV.getMap(today));
        type ItemProps = {task: string};
        const Item = ({task}: ItemProps) => (
            <View><Text>{task}</Text></View>
        );
        return (<SafeAreaView>
            <FlatList
                data = {value.Task}
                renderItem={({item})=> <Item task={item.task}/>}
                keyExtractor={item => item.id}/>
        </SafeAreaView>)

    }
    const notask = () =>(
    <View> <Image source={{uri: "https://plus.unsplash.com/premium_photo-1684330691489-2eb2620db612?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}}
        
        style={styles.image}/>
        <Text>You don't have any habits you are tracking today.</Text> 
        <Pressable onPress={()=> {
            alert("feature coming")
        }} >
            <Icon name="add-circle-outline"/>
        </Pressable>
        </View>
    )
    return (<View>
        {notask()}
    </View>)}

    //logic:
    //get habit from local storage if it is today's habit. 
    // from the list of tasks, check for todays task 
    // if it is render it and load it as todays task
    //if not display yesterday's
    // update new task to database
    


/*const LoadHabits: React.FC = () => {
    //loads habits from server
    //temporary data
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    const habits: ListItem[] = [
        {id: "1", label: "read a book"},
        {id: "2", label:  "play"},
        {id: "3", label: "30 minutes sermon"}];
    
    const handleCheckedBoxToggle = (itemId: string) => {
        const updatedCheckedItems = checkedItems.includes(itemId)
        ? checkedItems.filter((item)=> item != itemId)
        : [... checkedItems, itemId];
        setCheckedItems(updatedCheckedItems)
    };

    const renderItem = ({item}: {item: ListItem}) => {
        return(<TouchableOpacity style={styles.itemHold} onPress={()=> handleCheckedBoxToggle(item.id)}>
            <View style={[styles.checkedCheckBox, checkedItems.includes(item.id) ? styles.checkedCheckBox: styles.uncheckedCheckbox]}>
                {checkedItems.includes(item.id) && (
                    <View/>
                )}  
            </View>
            <Text style={styles.text}>{item.label}</Text>
        </TouchableOpacity>)
    }
    return (
        <><Text style={styles.todayText}>Today's Tasks</Text><View style={styles.container}>
            <FlatList
                data={habits}
                keyExtractor={(item) => item.id}

                renderItem={renderItem} />

        </View></>
    )
}*/


const styles = StyleSheet.create({
    todayText:{
        color: "#444",
        fontFamily: "Rubik",
        fontSize:20,
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: 24,
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

