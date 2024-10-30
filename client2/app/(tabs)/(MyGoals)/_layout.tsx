import {Stack} from 'expo-router';

export default function MyGoalsLayout (){
    return(
        <Stack>
            <Stack.Screen name={"index"}
                          options={{
                              headerShown: false
                          }}/>
        </Stack>
    )
}