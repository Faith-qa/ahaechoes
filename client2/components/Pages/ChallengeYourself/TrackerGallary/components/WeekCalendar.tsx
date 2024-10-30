import {useEffect, useState} from "react";
import {GestureResponderEvent, PanResponder, PanResponderGestureState, View, Text, TouchableOpacity,} from "react-native";
import s from '../styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const WeekCalendar: React.FC = ()=>{
    const today = new Date()

    const [selectedDate, setSelectedDate] = useState<Date>(today);
    const [currentWeek, setCurrentWeek] = useState<Date[]>(getWeek(today))
    const [isToday, setIsToday] = useState<boolean>(true);


    //helper function to get the dates for the week

    function getWeek(date:Date):Date[]{
        const startofWeek = new Date(date)
        startofWeek.setDate(date.getDate()-date.getDay());
        return Array.from({length:7}, (_,i)=>{
            const d = new Date(startofWeek)
            d.setDate(startofWeek.getDate()+i)
            return d;
        })
    }

    // panResponder for swipe gestures

  const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_: GestureResponderEvent, gestureState: PanResponderGestureState) =>
            Math.abs(gestureState.dx) > 20,
        onPanResponderEnd: (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
            if (gestureState.dx > 0) {
                // Swipe right: Previous week
                setCurrentWeek(getWeek(new Date(currentWeek[0].setDate(currentWeek[0].getDate() - 7))));
            } else if (gestureState.dx < 0) {
                // Swipe left: Next week
                setCurrentWeek(getWeek(new Date(currentWeek[0].setDate(currentWeek[0].getDate() + 7))));
            }
        },
    });

    // Update header when selected date changes
    useEffect(() => {
        setIsToday(selectedDate.toDateString() === today.toDateString());
    }, [selectedDate]);

    // reset to current week and day when today is pressed

    const resetToToday = ()=>{
        setSelectedDate(today)
        setCurrentWeek(getWeek(today))
    }
    return(
        <View {...panResponder.panHandlers}>
            {/* Header */}
            <View style={s.header}>
                <TouchableOpacity onPress={resetToToday}>
                    <Text style={s.headerText}>Today</Text>
                </TouchableOpacity>
                <Text style={s.headerText}>
                    {!isToday && `${selectedDate.toDateString()}`}
                </Text>
                <TouchableOpacity onPress={() => alert("feature coming")}>
                    <MaterialCommunityIcons name="dots-horizontal" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Date Selector */}
            <View style={s.dateContainer}>
                {currentWeek.map((date, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedDate(date)}
                        style={[
                            s.dateItem,
                            date.toDateString() === selectedDate.toDateString() && s.selectedDate,
                        ]}
                    >
                        <Text style={[s.dateText, date.toDateString() === selectedDate.toDateString() && s.selectedDateText]}>
                            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][date.getDay()]}
                        </Text>
                        <View
                            style={[
                                s.dateNumberCont,
                                date.toDateString() === selectedDate.toDateString() && {
                                    backgroundColor: "#B4D8E2",
                                    borderColor: "#365B6D",
                                },
                            ]}
                        >
                            <Text style={[s.dateNumber, date.toDateString() === selectedDate.toDateString() && s.selectedDateText]}>
                                {date.getDate()}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

export default WeekCalendar;