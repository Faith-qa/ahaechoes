import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Modal, View, Text, TextInput, StyleSheet, Pressable,TouchableOpacity} from "react-native";
import { getCurrentTime } from "../../../utils/date";
import { Octicons,AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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
    const [day, setDay]= useState<string>("M");
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [scheduleVisible, setscheduleVisible] = useState(false);

    /*manage schedule/tracker section of the form*/
    const openSchedule = () =>{
       if (inputArea.length == 1 && inputArea[0] ==''){
        return null;
       }
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

    const {control, reset, handleSubmit, formState: {errors}} = useForm({
        defaultValues:{
            goal: "",
            habitKind: habitKind,
            habits: habits,
            tracker:(habitKind === "daily") ? {
                time: getCurrentTime(new Date()),
                reminderDays: selectedDays,
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
        console.log("i'm here")
        console.log(data);
        closeGoal();
        console.log("i'm here")
        onClose();
        reset();

        
        alert("task added");
    } 
/*handling tracking form field*/
const tracking =(scheduleVisible: boolean)=>{

    const [openfrequency, setopenfrequency] = useState<boolean>(false);

    const openHabitfrequency = () =>{
        setopenfrequency(true);
    }
    const closeHabitfrequency = () =>{
        console.log(selectedDays);
        setopenfrequency(false);
    }

    const done = (days:string[], setTime: string)=>{
        console.log(days, setTime)
        closeHabitfrequency();

    }

  
    if (!scheduleVisible){
        return null;
    }
    // Function to toggle the selected state of a day
  const toggleDay = (day:string) => {
    if (selectedDays.includes(day)) {
      // If the day is already selected, remove it from the array
      setSelectedDays(selectedDays.filter(selectedDay => selectedDay !== day));
    } else {
      // If the day is not selected, add it to the array
      setSelectedDays([...selectedDays, day]);
    }
  };

//select all days
const selectAllDays = () =>{
    const alldDays = ['S','M', 'T', 'W', 'T', 'F', 'S'];
    setSelectedDays(alldDays);
}

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
    

    
    for(var i = 0; i < inputArea.length; i++){
        if(inputArea[i] != ''){
            area.push(
            <View key={i}  style={styles.modalContent}>
                <Text>{inputArea[i]}</Text>
                </View>
    )
}

        
    }

    
    return ( <Modal
        animationType="slide"
        visible={scheduleVisible}
        transparent={true}
    >

        <View         style={styles.modalCont}
>
<Pressable style={styles.XContainer} onPress={closeSchedule}>
            <Ionicons name="arrow-back-circle-outline" size={24} color="black" />
            </Pressable>
            <Text style={styles.heading}>Add repeat frequency</Text>

            <Pressable onPress={openHabitfrequency}>
                {area}
            </Pressable>
            <Modal
                animationType="slide"
                visible={openfrequency}
                transparent={true}
                >
                    <View style={styles.modalCont}>
                        <View style={styles.XContainer}>
                    <Pressable  onPress={closeHabitfrequency}>
            <Ionicons name="arrow-back-circle-outline" size={24} color="black" />
            </Pressable>
            <Pressable onPress={()=>{done(selectedDays, time)}} ><Text>Done</Text></Pressable></View>
                        <Text>Schedule</Text>
                        
                        <View style={styles.repeatCont}>
                            <View style={styles.textCont}>
                        <Text style={{color: "#FFF", fontSize: 16, fontStyle:"normal"}} >I want to repeat this habit</Text></View>
                        {habitKind === "daily" ?<View style={styles.dailyCont}>
                        <AntDesign name="clockcircle" size={24} color="black" />
                        <Text>Daily</Text>
                        </View> : habitKind === "weekly" ? <View style={styles.dailyCont}>
                        <AntDesign name="dotchart" size={24} color="black" />
                        <Text>Weekly</Text>
                        </View> : <View style={styles.dailyCont}><MaterialCommunityIcons name="calendar-month-outline" size={24} color="black" />
                        <Text>Monthly</Text></View>}
                        </View>
                        {habitKind === "daily" ? <View style={styles.repeatCont}>
                        <View style={styles.textCont}>
                             <Text style={{color: "#FFF", fontSize: 16, fontStyle:"normal"}} >On these days</Text></View>
                            <View style={styles.selectdaycont}>
                             {/* Render buttons for each day */}
      {['S', 'M', 'T','W','T','F','S'].map((day, index) => (
       
        <TouchableOpacity
          key={index}
          style={[
            styles.dayButton,
            selectedDays.includes(day) && styles.selectedDayButton,
          ]}
          onPress={() => toggleDay(day)}
        >
            
          <Text style={styles.dayButtonText}>{day.charAt(0)}</Text>
        </TouchableOpacity>
      ))}
</View> 
<Pressable style={styles.everyday} onPress={selectAllDays}><Text style={{color: "#FFF", fontSize: 16, fontStyle:"normal"}}>Everyday</Text></Pressable>
                        </View>: habitKind === "weekly" ?  <View style={styles.repeatCont}>
                             <View style={styles.textCont}><Text style={{color: "#FFF", fontSize: 16, fontStyle:"normal"}} >On this day of the week</Text></View>
                             <View style={[styles.selectdaycont, {marginTop: 30, alignSelf: "center"}]}>
                                {/*render days of the week */}
                                {['S', 'M', 'T','W','T','F','S'].map((iday, index) => (
       
       <TouchableOpacity
         key={index}
         style={[
           styles.dayButton,
           day === iday && styles.selectedDayButton,
         ]}
         onPress={()=>{setDay(iday)}}
       >
           
         <Text style={styles.dayButtonText}>{iday}</Text>
       </TouchableOpacity>
     ))}</View></View> : <View style={{width: "100%", gap: 35}}><View style={styles.repeatCont}><View style={styles.textCont}>
                             <Text style={{color: "#FFF", fontSize: 16, fontStyle:"normal"}}>On this week of the month</Text></View>
                             <View style={[styles.selectdaycont, {gap: 30, marginTop: 30}]}>
                                {/* select week of the month*/}
                                {[1,2,3].map((iweek, index) => (
       
                        <TouchableOpacity
                            key={index}
                            style={[
                            styles.dayButton,
                            iweek === week && styles.selectedDayButton,
                            ]}
                            onPress={()=>{setweek(iweek)}}
                        >
                            
                            <Text style={styles.dayButtonText}>{iweek}</Text>
                        </TouchableOpacity>
                        ))}
                                </View></View>
                                <View style={styles.repeatCont}>
                             <View style={styles.textCont}><Text style={{color: "#FFF", fontSize: 16, fontStyle:"normal"}} >On this day of the week</Text></View>
                             <View style={[styles.selectdaycont, {marginTop: 30, alignSelf: "center"}]}>
                                {/*render days of the week */}
                                {['S', 'M', 'T','W','T','F','S'].map((iday, index) => (
       
       <TouchableOpacity
         key={index}
         style={[
           styles.dayButton,
           day === iday && styles.selectedDayButton,
         ]}
         onPress={()=>{setDay(iday)}}
       >
           
         <Text style={styles.dayButtonText}>{iday}</Text>
       </TouchableOpacity>
     ))}</View></View></View>}
                        <View>
                            <Pressable onPress={showTimePicker}>
                            <DateTimePickerModal
                            isVisible={isTimePickerVisible}
                            mode="time"
                            onConfirm={handleConfirmT}
                            onCancel={hideTimePicker}/>
                            <Text style={styles.timetextcont}>choose reminder time: {time}</Text>
                            </Pressable>
                            </View>
                    </View>
                </Modal>
            
        </View>
    </Modal>)

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
    console.log('errors', errors);


    return (<Modal animationType="slide"
    visible={gvisible}
    transparent={true}>
        <View style={styles.container}>
        <View style={styles.XContainer}>
                    <Pressable  onPress={closeGoal}>
            <Ionicons name="arrow-back-circle-outline" size={24} color="black" />
            </Pressable>
            <Pressable onPress={handleSubmit(onSubmit)}><Text>Done</Text></Pressable></View>
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
                style={[styles.titleCont, {backgroundColor: "#FFF"}]}
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
        {tracking(scheduleVisible)}
        <Pressable onPress={openSchedule} style={[styles.titleCont, {backgroundColor: "#fff", justifyContent: "space-between"}]}>
        <Text>{habitKind}</Text>
    <MaterialCommunityIcons name="greater-than" size={24} color="black" /></Pressable>
    </View></Modal>)

}
const styles = StyleSheet.create({
    everyday:{
        alignItems: "center",
        width: "80%",
        height: 30,
        borderRadius: 20,
        backgroundColor:"#4D4117",
        padding:5,
        alignSelf: "center",
        marginBottom: 10


    },
    selectdaycont:{
        flexDirection: "row",
        alignSelf: "center",
        margin: 10

    },
    textCont:{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 40,
        width: "100%",
        alignSelf: "center",
        backgroundColor:"#9F852E",
        alignItems: "center",
        padding: 10,

    },
    repeatCont:{
        width: "99%",
        height:150,
        borderRadius: 20,
        backgroundColor: 'rgba(235, 233, 224, 0.96)',

    },
    dailyCont:{
        width: 100,
        height: 70,
        borderRadius: 20,
        backgroundColor:"#DFBD43",
        alignItems:"center",
        padding: 10,
        margin:10, 
        gap: 5
    },
    dayButton:{
        backgroundColor:"#FFFFFF",
        width:30,
        height: 30,
        borderRadius: 20,
        flexShrink: 0,
        padding: 5,
        margin: 5,
        alignItems:"center"

    },
    selectedDayButton:{
        backgroundColor:"#4D4117"
    },
    dayButtonText:{
        fontSize: 12,
        fontWeight: 'bold',
        alignSelf: "center"
    },

    modalCont:{
        //flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: "center",
        padding: 35,
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        gap: 35,
       // borderRadius: 12,
        backgroundColor: 'rgba(255, 253, 244, 0.96)'
    },
    modalContent:{
        backgroundColor:"white",
        padding: 20,
        borderRadius: 10,
        width:'80%',
        marginBottom: 10
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 253, 244, 0.96)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        overflow: "scroll"
      
      },
      XContainer: {
        //display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        //alignItems: "center",
        //gap: 10,
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
        width: 300,
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