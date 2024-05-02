import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {Calendar} from 'react-native-calendars'

const LoadCal: React.FC = () =>{
    const [selected, setSelected] = useState<string>('');

    return(
        <View style={styles.calCont}>
        <Calendar
        onDayPress={day => {
            setSelected(day.dateString);
        }}
        
        theme={{
            backgroundColor: '#EDEAEA',
            calendarBackground: 'rgba(255, 253, 244, 0.96)',
            textSectionTitleColor: '#4D4117',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#DFBD43',
            dayTextColor: '#4D4117',
            textDisabledColor: '#b6c1cd'
        }}
        /></View>
    )

}

const styles = StyleSheet.create({
    calCont:{
        width: "100%"

    }
})

export default LoadCal;