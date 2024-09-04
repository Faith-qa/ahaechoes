import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import JounNavigation from "../../pages/More/journaling/JounNavigation";
import More from "./more";

const Stack = createStackNavigator();

const MoreNavigation: React.FC = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name={"more"} component={More}/>
            <Stack.Screen name={"Journals"} component={JounNavigation}/>

        </Stack.Navigator>
    )
}

export default MoreNavigation;