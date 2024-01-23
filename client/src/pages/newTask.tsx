import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Button } from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {useForm, Controller} from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getCurrentTime } from "../../utils/date";
import sendDatatoLocalStorage from "../component/businessLogic/task";

const NewTask: React.FC = () =>{
    const [isDatePickerVisble, setDatePickerVisible] = useState(false);
    const [ndate, setnDate] = useState(new Date());
    const [isTimePickerVisible, setTimePickerVisible] = useState(false);
    const [time, setTime] = useState(new Date());
    //const [task,setTask] = useState('');
    //const [details, setDetails] = useState('')

    const {control, handleSubmit, reset, formState:{errors},} = useForm(
        {
            defaultValues: {
                title: "",
                details: "",
                date: new Date(),
                time: new Date()
            },
        }

    );
    const showTimePicker = () => {
        setTimePickerVisible(true)
    }
    const hideTimePicker = () => {
        setTimePickerVisible(false);
    }

    const handleConfirmT = (time: any)=> {
        setTime(time);
        hideTimePicker();
    }
    
    const showDatePicker = () => {
        setDatePickerVisible(true);
    }

    const hideDatePicker = () => {
        setDatePickerVisible(false)
    };
    const handlConfirm = (date: any) => {
        setnDate(date);
        hideDatePicker();
    };

    const onSubmit = (data: any) => {
        console.log(data);
        sendDatatoLocalStorage(data);
        reset();
    };
    const onChange = (arg: any) => {
        return {
            value: arg.nativeEvent.text,
        };
    };

   /*const handleNew = (data: any): any =>{
        onSubmit(data);
        setTask('');
        setDetails('');

    }*/

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
                  onChangeText={(text)=> onChange(text)}
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
            style={styles.DetailsCont}
            onBlur={onBlur}
            onChangeText={(text)=> onChange(text)}
            value={value}
          />
        )}
        name="details"
        rules={{ required: true }}
      />
        <Text style={styles.title}>Time & Date </Text>
        <View style={styles.timeDate}>
        <View style={styles.time}>
        <Pressable style={styles.timeIcont} onPress={showTimePicker}>
        <Ionicons name="time-outline" size={24} color="#FFFFFF" style={styles.timeIcon}/>
        </Pressable>
        <Controller
            control = {control}
            render={({field: {onChange, onBlur, value}})=>(
                <>
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleConfirmT}
                    onCancel={hideTimePicker}/>
                    <Text style={styles.timetextcont}>{getCurrentTime(time)}</Text>   
                </>
            )}
            name = "time"
            rules={{required: true}}
        />
        </View>
        <View style={styles.time}>
        <Pressable style={styles.timeIcont} onPress={showDatePicker}>
            <Ionicons name="calendar-outline" size={24} color="#FFFFFF" style={styles.timeIcon} />
        </Pressable>
        <Controller
            control = {control}
            render={({field: {onChange, onBlur, value}})=>(
                <>
                <DateTimePickerModal
                    isVisible={isDatePickerVisble}
                    mode="date"
                    onConfirm={handlConfirm}
                    onCancel={hideDatePicker}/>
                    
                    <Text style={styles.timetextcont}>{ndate.toLocaleDateString()}</Text>
                
                </>
            )}
            name = "date"
            rules={{required: true}}
        />
                </View>
               
        </View>
        
        <Pressable>
                    <Text style={styles.addnew}>Add new</Text>
                </Pressable>
        <View style={styles.button}>
        <Pressable
            onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Create</Text>
            </Pressable>
        </View>
       

        

    </View>)
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#black',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30
      
      },
    title: {
        color:"#444",
        fontFamily: "Inter",
        fontSize:20,
        fontWeight: "600",
        lineHeight:27.5,
        padding: 20,
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
        borderRadius: 20,
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
    DetailsCont: {
        width : 358,
        height: 82,
        flexShrink: 0,
        borderWidth: 1,
        borderRadius: 20,

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
        alignItems: "center",
        

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
        padding: 7,
        //borderBottomRightRadius: 20,
        //borderTopRightRadius: 20,



    },
    addnew: {
        color: "#4D4117",
        textAlign: "center",
        fontFamily: "Inter",
        fontSize: 18,
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: 24,
        margin: 20
      /* 133.333% */
    },
    button: {
        width: 358,
        height: 67,
        flexShrink: 0,
        backgroundColor: "#DFBD43",
        alignItems: "center",
        justifyContent: "center",
        //margin: 20
    
    },
    buttonText:{
        color: "#444",
        fontFamily:"Inter",
        fontSize: 18,
        fontStyle:"normal",
        fontWeight: "600",
        lineHeight: 38,

    }
    
   

    })


export default NewTask;