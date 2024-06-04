import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';

const CalendarModal = () => {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState(currentDate.date());

    const daysInMonth = currentDate.daysInMonth();
    const firstDayOfMonth = currentDate.startOf('month').day();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const handlePreviousMonth = () => {
        setCurrentDate(currentDate.subtract(1, 'month'));
    };

    const handleNextMonth = () => {
        setCurrentDate(currentDate.add(1, 'month'));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handlePreviousMonth}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Today</Text>
                <TouchableOpacity onPress={handleNextMonth}>
                    <Ionicons name="arrow-forward" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <Text style={styles.month}>{currentDate.format('MMM, YYYY')}</Text>
            <View style={styles.weekdays}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                    <Text key={index} style={styles.weekday}>
                        {day}
                    </Text>
                ))}
            </View>
            <View style={styles.daysContainer}>
                {Array.from({ length: firstDayOfMonth }, (_, i) => (
                    <View key={`empty-${i}`} style={styles.emptyDay} />
                ))}
                {days.map((day) => (
                    <TouchableOpacity
                        key={day}
                        style={[styles.day, selectedDate === day && styles.selectedDay]}
                        onPress={() => setSelectedDate(day)}
                    >
                        <Text style={styles.dayText}>{day}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity style={styles.repeatContainer}>
                <Ionicons name="repeat" size={24} color="black" />
                <Text style={styles.repeatText}>Repeat is Off</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    month: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 16,
    },
    weekdays: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    weekday: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    daysContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    emptyDay: {
        width: '13%',
        margin: '1%',
        aspectRatio: 1,
    },
    day: {
        width: '13%',
        margin: '1%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#f0f0f0',
    },
    selectedDay: {
        backgroundColor: '#c0f0c0',
    },
    dayText: {
        fontSize: 16,
    },
    repeatContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
    },
    repeatText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CalendarModal;
