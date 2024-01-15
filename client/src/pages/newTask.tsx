import React from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {useForm, Controller} from "react-hook-form";

const NewTask: React.FC = () =>{

    const {control, handleSubmit, formState:{errors},} = useForm(
        {
            defaultValues: {
                title: "",
                details: "",
                date: "",
                time: ""
            },
        }

    )
    const onSubmit = (data: any) => console.log(data);
    const onChange = (arg: any) => {
        return {
            value: arg.nativeEvent.text,
        };
    };

    console.log('errors', errors);
    


    return(
    <View style={styles.container}>
        <Text style={styles.title}>
            Create New Task
        </Text>
        <Text style={styles.title}>Task title</Text>
        <Controller
            control={control}
            render={({field: { onChange, onBlur, value }}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}/>)}
            name="title"
            rules={{required: true}}/>
            
        {/*<View style={styles.titleCont}>

            <TextInput style={styles.input}/>
        </View>*/}
        <Text style={styles.title}>Task Details</Text>
        <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="details"
        rules={{ required: true }}
      />
        {/*<View style = {styles.DetailsCont}>
            <TextInput style={styles.detailsIn}/>
    </View>*/}
        <Text style={styles.title}>Time & Date </Text>
        <View style={styles.timeDate}>
        <View style={styles.time}>
        <Pressable style={styles.timeIcont}>
        <Ionicons name="time-outline" size={24} color="#FFFFFF" style={styles.timeIcon}/>
        </Pressable>
        <Text style={styles.timetextcont}>18:20</Text>
        </View>
        <View style={styles.time}>
        <Pressable style={styles.timeIcont}>
            <Ionicons name="calendar-outline" size={24} color="#FFFFFF" style={styles.timeIcon} />
        </Pressable>
        <Text style={styles.timetextcont}>15/12/2024</Text>
        </View>
        <Text>Create</Text>
        </View>

        

    </View>)
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#black',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
      
      },
    title: {
        color:"#444",
        fontFamily: "Inter",
        fontSize:20,
        fontWeight: "600",
        lineHeight:27.5,
        padding: 20
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
        shadowRadius: 24,
        shadowOpacity: 1,
        elevation: 1, // For Android shadow
        padding: 10, // Adjust padding based on your design
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
        color: "#444",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: 18.857,

    },
    DetailsCont: {
        width : 358,
        height: 82,
        flexShrink: 0,
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
        padding: 10, // Adjust padding based on your design
        color: "#444",
        fontFamily: "Inter",
        fontSize: 11,
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: 18.857

    },
    timeDate: {
        flexDirection: "row",
        gap: 6,
    },
    time: {
        flexDirection: "row",
    },
    timeIcont:{
        backgroundColor: "#DFBD43",
        width: 35,
        height:35,
        flexShrink:0,
        alignItems: "center"

    },
    timeIcon:{
        alignSelf: "center",
        padding: 5

    },
    timetextcont:{
        backgroundColor: "#4D4117",
        color:"#FFFFFF",
        width: 125,
        height:35,
        flexShrink:0,
        textAlign: "center",
        //alignSelf: "center",
        padding: 7


    },
    
    
   

    })


export default NewTask;