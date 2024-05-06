import {Modal, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, {useState} from "react";


interface NewProps {
    habitKind: string;
}
const HabitKindUI: React.FC<NewProps> = ({habitKind:habitKind})=>{
    const [selectedDays, setSelectedDays] = useState<string[]>();
    const [isTimePickerVisible, setTimePickerVisible] = useState(false)
    const [time, setTime]=useState(Date)
    const [day, setDay] = useState("Mo")
    const [week, setweek] = useState<number>()
const selectAllDays = () =>{
    const alldDays = ['Su','Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
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
    const toggleDay = (day:string) => {
        // @ts-ignore
        if (selectedDays.includes(day)) {
            // If the day is already selected, remove it from the array
            // @ts-ignore
            setSelectedDays(selectedDays.filter(selectedDay => selectedDay !== day));
        } else {
            // If the day is not selected, add it to the array
            // @ts-ignore
            setSelectedDays([...selectedDays, day]);
        }
    };


// @ts-ignore
    // @ts-ignore
    return (

    <View>
        <View>
            <Text>let's Schedule it</Text>
                {habitKind === "daily" ? <View>
                    <View>
                        <Text style={{color: "#FFF", fontSize: 16, fontStyle:"normal"}} >On these days</Text></View>
                    <View>
                        {/* Render buttons for each day */}
                        {['Su', 'Mo', 'Tu','We','Th','Fr','Sa'].map((day, index) => (

                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.dayButton,
                                    selectedDays !== undefined && selectedDays.includes(day) && styles.selectedDayButton,
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
                        {['Su', 'Mo', 'Tu','We','Th','F','S'].map((iday, index) => (

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

    </View>)

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
        backgroundColor: '#FFFFFF',
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
        padding: 7,
    },
    schedule:{
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        width: 358,
        height: 48,
        padding:10,
        borderWidth: 1,
        borderColor: '#FFFFFF',


    }


})

export default HabitKindUI