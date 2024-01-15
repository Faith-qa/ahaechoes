import React, {useEffect, useState} from "react";
import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";


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
    const profilepic = ()=>{
        /**TO DO load implement profile pic */

    }
    const greeting = () => {
        //get the current hour of the day
        const currentHour: number = new Date().getHours()

        //define time ranges
        const morningStart: number = 0;
        const afternoonStart: number = 12;
        const eveningStart: number = 18;

        // determing the time of day and return greeting

        if (currentHour >= morningStart && currentHour < afternoonStart) {
            /*TO DO: Sync username */
            return "Good morning, Faith";
        
        } else if (currentHour >= afternoonStart && currentHour < eveningStart){
            return "Good afternoon, Faith";
        } else {
            return "Good evening, Faith";
        }


    };
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
                <Text style={styles.btext}>{fdate.split('-')[2]} </Text>
               </View>
               <View>
               <Text style={styles.dtext}>{day}</Text>

               </View>

            </TouchableOpacity>)
    })}
    
    return(
        <View>
          <Image source={{uri: 'https://images.pexels.com/photos/18340828/pexels-photo-18340828/free-photo-of-man-in-traditional-north-american-indigenous-clothing.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load'}}
             style={styles.image} />
            
            <Text style={styles.gtext}>{greeting()}</Text>
        <View style={styles.dcontainer}>{renderDayButtons()}</View>
        </View>
        
    );
};

const styles = StyleSheet.create({
    gcontainer: {
        flexDirection: 'row', // inline-flex equivalent
        padding: 4,
        alignItems: 'flex-start',
        justifyContent: 'flex-start', // align-items equivalent for main axis
        gap: 8,
      },
    
    dcontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        padding:10


        
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
        //padding: 10,


    },
    dtext:{
        color: '#4D4117',
        fontFamily: 'Rubik',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
    
        lineHeight: 25,
                
    },
    btext: {
        //padd
        color: '#FFF',
        fontFamily: 'Rubik',
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 25
    },
    gtext:{
        flexDirection: 'row', // inline-flex equivalent
        padding: 4,
        alignItems: 'flex-start',
        justifyContent: 'flex-start', // align-items equivalent for main axis
        gap: 8,
        //color: '#FFF',
        fontFamily: 'Rubik',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 25,
    },
    image:{
        width: 70,
        height: 70,
        flexShrink:0,
        borderRadius: 70,
        padding: 10,
    }
})

export default DaysOfWeekButtons
