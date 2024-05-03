import React, {useEffect, useState} from "react";
import {View, StyleSheet, Text, RootTagContext} from "react-native";
import Home from "../self/screens/home";
import {FontAwesome5, Fontisto, Feather, MaterialCommunityIcons} from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Calendar from "../self/screens/calendar";
import Notification from "../self/screens/notification";
import More from "../self/screens/more";
import LogIn from "../self/screens/logIn";
import {loginUser} from "../store/auth/auth.actions";
import {RootState, AppDispatch} from "../store/store";
import {useDispatch, useSelector} from "react-redux";
import {createStackNavigator} from "@react-navigation/stack";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const NavBar: React.FC = () => {
    const {userInfo, userToken} = useSelector((state: RootState)=> state.auth);
    const dispatch = useDispatch<AppDispatch>()
    const [loggedIn, isLoggedIn] = useState(userInfo)


    return (
<Tab.Navigator
                    barStyle={styles.container}
                    initialRouteName={'LogIn'}
                >
                    <Tab.Screen
                        name="login"
                        component={LogIn}
                        options={{
                            tabBarIcon: ({color}) => (
                                <Fontisto name="home" size={24} color="#444444" />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="calendar"
                        component={Calendar}
                        options={{
                            tabBarIcon: ({color}) => (
                                <Feather name="calendar" size={24} color="#444444" />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="notification"
                        component={Notification}
                        options={{
                            tabBarIcon: ({color}) => (
                                <FontAwesome5 name="bell" size={24} color="#444444" />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="more"
                        component={More}
                        options={{
                            tabBarIcon: ({color}) => (
                                <MaterialCommunityIcons name="dots-grid" size={24} color="#444444" />
                            ),
                        }}
                    />
                </Tab.Navigator>
    )
    

};

const styles = StyleSheet.create({
    container: {
      width: 410,
      height: 67.384,
      postion: "relative",
      flexShrink: 0,
      backgroundColor: "#EDEAEA",
      zIndex: -5
      
    }
})
export default NavBar;