import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoadHabits from "../component/loadHabits";
import Search from "../component/search";
import DaysOfWeekButtons from "../component/thisWeek";


const Home: React.FC = () =>{
    return(
        <View style={styles.container}>
            <DaysOfWeekButtons/>
            <Search/>
            <LoadHabits/>
            
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#black',
      alignItems: 'center',
      justifyContent: 'center',
    
    },})
export default Home;
