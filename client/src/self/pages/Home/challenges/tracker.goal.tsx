import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {useSelector} from "react-redux";
import {RootState, AppDispatch} from "../../../../store/store";
import WheelPicker from "./testwheelpicker";
import {AntDesign, Ionicons} from '@expo/vector-icons';
import {useDispatch} from "react-redux";
import {setOpenTracker} from "../../../../store/goals/newGoal.slice";


const Tracker = () => {
    const {openTracker,}= useSelector((state: RootState)=> state.goal);
    const [isEnabled, setIsEnabled] = useState(false);
    const [endDateEnabled, setEndDateEnabled] = useState(false);
    const [selectedTab, setSelectedTab] = useState('Daily');
    const [selectedDay, setSelectedDay] = useState('Su');
    const [selectedDate, setSelectedDate] = useState(9);
    const [frequency, setFrequency] = useState('1');
    const [wheel, openWheel] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const toggleEndDateSwitch = () => setEndDateEnabled(previousState => !previousState);

    const ditems = Array.from({length:100}, (_, i)=> i + 1);

    const witems = Array.from({length: 48}, (_, i)=> i+1);

    const mItems = Array.from({length: 12}, (_,i)=> i+1);

    let wheelItems = ditems

    const handleWheel = () =>{
        openWheel(!wheel)
    }
    const renderFrequencyPicker = () => (

        <WheelPicker items={wheelItems} onValueChange={(value)=>{setFrequency(value)}}/>
    );

    const renderWeeklySelector = () => (
        <View style={styles.weeklySelector}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.dayCircle, selectedDay === day && styles.activeDayCircle]}
                    onPress={() => setSelectedDay(day)}
                >
                    <Text style={[styles.dayText, selectedDay === day && styles.activeDayText]}>{day}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    const renderMonthlySelector = () => (
        <ScrollView contentContainerStyle={styles.monthlySelector}>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                <TouchableOpacity
                    key={date}
                    style={[styles.dayCircle, selectedDate === date && styles.activeDayCircle]}
                    onPress={() => setSelectedDate(date)}
                >
                    <Text style={[styles.dayText, selectedDate === date && styles.activeDayText]}>{date}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );

    return (
        <Modal
        visible={openTracker}>
        <View style={styles.container}>
            <TouchableOpacity style={{alignSelf: "flex-start"}} onPress={()=> dispatch(setOpenTracker(false))}>
                <Ionicons name="return-up-back-outline" size={24} color="black" />
            </TouchableOpacity>
            <View>
            <Text style={styles.header}>
                Repeats every {selectedTab === 'Weekly' ? `week on ${selectedDay}` : selectedTab === 'Monthly' ? `month on ${selectedDate}th` : 'day'}
            </Text></View>
            {/*<View style={styles.row}>
                <Text style={styles.label}>Repeat</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>*/}
            <View style={{width: "100%", borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#DDD",  }}>
                <View style={styles.tabs}>
                <TouchableOpacity style={[styles.tab,selectedTab === 'Daily' && styles.activeTab, ]} onPress={() => {
                    setSelectedTab('Daily')
                    wheelItems = ditems
                }}>
                    <Text style={[styles.tabText, selectedTab === 'Daily' && styles.activeTabText]}>Daily</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tab, selectedTab === 'Weekly' && styles.activeTab]} onPress={() => {
                    setSelectedTab('Weekly')
                    wheelItems = witems
                }}>
                    <Text style={[styles.tabText, selectedTab === 'Weekly' && styles.activeTabText]}>{selectedTab === 'Monthly' ? '|    ' : ''}Weekly {selectedTab === 'Daily' ?  '    |' : ''}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tab, selectedTab === 'Monthly' && styles.activeTab]} onPress={() => {
                    setSelectedTab('Monthly')
                    wheelItems = mItems;
                }}>
                    <Text style={[styles.tabText, selectedTab === 'Monthly' && styles.activeTabText]}>Monthly</Text>
                </TouchableOpacity>
            </View>
            {selectedTab === 'Weekly' && renderWeeklySelector()}
            {selectedTab === 'Monthly' && renderMonthlySelector()}</View>

            <View style={[styles.row, {width: '100%', borderBottomWidth: 1, borderColor: "#ddd", padding: 15}]} >
                <Text style={[styles.label, ]}>Frequency</Text>
                <TouchableOpacity style={styles.row} onPress={handleWheel}>
                    <Text style={styles.label}>Every {frequency} {selectedTab === "Daily" ? 'Days' : selectedTab === 'Weekly' ? 'weeks' : 'months'}  </Text>
                    {wheel ? <AntDesign name="down" size={15} color="black" /> : <AntDesign name="up" size={15} color="black" />}</TouchableOpacity>
            </View>
            {wheel && <View style={[styles.row, { borderBottomWidth: 1, borderColor: "#ddd"}]}>
                <Text style={styles.label}>Every</Text>
                {renderFrequencyPicker()}
                <Text style={styles.label}>{selectedTab === "Daily" ? 'Days' : selectedTab === 'Weekly' ? 'weeks' : 'months'}</Text>
            </View>}

            <View style={styles.row}>
                <Text style={styles.label}>End date</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={endDateEnabled ? "#f5dd4b" : "#f4f3f4"}
                    onValueChange={toggleEndDateSwitch}
                    value={endDateEnabled}
                />
            </View>
        </View></Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: "center",
        marginTop: 30


    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: "Raleway_700Bold",
        flexWrap: "wrap",
        textAlign: "center"
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //height: 10,
        marginTop: 30,
        marginBottom: 30,
        rowGap: 0,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#ddd",
        backgroundColor: "#f2f2f2",
        //width: "100%"
    },
    tab: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        //borderLeftWidth: 1,
        borderLeftColor: "#ddd",

        //borderRadius: 20,
        //borderWidth: 1,
        //borderColor: '#ddd',
       // marginHorizontal: 5,
        width: 45,
        height: 45
    },
    activeTab: {
        backgroundColor: '#81b0ff',
        borderRadius: 17,
        borderWidth: 1,
        borderColor: '#ddd',


    },
    inactiveTab: {

    },
    tabText: {
        fontSize: 16,
    },
    activeTabText: {
        color: '#fff',
    },
    weeklySelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    monthlySelector: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    dayCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    activeDayCircle: {
        backgroundColor: '#81b0ff',
    },
    dayText: {
        fontSize: 16,
    },
    activeDayText: {
        color: '#fff',
    },
    picker: {
        height: 50,
        width: 170,
    },
});

export default Tracker;
