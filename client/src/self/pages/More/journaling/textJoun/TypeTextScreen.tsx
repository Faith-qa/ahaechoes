import React, {useState, useRef} from "react";
import s from './styles';
import {
    View,
    Image,
    TextInput,
    Animated,
    NativeSyntheticEvent,
    TextInputSelectionChangeEventData,
    LayoutChangeEvent
} from "react-native";
import {Ionicons, MaterialIcons, Entypo} from "@expo/vector-icons";

const TypeTextScreen:React.FC = () => {
    const [text, setText] = useState('');
    const featherPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;


    /*const handleSelectionChange = (event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
        const { selection } = event.nativeEvent;
        if (selection.start === selection.end) {
            const lines = text.slice(0, selection.start).split('\n');
            const lineHeight = 24; // Adjust based on your line height
            const charWidth = 7; // Adjust based on your font size
            const xOffset = 10; // Adjust based on padding/margin
            const yOffset = 5; // Adjust based on padding/margin

            const lastLine = lines[lines.length - 1];
            const x = lastLine.length * charWidth + xOffset; // Horizontal position
            const y = (lines.length - 1) * lineHeight + yOffset; // Vertical position

            Animated.timing(featherPosition, {
                toValue: { x, y },
                duration: 100,
                useNativeDriver: false,
            }).start();
        }
    };*/
    return(<View style={s.container}>
        <View style={s.header}>
            <Image source={require('../../../../../../assets/logo.png')} style={s.icon}/>

        </View>
        <View style={s.notebook}>
            <TextInput
                style={s.input}
                multiline
                value={text}
                onChangeText={setText}
                //onSelectionChange={handleSelectionChange}
                placeholder="How are you doing today..."
            />
            {/*<Animated.View style={[s.feather, featherPosition.getLayout()]}>
                <Entypo name="feather" size={24} color="black" />
            </Animated.View>*/}
        </View>
    </View>)

}

export default TypeTextScreen;