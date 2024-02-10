import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Modal, View, Text, TextInput, StyleSheet, Pressable, } from "react-native";
import { getCurrentTime } from "../../utils/date";


interface NewProps {
    newGoal: boolean,
    closeGoal: () => void,
    onClose: () => void

}
const NewGoal: React.FC<NewProps> = ({newGoal, closeGoal, onClose}) => {
    const [gvisible, setvisible] = useState(false);
    const [habitKind, setHabitKind] = useState<any>('daily');


    //load the modal
    useEffect(()=>{
        setvisible(newGoal);
    }, [newGoal]);
    
    //set form and form requirements

    const {control, handleSubmit, formState: {errors}} = useForm({
        defaultValues:{
            goal: "",
            habitKind: "",
            habits: [],
            tracker: {
                test: ""
            },
            motivations: []     
    }})

    const onSubmit = (data: any) => {
        console.log(data);
        closeGoal();
        onClose();
    } 
    return (<Modal animationType="slide"
    visible={gvisible}
    transparent={true}>
        <View style={styles.container}>
            <Text style={styles.heading}>New Goal</Text>
        <Text style={styles.title}>
            What goal do you have in mind today
        </Text>
        <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
            <TextInput
            style={styles.titleCont}
            onBlur={onBlur}
            onChangeText={(text)=> onChange(text)}
            value={value}/>)}
        name="goal"
        rules={{required: true}}/>
        <Text style={styles.title}>What kind of habits do you want to cultivate to help you achive this goal(daily, weekly, monthly)</Text>
        <Picker
        style={{width: 150}}
        selectedValue={habitKind}
        onValueChange={(itemValue, itemIndex)=> setHabitKind(itemValue)}>
            <Picker.Item label="daily" value="daily"/>
            <Picker.Item label="weekly" value="weekly"/>
            <Picker.Item label="monthly " value="monthly"/>

        </Picker>
      
    </View></Modal>)

}
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

    titleCont: {
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
        //shadowRadius: 24,
        shadowOpacity: 1,
        elevation: 1, // For Android shadow
        padding: 10, // Adjust padding based on your design
      }
    })

    export default NewGoal;