import React, { useState } from "react";
import { View, StyleSheet, Pressable, Modal } from "react-native";
import LoadHabits from "../pages/Home/loadHabits";
import Search from "../pages/Home/search";
import DaysOfWeekButtons from "../pages/Home/thisWeek";
import { AntDesign } from '@expo/vector-icons';
import New from "../pages/Home/modal-new";
import { useNavigation } from "@react-navigation/native";
import NewChallenge from "../pages/Home/newChallenge";


const Home: React.FC = () =>{
    const [visible, setVisible] = useState(false);
    const openModal = () => {
        setVisible(true)
    }

    const closeModal = ()=> {
        setVisible(false);

    }


    return(
        <View style={styles.container}>
            <DaysOfWeekButtons/>
            <Search/>
            <LoadHabits/>
            {/*<New visible={visible} onClose={closeModal}/>*/}
            <NewChallenge visible={visible} onClose={closeModal}/>
            <View style={styles.plusbutton}>
            
            <Pressable onPress={openModal} >
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
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        

    
    },
    plusbutton:{
        position: "absolute",
        alignSelf:"center",
        bottom: -20,
        zIndex:10
        
    }

})
export default Home;
