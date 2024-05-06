import {Modal, Text, TextInput, View, StyleSheet} from "react-native";
import {Controller, useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {getCurrentTime} from "../../../../utils/date";
import { RadioButton } from 'react-native-paper';
import HabitKindUI from "../../../components/goals.habitkind.ui";


interface NewProps {
    visible: boolean,
    onClose: () => void
}
const NewChallenge: React.FC<NewProps> = ({visible, onClose}) => {
    const [habitKind, setHabitKind] = useState<any>('');
    const [time, setTime] = useState(getCurrentTime(new Date()));
    const [week, setweek] = useState<number>(1);
    const [day, setDay]= useState<string>("M");
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [scheduleVisible, setscheduleVisible] = useState(false);
    const [isvisible, setIsvisible] = useState(false);



    useEffect(()=>{
        //set initial state
        setIsvisible(visible)
    }, [visible])


    const {control, reset, handleSubmit} = useForm({
        defaultValues:{
            goal: "",
            habitKind: habitKind,
            tracker:
            (habitKind === "daily") ? {daily:{
                time: getCurrentTime(new Date()),
                reminderDays: selectedDays,}
            }: (habitKind === "weekly") ? {monthly:{day: "",
                time: time}

            } : {
                week: week,
                day: "",
                time: getCurrentTime(new Date())
            },

        }
    })

    return(
        <Modal
            animationType="slide"
            visible={isvisible}
            transparent={true}>
            <View>
                <Text>New challenge</Text>
                <Text>What challenge do you want to take on today</Text>
                <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                        <TextInput
                            onBlur={onBlur}
                            onChangeText={(text)=> onChange(text)}
                            value={value}/>)}
                    name="goal"
                    rules={{required: true}}/>
                <Text>I want to track this:</Text>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}})=>(
                            <View>
                            <RadioButton
                            value={"daily"}
                        status={habitKind === "daily" ? 'checked': 'unchecked'}
                        onPress={()=> setHabitKind("daily")}
                            />
                <RadioButton
                    value={"weekly"}
                    status={habitKind === 'weekly' ? 'checked': 'unchecked'}
                    onPress={()=>setHabitKind('weekly')}/>
                <RadioButton
                    value={"monthly"}
                    status={habitKind === "monthly" ? 'checked': 'unchecked'}
                    onPress={()=>setHabitKind("monthly")}/>
                            </View>
                            )}
                    name={"habitKind"}
                    rules={{required: true}}/>
                <HabitKindUI habitKind={habitKind}/>
                </View>

        </Modal>
    )

}

export default NewChallenge

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',



    },})