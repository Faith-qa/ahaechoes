import React, { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { setSearch_Date } from "../../../store/goals/newGoal.slice";
import ProfilePicContainer from "./profilePic";

const DaysOfWeekButtons: React.FC = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const { search_date } = useSelector((state: RootState) => state.goal);
    const [currentDay, setCurrentDay] = useState(new Date().getDay());
    const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<string | null>(null); // State to track selected date
    const dispatch = useDispatch<AppDispatch>();



    const handleSwipe = (direction: 'left' | 'right') => {
        const newWeekStart = new Date(currentWeekStart);
        if (direction === 'left') {
            newWeekStart.setDate(currentWeekStart.getDate() + 7);
        } else {
            newWeekStart.setDate(currentWeekStart.getDate() - 7);
        }
        setCurrentWeekStart(newWeekStart);
    }

    const getButtonStyle = (day: number, date: string) => {
        const isSelected = selectedDate === date;
        const isCurrent = date === new Date().toISOString().split('T')[0];
        return {
            backgroundColor: isSelected ? '#DFBD43' : (isCurrent ? '#B9E3F3' : '#8AA6B5')
        };
    };



    const greeting = () => {
        const currentHour: number = new Date().getHours();
        const morningStart: number = 0;
        const afternoonStart: number = 12;
        const eveningStart: number = 18;

        if (currentHour >= morningStart && currentHour < afternoonStart) {
            return `Good morning, ${userInfo.firstName}`;
        } else if (currentHour >= afternoonStart && currentHour < eveningStart) {
            return `Good afternoon, ${userInfo.firstName}`;
        } else {
            return `Good evening, ${userInfo.firstName}`;
        }
    };

    const renderDayButtons = () => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

        return daysOfWeek.map((day, index) => {
            const date = new Date(currentWeekStart);
            const daydiff = index - currentDay;
            date.setDate(date.getDate() + daydiff);
            const fdate = date.toISOString().split('T')[0];

            return (
                <TouchableOpacity
                    key={index}
                    onPress={() => {
                        setSelectedDate(fdate); // Update selected date
                        dispatch(setSearch_Date(fdate));
                    }}
                >
                    <View style={[styles.dayButton, getButtonStyle(index, fdate)]}>
                        <Text style={styles.btext}>{fdate.split('-')[2]} </Text>
                    </View>
                    <View>
                        <Text style={styles.dtext}>{day}</Text>
                    </View>
                </TouchableOpacity>
            );
        });
    }

    return (
        <View>
            <ProfilePicContainer/>
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
                style={{ flexGrow: 0 }}
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
    profileUp: {
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: [{ translateY: -5 }],
        padding: 10,
        zIndex: 2,
        marginTop: -25,
        marginRight: -15
    },
    dcontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        padding: 10
    },
    dayButton: {
        width: 30,
        height: 30,
        flexShrink: 0,
        borderRadius: 30,
        alignItems: 'center',
    },
    dtext: {
        color: '#4D4117',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        alignSelf: "center",
        fontFamily: "Raleway_400Regular",
        lineHeight: 25,
    },
    btext: {
        color: '#FFF',
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 25,
        paddingLeft: 4,
        fontFamily: "Raleway_400Regular"
    },
    gtext: {
        flexDirection: 'row', // inline-flex equivalent
        padding: 4,
        alignItems: 'flex-start',
        justifyContent: 'flex-start', // align-items equivalent for main axis
        gap: 8,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        fontFamily: "Raleway_400Regular"
    },
    image: {
        width: 70,
        height: 70,
        flexShrink: 0,
        borderRadius: 70,
        padding: 10,
    }
})

export default DaysOfWeekButtons;
