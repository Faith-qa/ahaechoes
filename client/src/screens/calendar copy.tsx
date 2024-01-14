import React from "react";
import { View, Text, StyleSheet } from "react-native";

const More: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>
                Hi, this feature is coming soon, be patient
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

export default More;