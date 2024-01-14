import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Home from "../screens/home";
import { Entypo, Feather,Ionicons } from '@expo/vector-icons';
import Calendar from "../screens/calendar";

const Tab = createMaterialBottomTabNavigator();

const NavBar: React.FC = () => {
    return (
        <Tab.Navigator
            //initialRouteName="feed"
            //activeColor="#444444"
            //style={styles.Tab}
            >
            <Tab.Screen name="home" component={Home} 
                options={{
                    tabBarIcon: ({color}) => (
                        <Entypo name="home" size={24} color="#44444" />
                    )
                }}
                />
            <Tab.Screen name="calendar" component={Calendar}
            options={{tabBarIcon: ()=>(<Feather name="calendar" size={24} color="black" />)}}/>
        </Tab.Navigator>
    )
    

};

const styles = StyleSheet.create({
    Tab: {
        backgroundColor: "EDEAEA",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden"
    }

})
export default NavBar;