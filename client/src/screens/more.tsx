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
      backgroundColor: 'rgba(255, 253, 244, 0.96)',
      alignItems: 'center',
      justifyContent: 'center',
    
    },})

export default More;