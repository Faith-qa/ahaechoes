import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Calendar: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>
                Hi, this feature is coming soon
            </Text>
        </View>
    );
    
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#black',
      alignItems: 'center',
      justifyContent: 'center',
    
    },})

export default Calendar;