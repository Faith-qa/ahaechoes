import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Modal } from "react-native";
import { Ionicons} from '@expo/vector-icons';
import {useForm, Controller} from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {getCurrentTime} from "../../../../utils/ndate";
import sendDatatoLocalStorage from "../../businessLogic/task";



interface NewProps {
    newtask: boolean,
    closeTask: () => void,
    onClose: () => void

}

const NewTask: React.FC<NewProps> = ({newtask, closeTask, onClose}) =>{
    const [isDatePickerVisble, setDatePickerVisible] = useState(false);
    const [ndate, setnDate] = useState(new Date());
    const [isTimePickerVisible, setTimePickerVisible] = useState(false);
    const [time, setTime] = useState(new Date());
    const [tvisible, setvisible] = useState(false);

    useEffect(()=>{
        setvisible(newtask)
        
    }, [newtask]);


    const {control, handleSubmit, reset, formState:{errors},} = useForm(
        {
            defaultValues: {
                title: "",
                details: "",
                date: new Date().toLocaleDateString(),
                time: getCurrentTime(new Date())
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
        closeTask();
        onClose();
        
        reset();

        
        alert("task added");
    };
    const onChange = (arg: any) => {
        return {
            value: arg.nativeEvent.text,
        };
    };

   
    console.log('errors', errors);
    


    return(
        <Modal
        animationType="slide"
            visible={tvisible}
            transparent={true}>
            <View style={styles.container}>
            <Pressable style={styles.XContainer} onPress={closeTask}>
            <Ionicons name="arrow-back-circle-outline" size={24} color="black" />

            </Pressable>
                
                <Text style={styles.heading}>
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

    titleCont: {
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
        padding: 10, // Adjust padding based on your design
      },

    input: {
        width: 358,
        height: 48,
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
    timeDate: {
        flexDirection: "row",
        gap: 6,
        alignSelf: 
        "flex-start"
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
        padding: 7,
        

    },
    addnew: {
        color: "#4D4117",
        textAlign: "center",
        fontFamily: "Inter",
        fontSize: 18,
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: 24,
        margin: 40
    },
    button: {
        width: 358,
        height: 67,
        flexShrink: 0,
        backgroundColor: "#DFBD43",
        alignItems: "center",
        justifyContent: "center",
    
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