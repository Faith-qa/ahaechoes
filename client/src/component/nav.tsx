import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../screens/home";
import {MaterialCommunityIcons} from '@expo/vector-icons'


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
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
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