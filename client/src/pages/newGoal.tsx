import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Modal, View, Text, TextInput, StyleSheet, Pressable,} from "react-native";
import { getCurrentTime } from "../../utils/date";
import { Octicons, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";



interface NewProps {
    newGoal: boolean,
    closeGoal: () => void,
    onClose: () => void

}
const NewGoal: React.FC<NewProps> = ({newGoal, closeGoal, onClose}) => {
    const [gvisible, setvisible] = useState(false);
    const [habitKind, setHabitKind] = useState<any>('daily');
    const [habits, sethabits] = useState<string[]>([]);
    const [inputArea, setInputArea] = useState<string[]>(['']);
    const [isTimePickerVisible, setTimePickerVisible] = useState(false);
    const [time, setTime] = useState(getCurrentTime(new Date()));
    const [week, setweek] = useState<number>(1);
    const [day, setDay]= useState<string>("Mon");
    const [scheduleVisible, setscheduleVisible] = useState(false);

    /*manage schedule/tracker section of the form*/
    const openSchedule = () =>{
        setscheduleVisible(true);
    }

    const closeSchedule = () =>{
        setscheduleVisible(false);
    }




    
    //load the modal
    useEffect(()=>{
        setvisible(newGoal);
    }, [newGoal]);
    
    //set form and form requirements

    const {control, handleSubmit, formState: {errors}} = useForm({
        defaultValues:{
            goal: "",
            habitKind: habitKind,
            habits: habits,
            tracker:(habitKind === "daily") ? {
                time: getCurrentTime(new Date())
            }: (habitKind === "weekly") ? {
                day: "",
                time: time

            } : {
                week: week,
                day: "",
                time: getCurrentTime(new Date())
            },
            motivations: []     
    }});


//handle form submit/
    const onSubmit = (data: any) => {
        console.log(data);
        closeGoal();
        onClose();
    } 
/*handling tracking form field*/
const tracking =()=>{

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
    var area: any = [];
    

    if (habitKind === "daily"){
        for(var i = 0; i < inputArea.length; i++){
            area.push(
                <View key={i} style={styles.reminders}>
                    <Text>{inputArea[i]}</Text>
                    <View style={{flexDirection:"row", alignItems:"center", }}>
             <Pressable  onPress={showTimePicker}>
                <Ionicons name="time-outline" size={24} color="black" />
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
                    <Text style={styles.timetextcont}>{time}</Text>   

                </>
            )}
            name = "tracker"
            rules={{required: true}}
        />
        </View>
        </View>

        )
            
        }

    }
    return (<View >
    <Pressable onPress={openSchedule} style={styles.schedule}>
        <Text>{habitKind}</Text>
    <MaterialCommunityIcons name="greater-than" size={24} color="black" /></Pressable>
    </View>)

}
    // handle create, update and delete habit state
    const crudeHabits = () =>{
        const handleAddInputArea = () =>{
            setInputArea((prevInputAreas)=> [...prevInputAreas, '']);
            //handleAddHabit();

        }
        const handleInputChange = (text: string, index: number) => {
            setInputArea((prevInputAreas)=>{
                const updatedInputAreas = [...prevInputAreas];
                updatedInputAreas[index] = text;
                return updatedInputAreas;
            })
        };

        const handleAddHabit = () =>{
            sethabits((prevHabits)=> [...prevHabits]);
            setInputArea([''])
        };

        const handleRemoveHabit = (index: number) =>{
            setInputArea((prevInputAreas)=>{
                const updatedInputAreas = [...prevInputAreas];
                updatedInputAreas.splice(index, 1);
                return updatedInputAreas;
            });
            sethabits((prevHabits) => {
                const updatedHabits = [...prevHabits];
                updatedHabits.splice(index, 1);
                return updatedHabits;
              });
        };

       
        return (
            <View >
                {inputArea.map((habit, index)=>(
                    <View key={index} style={styles.habitCont}>
                        <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                            <>
                            <TextInput
                        style={styles.habit}
                        placeholder="enter habit"
                        value={habit}
                        onChangeText={(text)=> handleInputChange(text, index)}/>
                        </>
                        )}
                        name="habits"/>
                        {inputArea.length > 1 ? <Pressable  onPress={()=> handleRemoveHabit(index)}><Octicons name="dash" size={24} color="#DFBD43" /></Pressable> : "" }

                    </View>
                ))}
                <Pressable onPress={handleAddInputArea}>
                {inputArea.length < 3 ? <FontAwesome name="plus" size={24} color="#DFBD43" /> :"" }
</Pressable>

                {/*<Button title="Add Habbits" onPress={handleAddHabit
                }/>*/}
            </View>
        )
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
        <Controller
        control={control}
        render={({field: {onChange, onBlur, value}})=>(<>
            <Picker
                style={styles.titleCont}
                selectedValue={habitKind}
                onValueChange={(itemValue, itemIndex) => setHabitKind(itemValue)}>
                <Picker.Item label="daily" value="daily" />
                <Picker.Item label="weekly" value="weekly" />
                <Picker.Item label="monthly " value="monthly" />
            </Picker>
        </>)}
        name="habitKind"
        rules={{required: true}}/>

        <Text style={styles.title}>What {habitKind} habits  will you cultivate to achieve this goal</Text>
        {crudeHabits()}
        <Text style={styles.title}>Let's track your {habitKind} habits by setting {habitKind} reminders:</Text>
        {tracking()}

    </View></Modal>)

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 253, 244, 0.96)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        overflow: "scroll"
      
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
        flexDirection: "row",

        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.40)',
        backgroundColor: '#FFFFF',
        shadowColor: 'rgba(255, 255, 255, 0.14)',
        shadowOffset: {
          width: 0,
          height: 16,
        },
        //shadowRadius: 24,
        shadowOpacity: 1,
        elevation: 1, // For Android shadow
        padding: 10,
        gap: 30, // Adjust padding based on your design
      },
      habitCont:{
        width: 358,
        hegiht: 48,
        padding:5,
        paddingRight: 10,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.40)',
        backgroundColor: '#FFFFFF',
        shadowColor: 'rgba(255, 255, 255, 0.14)',
        shadowOffset: {
          width: 0,
          height: 16,
        },
        justifyContent:"space-between",
        alignItems: "center",
        marginBottom:5,
      },
      
      habit:{
        width: 300,
        height: 48,
        flexShrink: 0,
        //orderRadius: 20,
        //borderWidth: 1,
        //borderColor: 'rgba(0, 0, 0, 0.40)',
        backgroundColor: '#FFFFFF',
        //shadowColor: 'rgba(255, 255, 255, 0.14)',
        /*shadowOffset: {
          width: 0,
          height: 16,
        },*/
        //shadowRadius: 24,
        //shadowOpacity: 1,
        //elevation: 1, // For Android shadow
        padding: 10,
        alignSelf:"flex-start",

      },
      reminders:{
        width: 358,
        height: 35,
        flexDirection: "row",
        backgroundColor: '#FFFFFF',

        justifyContent:"space-between",
        flexShrink: 0,
        alignItems:"center",
        paddingLeft:10,
        marginBottom:5

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
      schedule:{
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        width: 358,
        height: 48,
        padding:10,
        //paddingRight: 10,
        borderWidth: 1,
        borderColor: '#FFFFFF',


      }


    })

    export default NewGoal;