import React, { useState } from "react";
import { View, StyleSheet, Pressable, Modal } from "react-native";
import LoadHabits from "../component/loadHabits";
import Search from "../component/search";
import DaysOfWeekButtons from "../component/thisWeek";
import { AntDesign } from '@expo/vector-icons';
import New from "../pages/modal-new";
import { useNavigation } from "@react-navigation/native";


const Home: React.FC = () =>{
    const [visible, setVisible] = useState(false);
    const visiblity = () => {
        setVisible(true)
    }


    return(
        <View style={styles.container}>
            <DaysOfWeekButtons/>
            <Search/>
            <LoadHabits/>
            <New visible={visible}/>
            <View style={styles.plusbutton}>
            
            <Pressable onPress={visiblity} >
            <AntDesign name="pluscircle" size={45} color="#DFBD43" />

            </Pressable>
            </View>
           
            
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        backgroundColor: '#black',
        alignItems: 'center',
        justifyContent: 'center',
       // zIndex: 1
        

    
    },
    plusbutton:{
        position: "absolute",
        alignSelf:"center",
        bottom: -20,
        zIndex:10
        //transfcd orm: translate()
        
    }

})
export default Home;
