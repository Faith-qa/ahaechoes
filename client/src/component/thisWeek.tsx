import React, {useEffect, useState} from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";


const DaysOfWeekButtons: React.FC = () => {
    const [currentDay, setCurrentDay] = useState(new Date().getDay());
    const [currentDate, setCurrentDate] = useState(new Date().getDate());


    useEffect(()=>{
        const intervalId = setInterval(()=>{
            setCurrentDay(new Date().getDay());
            setCurrentDate(new Date().getDate());
        }, 60000);
        return () => clearInterval(intervalId)
    }, []);

    const getButtonStyle = (day: number) =>({
        backgroundColor: currentDay === day ?'#DFBD43' :  '#4D4117'
    });

    const renderDayButtons = () => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

        return daysOfWeek.map((day, index)=>(
            <TouchableOpacity
            key={index}>
                <Text>{day}</Text>
                <Text>{currentDate == index ? currentDate : ''} </Text>
            </TouchableOpacity>
        ))
    }
    return(
        <View>{renderDayButtons()}</View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30, 
    },
    dayButton: {
        width: 25,
        height: 25,
        flexShrink: 0,
        borderRadius: 20,
        backgroundColor: '#4D4117',
        alignItems: 'center',
        justifyContent:'center'


    },
    buttonText:{
        color: "#FFF"
    }
})

export default DaysOfWeekButtons
