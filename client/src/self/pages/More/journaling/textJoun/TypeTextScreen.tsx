import React, {useState, useRef} from "react";
import s from './styles';
import {
    View,
    Image,
    TextInput,
    Animated,TouchableOpacity,
    NativeSyntheticEvent,
    TextInputSelectionChangeEventData,
    LayoutChangeEvent
} from "react-native";
import { Button } from '@rneui/themed';

import {Ionicons, MaterialIcons, Entypo} from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/FontAwesome';
interface NewProps {
    onSubmit: ()=> void,
    title: string,
    setTitle: (title: string)=> void
    text: string,
    setText: (text:string)=> void,
    onCancelSave? : ()=> void,
    exit: boolean,
    setExit: (exit:boolean)=> void
    exitDelete?: any

}
const TypeTextScreen:React.FC<NewProps> = ({
    onSubmit,
    text,
    title,
    setText,
    setTitle, onCancelSave, setExit, exit, exitDelete}) => {

    return(<View style={s.container}>
        <View style={s.header}>
            <Image source={require('../../../../../../assets/logo.png')} style={s.icon}/>
        </View>
        <View style={s.notebook}>
            <View style={s.titleCont}>
                <TextInput
                    style={s.input}
                    onChangeText={setTitle}
                    value={title}
                    placeholder="Title.."
                    placeholderTextColor="#ccc"
                />
                <View style={s.iconRow}>
                    <TouchableOpacity onPress={() => onSubmit ? onSubmit() : null}>
                        <Icon name="plus" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setExit(true);
                    }}>
                        <Icon name="ellipsis-v" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
                {exitDelete}
            </View>
            <View style={{borderBottomColor: "#dddddd", borderBottomWidth: 1}}/>

            <TextInput
                style={[s.input, {paddingVertical: 12, paddingHorizontal: 10}]}
                multiline
                value={text}
                onChangeText={setText}
                //onSelectionChange={handleSelectionChange}
                placeholder="How are you doing today..."
            />

        </View>
    </View>)

}

export default TypeTextScreen;