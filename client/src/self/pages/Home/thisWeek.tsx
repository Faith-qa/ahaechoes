import React, {useEffect, useState} from "react";
import {TouchableOpacity, Text, View, StyleSheet, Image, ScrollView} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {RootState, AppDispatch} from "../../../store/store";
import {setSearch_Date} from "../../../store/goals/newGoal.slice";


const DaysOfWeekButtons: React.FC = () =>  {
    const {userInfo} = useSelector((state: RootState)=> state.auth);
    const {search_date}  = useSelector((state:RootState)=> state.goal)
    const [currentDay, setCurrentDay] = useState(new Date().getDay());
    const [currentDate, setCurrentDate] = useState(new Date().getDate());
    const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
    const dispatch = useDispatch<AppDispatch>();
// //{currentDate == index ? currentDate : ''}
//     useEffect(()=>{
//         const intervalId = setInterval(()=>{
//             setCurrentDay(new Date().getDay());
//             setCurrentDate(new Date().getDate());
//         }, 60000);
//         return () => clearInterval(intervalId)
//     }, []);


    const handleSwipe = (direction: 'left' | 'right') => {
        const newWeekStart = new Date(currentWeekStart);
        if (direction === 'left') {
            newWeekStart.setDate(currentWeekStart.getDate() + 7);
        } else {
            newWeekStart.setDate(currentWeekStart.getDate() - 7);
        }
        setCurrentWeekStart(newWeekStart);
    }
    const getButtonStyle = (day: number) =>({
        backgroundColor: currentDay === day ?'#DFBD43' :  '#8AA6B5'
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
            return `Good morning, ${userInfo.firstName}`;

        } else if (currentHour >= afternoonStart && currentHour < eveningStart){
            return `Good afternoon, ${userInfo.firstName}`;
        } else {
            return `Good evening, ${userInfo.firstName}`;
        }


    };
    const renderDayButtons = () => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

        return daysOfWeek.map((day, index)=>{
            const date = new Date(currentWeekStart);
            const daydiff = index - currentDay

            date.setDate(/*currentDate*/ date.getDate() +  daydiff)
            const fdate = date.toISOString().split('T')[0]

           // console.log(fdate.split('-')[2])



            //console.log(date)

            return (<TouchableOpacity
            key={index} onPress={()=> dispatch(setSearch_Date(fdate))}>
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
            <ScrollView
                horizontal
                pagingEnabled
                onMomentumScrollEnd={evt => {
                    const xOffset = evt.nativeEvent.contentOffset.x;
                    if (xOffset > 0) {
                        handleSwipe('left')
                    } else {
                        handleSwipe('right');
                }
                }}
                style={{flexGrow: 0}}
            >
                <View style={styles.dcontainer}>{renderDayButtons()}</View>
            </ScrollView>

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
        width: 30,
        height: 30,
        flexShrink: 0,
        borderRadius: 30,
        backgroundColor: '#8AA6B5s',
        alignItems: 'center',


    },
    dtext:{
        color: '#4D4117',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        alignSelf: "center",
        fontFamily: " Raleway_400Regular",
    
        lineHeight: 25,
                
    },
    btext: {
        color: '#FFF',
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 25,
        paddingLeft: 4,
        fontFamily: " Raleway_400Regular"
    },
    gtext:{
        flexDirection: 'row', // inline-flex equivalent
        padding: 4,
        alignItems: 'flex-start',
        justifyContent: 'flex-start', // align-items equivalent for main axis
        gap: 8,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        fontFamily: " Raleway_400Regular"
       
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
