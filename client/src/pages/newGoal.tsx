import React, { useEffect, useState } from "react";
import { View, Modal, StyleSheet, Pressable, Text, TextInput } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome} from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';

interface NewProps {
    newGoal: boolean,
    closeGoal: () => void,
    onClose: () => void

}
const NewGoal: React.FC<NewProps> = ({newGoal, closeGoal, onClose})=>{
    const [tvisible, setvisible] = useState(false);
    const [habitCount, setHabitCount] = useState(1); // Initial count, assuming you start with one daily habit

    
    useEffect(()=>{
        setvisible(newGoal)
        
    }, [newGoal]);

    const newdailyhabit = (index: number) => {
       return ( <View style={styles.newhabit}>
            <TextInput style={styles.input2} />
            <Pressable onPress={handleAddHabit}><MaterialIcons name="add-box" size={50} color="#DFBD43" /></Pressable>
            <Pressable onPress={()=>{handleRemoveHabit(index)}}><FontAwesome name="remove" size={24} color="#DFBD43" /></Pressable>
        </View>)


    }
    const handleRemoveHabit = (index: number) => {
        setHabitCount((prevCount) => prevCount - 1);
       /* setHabits((prevHabits) => {
          const updatedHabits = [...prevHabits];
          updatedHabits.splice(index, 1);
          return updatedHabits;
        });*/
      };
      

    const handleAddHabit = () => {
        setHabitCount((prevCount) => prevCount + 1);
      };
    const closeModal = () =>{
        closeGoal();
        onClose();
    }

    return(
        <Modal
        visible={tvisible}>
            <View style={styles.container}>
            <Pressable style={styles.XContainer} onPress={closeModal}>
            <Ionicons name="arrow-back-circle-outline" size={24} color="black" />

            </Pressable>
                <Text style={styles.heading}>
                    Create New Goal
                </Text>

                <Text style={styles.title}>What goal do you have in mind</Text>
                <TextInput style={styles.input}/>
                <Text style={styles.title}>What daily habits can you cultivate to achieve this goal</Text>
               {/*} <View style={styles.newhabit}>
                    <TextInput style={styles.input2} />
                    <Pressable onPress={newdailyhabit}><MaterialIcons name="add-box" size={50} color="#DFBD43" /></Pressable>
    </View>*/}
                {[...Array(habitCount)].map((_, index) => (
          <React.Fragment key={index}>{newdailyhabit(index)}</React.Fragment>
        ))}
                <Text style={styles.title}>What timelines are you giving yourself.</Text>
                <Picker>
                    <Picker.Item label= "3 months" value="3 months"/>
                    <Picker.Item label= "6 months" value="6 months"/>
                    <Picker.Item label="1 year" value="I year"/>
                </Picker>
                <Text style={styles.title}>In momments of doubt what would
                be your source of motivation</Text>
                <TextInput style={styles.DetailsCont}/>
                <View style={styles.button}>
                <Pressable
                    >
                        <Text style={styles.buttonText}>Create</Text>
                    </Pressable>
                </View>
            
                
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
    DetailsCont: {
        width : 358,
        height: 82,
        flexShrink: 0,
        borderWidth: 1,
        //borderRadius: 20,

        borderColor: 'rgba(0, 0, 0, 0.40)',
        backgroundColor: '#FFFFFF',
        shadowColor: 'rgba(255, 255, 255, 0.14)',
        shadowOffset: {
          width: 0,
          height: 16,
        },
        shadowRadius: 24,
        shadowOpacity: 1,
        elevation: 1, // For Android shadow
        padding: 10, // Adjust padding based on your design
        color: "black",
        fontFamily: "Inter",
       // fontSize: 11,
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: 18.857

},
    button: {
        width: 358,
        height: 67,
        flexShrink: 0,
        backgroundColor: "#DFBD43",
        alignItems: "center",
        justifyContent: "center",
        margin: 20

    },
    buttonText:{
        color: "#444",
        fontFamily:"Inter",
        fontSize: 18,
        fontStyle:"normal",
        fontWeight: "600",
        lineHeight: 38,

    },
    input: {
        width: 358,
        height: 48,
        flexShrink: 0,
        //borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.40)',
        backgroundColor: '#FFFFFF',
        shadowColor: 'rgba(255, 255, 255, 0.14)',
        shadowOffset: {
          width: 0,
          height: 16,
        },
        shadowRadius: 24,
        shadowOpacity: 1,
        elevation: 1, // For Android shadow
        padding: 10, 
        color: "black",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: 18.857,

    },
    newhabit:{
        flexDirection: "row",
        alignSelf: "flex-start",
        gap: 10

    },
    input2: {
        width: 250,
        height: 50,
        flexShrink: 0,
        //borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.40)',
        backgroundColor: '#FFFFFF',
        shadowColor: 'rgba(255, 255, 255, 0.14)',
        shadowOffset: {
          width: 0,
          height: 16,
        },
        shadowRadius: 24,
        shadowOpacity: 1,
        elevation: 1, // For Android shadow
        padding:10 , 
        color: "black",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: 18.857,
        //alignSelf: "flex-start"

    },

})

export default NewGoal;
