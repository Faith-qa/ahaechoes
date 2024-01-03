import React, {useEffect, useState} from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";


const DaysOfWeekButtons: React.FC = () =>  {
    const [currentDay, setCurrentDay] = useState(new Date().getDay());
    const [currentDate, setCurrentDate] = useState(new Date().getDate());

//{currentDate == index ? currentDate : ''}
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

        return daysOfWeek.map((day, index)=>{
            const date = new Date();
            const daydiff = index - currentDay
            
            date.setDate(currentDate + daydiff)
            const fdate = date.toISOString().split('T')[0]

           // console.log(fdate.split('-')[2])



            //console.log(date)
            
            return (<TouchableOpacity
            key={index}>
               <View style={[styles.dayButton, getButtonStyle(index)]}>
                <Text style={styles.buttonText}>{fdate.split('-')[2]} </Text>
               </View>
               <View>
               <Text>{day}</Text>

               </View>

            </TouchableOpacity>)
    })}
    
    return(
        <View style={styles.container}>{renderDayButtons()}</View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        //padding: 10


        
    },
    dayButton: {
        width: 25,
        height: 25,
        flexShrink: 0,
        borderRadius: 20,
        backgroundColor: '#4D4117',
        alignItems: 'center',
        justifyContent:'center',
        //marginHorizontal: 30,
        padding: 10,


    },
    buttonText:{
        color: "#FFF",
                
    },
    day: {
        //padd
    }
})

export default DaysOfWeekButtons
