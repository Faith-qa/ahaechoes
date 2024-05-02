import React from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput, View, Text } from "react-native";
import { getCurrentTime } from "../../../utils/date";

const Goal: React.FC = () => {
    const {control, handleSubmit, reset, formState:{errors}} = useForm(
        {
            defaultValues: {
                new_goal: "",
                Goal_timeline: "3 months",
                habit_structure: "daily habits",
                habits : [],
                tracking: {
                    daily: {
                        time: getCurrentTime(new Date())
                    },
                    weekly: {
                        day: "Mon",
                        time: getCurrentTime(new Date())
    
                    },
                    monthly: {
                        week: "1",
                        day: "Mon",
                        time: getCurrentTime(new Date())
                    }
                }
    
    
    
    
    
            }
        }
    
        );
        const onChange = (arg: any) => {
            return {
                value: arg.nativeEvent.text,
            };
        };
    return (<>
    <Controller
     control={control}
     render={({field: { onChange, onBlur, value }}) => (
         <TextInput
         onBlur={onBlur}
         onChangeText={(text)=> onChange(text)}
         value={value}/>)}
     name="new_goal"
     rules={{required: true}}
    />
    </>)
}


export default Goal;