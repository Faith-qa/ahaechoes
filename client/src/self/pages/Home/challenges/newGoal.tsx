import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import {AppDispatch, RootState} from "../../../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {setColor, setOpenGoalModal} from "../../../../store/goals/newGoal.slice";

const NewGoal = () => {
    const {openGoalModal, color} = useSelector((state: RootState)=> state.goal)
    const dispatch = useDispatch<AppDispatch>();
    let [selectedColor, setSelectedColor] = useState("")

    const renderColorButton = () =>{
        const bcolors = ['#FFDDC1', '#FFE4C4', '#FFFACD', '#D4F1F4', '#E0FFFF', '#FFDDC1']
        return bcolors.map((bcolor, index)=>{
            const isSelected = selectedColor = bcolor

            return(

                <><TouchableOpacity key={index} onPress={() => {
                    dispatch(setColor(bcolor));
                }}>
                    <View style={[styles.colorCircle, {backgroundColor: bcolor}]}>
                    </View>
                </TouchableOpacity>{/*<View style={[styles.colorCircle, styles.selectedColor, {backgroundColor: color}]}>
                    <FontAwesome name="check" size={14} color="black"/>
                </View>*/}</>

            )

        })
    }




    return (
        <Modal
            visible={openGoalModal}
        ><View style={[styles.container, {backgroundColor: color}]}>
            <TouchableOpacity style={styles.closeButton} onPress={()=> dispatch(setOpenGoalModal(false))}>
                <MaterialIcons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.createText}>Create</Text>
            <Image
                source={{uri: 'path-to-your-sun-image'}}
                style={styles.image}
            />
            <TextInput
                style={styles.taskInput}
                placeholder="New Task"
                placeholderTextColor="#C0C0C0"
                maxLength={50}
            />
            <Text style={styles.charCount}>0/50</Text>
            <View style={styles.colorOptions}>
                {renderColorButton()}


            </View>
            <View style={styles.optionCont}>
            <TouchableOpacity style={styles.option}>
                <Text style={styles.optionText}>Today</Text>
                <MaterialIcons name="event" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
                <Text style={styles.optionText}>Time: All-Day</Text>
                <MaterialIcons name="access-time" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
                <Text style={styles.optionText}>No Reminder</Text>
                <MaterialIcons name="notifications-none" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
                <Text style={styles.optionText}>No tag</Text>
                <MaterialIcons name="label-outline" size={24} color="black" />
            </TouchableOpacity></View>
        </View></Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#E0F7FA',
        padding: 20,
        alignItems: 'center',
    },
    closeButton: {
        alignSelf: 'flex-start',
    },
    createText: {
        position: 'absolute',
        top: 20,
        right: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: {
        width: 60,
        height: 60,
        marginVertical: 20,
    },
    taskInput: {
        fontSize: 24,
        color: '#696969',
        textAlign: 'center',
    },
    charCount: {
        color: '#A9A9A9',
        marginBottom: 20,
    },
    colorOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    colorCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    selectedColor: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionCont:{
        backgroundColor: "#ffffff",
        width: "95%",
        marginTop: 20,
        padding: 20,
        borderRadius: 20


    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        width: '100%',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#D3D3D3',
    },
    optionText: {
        fontSize: 16,
    },
    subtasksButton: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    subtasksText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtasksHint: {
        color: '#A9A9A9',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default NewGoal;
