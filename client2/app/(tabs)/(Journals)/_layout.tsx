import {Stack} from 'expo-router';

export default function JournalLayout (){
    return(
        <Stack screenOptions={{presentation: 'modal'}}>
            <Stack.Screen name={"index"}
                          options={{
                              headerShown: false
                          }}/>
        </Stack>
    )
}