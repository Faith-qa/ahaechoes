import React, { useState } from "react";
import { View, StyleSheet, Pressable, Modal , Text} from "react-native";
import LoadHabits from "../pages/Home/loadHabits";
import Search from "../pages/Home/search";
import DaysOfWeekButtons from "../pages/Home/thisWeek";
import { AntDesign } from '@expo/vector-icons';
import New from "../pages/Home/modal-new";
import { useNavigation } from "@react-navigation/native";
import {AppDispatch, RootState} from "../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {setOpenGoalModal} from "../../store/goals/newGoal.slice";
import NewGoal from "../pages/Home/challenges/newGoal";

const Home: React.FC = () =>{
    const {openGoalModal} = useSelector((state: RootState)=> state.goal);
    const dispatch = useDispatch<AppDispatch>()
    const openModal = () => {
        dispatch(setOpenGoalModal(true))
    }




    return(
        <View style={styles.container}>
            <DaysOfWeekButtons/>
            <Search/>
            <View style={{zIndex: -100}}>
            <LoadHabits/></View>
            {/*<New visible={visible} onClose={closeModal}/>*/}
            <NewGoal/>

            <View style={styles.plusbutton}>
            
            <Pressable onPress={openModal} >
            <AntDesign name="pluscircle" size={45} color="#DFBD43" />

            </Pressable>
            </View>
            <Pressable style={styles.mcont} onPress={()=> openJournalSection()}>
                <Text style={[styles.jText, {alignSelf: "center"}]} >New Journ</Text>
            </Pressable>
           
            
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
        

    
    },
    mcont:{
        width: 100,
        height: 50,
        borderRadius: 20,
        backgroundColor:"#BA4B41",
        alignItems: "center",
        padding: 12,
        alignSelf: "flex-end",
        bottom: 30,
        position: "absolute",
        right: -10,
        zIndex: 500
    },
    plusbutton:{
        position: "absolute",
        alignSelf:"center",
        bottom: -20,
        zIndex:10
        
    }

})
export default Home;
