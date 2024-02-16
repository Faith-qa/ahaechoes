import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LoadCal from "../pages/calendar/loadCalendar";


const Calendar: React.FC = () => {
    return (
        <View style={styles.container}>
            <LoadCal/>
        </View>
    );
    
};
const styles = StyleSheet.create({
    container: {
        position: "relative",  
      flex: 1,
      backgroundColor: 'rgba(255, 253, 244, 0.96)',
      alignItems: 'center',
      justifyContent: 'center',
    
    },})

export default Calendar;