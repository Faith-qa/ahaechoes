import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/store';
import {setColor, setOpenCommitment, setOpenGoalModal, setOpenTracker} from '../../../../store/goals/newGoal.slice';
import Tracker from './tracker.goal';
import {creatChallenge, newChallengeRegistration} from '../../../../store/goals/newChallenge.action';
import ErrorCard from "../../../../components/errorCard";
import CommitToChallenge from "./challengeGoal";

const NewGoal: React.FC = () => {
    const { openGoalModal, color,  } = useSelector((state: RootState) => state.goal);
    const {error, openErrorCard} = useSelector((state:RootState)=>state.globalState)
    const { userId } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const [selectedIndex, setSelectedIndex] = useState<number>(1);
    const [text, setText] = useState<string>('');
    const [data, setData] = useState<newChallengeRegistration>();
    // Handle state in child components
    const handleData = (newData: newChallengeRegistration) => {
        setData(newData);
    };

    //handle server error

    // Validate data
    const validateData = (data: Record<string, any>) => {
        const baseKeys = ['challenge', 'track', 'endDate'];
        const dailyKeys = [...baseKeys, 'frequencyDays'];
        const weeklyKeys = [...baseKeys, 'frequencyWeeks', 'dayofWeek'];
        const monthlyKeys = [...baseKeys, 'frequencyMonths', 'daysofMonth'];

        const requiredKeys = Object.keys(data);
        console.log(data);

        const isValid = [dailyKeys, weeklyKeys, monthlyKeys].some(keys =>
            requiredKeys.every(key => keys.includes(key))
        );

        return isValid;
    };

    // Handle create and update global state
    const handleCreate = async (data: newChallengeRegistration) => {
        console.log(userId)
        if (!userId) {
            throw new Error('unauthorized');
        }
        if (!validateData(data)) {
            throw new Error('invalid inputs');
        }
        if (text === '') {
            throw new Error('challenge cannot be blank');
        }

        data['challenge'] = text;
        data['user'] = userId;
        const completedChallenge: newChallengeRegistration = {...data}

        // @ts-ignore
        await dispatch(creatChallenge({challengeData:completedChallenge, userId}));

        // if (creatChallenge.fulfilled.match(actionResults)){
        //     console.log("challenge created successfully")
        //     dispatch(setOpenGoalModal(false));
        // }
        // console.log(error)

    };

    // Set index and color
    const handlePress = (bcolor: string, index: number) => {
        setSelectedIndex(index);
        dispatch(setColor(bcolor));
    };

    // Handle tracker
    const handleTracker = () => {
        dispatch(setOpenTracker(true));
    };

    // Render color buttons
    const renderColorButton = () => {
        const bcolors = ['#FFDDC1', '#FFE4C4', '#FFFACD', '#D4F1F4', '#E0FFFF', '#FFDDC1'];
        return bcolors.map((bcolor, index) => (
            <TouchableOpacity key={index} onPress={() => handlePress(bcolor, index)}>
                <View style={[styles.colorCircle, selectedIndex === index && styles.selectedColor, { backgroundColor: bcolor }]}>
                    {selectedIndex === index && <FontAwesome name="check" size={14} color="black" />}
                </View>
            </TouchableOpacity>
        ));
    };

    return <Modal visible={openGoalModal}>
        <View style={[styles.container, { backgroundColor: color }]}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.closeButton} onPress={() => dispatch(setOpenGoalModal(false))}>
                    <MaterialIcons name="close" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.createButton} onPress={() => handleCreate(data as newChallengeRegistration)}>
                    <Text style={styles.createButtonText}>Create</Text>
                </TouchableOpacity>
            </View>
            {error != null ? <ErrorCard message={error}/>:null}
            <Image source={{ uri: 'path-to-your-sun-image' }} style={styles.image} />
            <TextInput
                style={styles.taskInput}
                placeholder="Challenge yourself"
                placeholderTextColor="#C0C0C0"
                maxLength={50}
                onChangeText={setText}
                value={text}
            />
            <Text style={styles.charCount}>{text.length}/50</Text>
            <View style={styles.colorOptions}>
                {renderColorButton()}
            </View>
            <View style={styles.optionCont}>
                <Tracker onDataCollected={handleData} />
                <TouchableOpacity style={styles.option} onPress={handleTracker}>
                    <Text style={styles.optionText}>Track this challenge</Text>
                    <MaterialIcons name="event" size={24} color="black" />
                </TouchableOpacity>
                <CommitToChallenge/>
                <TouchableOpacity style={styles.option} onPress={()=> dispatch(setOpenCommitment(true))}>
                    <Text style={styles.optionText}>Commit to this challenge for {} days</Text>
                    <MaterialIcons name="access-time" size={24} color="black" />
                </TouchableOpacity>
                {/*<TouchableOpacity style={styles.option}>
                    <Text style={styles.optionText}>No Reminder</Text>
                    <MaterialIcons name="notifications-none" size={24} color="black" />
                </TouchableOpacity>*/}
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionText}>No tag</Text>
                    <MaterialIcons name="label-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    </Modal>;
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#E0F7FA',
        padding: 20,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    createButton: {
        padding: 10,
    },
    createButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
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
        borderWidth: 4,
        borderColor: "white"
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
