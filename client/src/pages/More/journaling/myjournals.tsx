import React from "react";
import { View } from "react-native";

interface NewProps {
    visible: boolean,
    onClose: () => void
}

const myJournals: React.FC<NewProps> =({visible})=>{
    return(<View></View>);

}