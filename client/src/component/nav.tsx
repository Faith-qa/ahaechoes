import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Home from "../screens/home";
import {FontAwesome5, Fontisto, Feather, MaterialCommunityIcons} from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Calendar from "../screens/calendar";
import Notification from "../screens/notification";
import More from "../screens/more";
import NewTask from "../pages/newTask";



const Tab = createMaterialBottomTabNavigator();

const NavBar: React.FC = () => {
    return (
        <Tab.Navigator
            barStyle={styles.container}
            initialRouteName="home"
            //activeColor="#f0edf6"
            >
            <Tab.Screen name="home" component={Home} 
                options={{
                    tabBarIcon: ({color}) => (
                        <Fontisto name="home" size={24} color="#444444" />
                    )
                }}
                />
                <Tab.Screen name="calendar" component={Calendar} 
                options={{
                    tabBarIcon: ({color}) => (
                        <Feather name="calendar" size={24} color="#444444" />
                    )
                }}
                />
                 <Tab.Screen name="notification" component={Notification} 
                options={{
                    tabBarIcon: ({color}) => (
                        <FontAwesome5 name="bell" size={24} color="#444444" />
                    )
                }}
                />
                 <Tab.Screen name="more" component={More} 
                options={{
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="dots-grid" size={24} color="#444444" />
                    )
                }}
                />
        </Tab.Navigator>
    )
    

};

const styles = StyleSheet.create({
    container: {
      width: 428,
      height: 67.384,
      postion: "relative",
      borderRadius: 200,

      //overflow:'hidden',
      flexShrink: 0,
      backgroundColor: "#EDEAEA",
      zIndex: -5
      
    }
})
export default NavBar;