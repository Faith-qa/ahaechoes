import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Home from "../screens/home";
import {EvilIcons, Fontisto, Feather, MaterialCommunityIcons} from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Calendar from "../screens/calendar";
import Notification from "../screens/notification";
import More from "../screens/calendar copy";



const Tab = createMaterialBottomTabNavigator();

const NavBar: React.FC = () => {
    return (
        <Tab.Navigator
            initialRouteName="home"
            //activeColor="#444444"
            //style={styles.Tab}
            >
            <Tab.Screen name="home" component={Home} 
                options={{
                    tabBarIcon: ({color}) => (
                        <Fontisto name="home" size={24} color="#4444" />
                    )
                }}
                />
                <Tab.Screen name="calendar" component={Calendar} 
                options={{
                    tabBarIcon: ({color}) => (
                        <Feather name="calendar" size={24} color="black" />
                    )
                }}
                />
                 <Tab.Screen name="notification" component={Notification} 
                options={{
                    tabBarIcon: ({color}) => (
                        <EvilIcons name="bell" size={24} color="black" />
                    )
                }}
                />
                 <Tab.Screen name="more" component={More} 
                options={{
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="dots-grid" size={24} color="black" />
                    )
                }}
                />
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