import {createStackNavigator} from "@react-navigation/stack";
import TextLibContainer from "./JounLibrary/textJournLib";
import React from "react";

const Stack = createStackNavigator()

const JounNavigation:React.FC = () =>{

    return(
        <Stack.Navigator>
            <Stack.Screen name={""} component={TextLibContainer}/>
        </Stack.Navigator>
    )
}

export default JounNavigation;