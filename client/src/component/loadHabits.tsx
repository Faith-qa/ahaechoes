import React, {useState} from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, } from "react-native";

interface ListItem {
    id: string;
    label: string;
}
const LoadHabits: React.FC = () => {
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
}


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
        padding:10,
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

    }
})
export default LoadHabits;

