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
import SignUp from "../self/screens/register";
import PlayList from "../self/screens/spotifyPlaylist";
import TypeTextScreen from "../self/pages/More/journaling/textJoun/TypeTextScreen";
import TextJournCont from "../self/pages/More/journaling/textJoun";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const NavBar: React.FC = () => {
    const {userInfo, userToken, loading,userId, success} = useSelector((state: RootState)=> state.auth);
    const dispatch = useDispatch<AppDispatch>()

    console.log(userToken)
    //
    if (success === false){
        return(
          <LogIn/>)
      }
    //

    return <>
        <Tab.Navigator
                    barStyle={styles.container}
                    initialRouteName={'more'}
                >
                    <Tab.Screen
                        name="home"
                        component={Home}
                        options={{
                            tabBarIcon: ({color}) => <Fontisto name="home" size={24} color="#444444" />
                        }}
                    />
                    <Tab.Screen
                        name="calendar"
                        component={Calendar}
                        options={{
                            tabBarIcon: ({color}) => <Feather name="calendar" size={24} color="#444444" />
                        }}
                    />
                    <Tab.Screen
                        name="notification"
                        component={Notification}
                        options={{
                            tabBarIcon: ({color}) => <FontAwesome5 name="bell" size={24} color="#444444" />
                        }}
                    />
                    <Tab.Screen
                        name="more"
                        component={More}
                        options={{
                            tabBarIcon: ({color}) => <MaterialCommunityIcons name="dots-grid" size={24} color="#444444" />,
                        }}
                    />
                </Tab.Navigator></>
    

};

const styles = StyleSheet.create({
    container: {
      width: 410,
      height: 67.384,
      position: "relative",
      flexShrink: 0,
      backgroundColor: "#B4D8E2",
      zIndex: -5,
        fontFamily: "Raleway_300Light",


      
    }
})
export default NavBar;