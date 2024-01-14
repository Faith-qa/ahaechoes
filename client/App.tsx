import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoadHabits from './src/component/loadHabits';
import NavBar from './src/navigation/nav';
import Search from './src/component/search';
import DaysOfWeekButtons from './src/component/thisWeek';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
      
     <NavBar/>
     </SafeAreaProvider>

    </NavigationContainer>
  );
}

export default App;
/**const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator>
        <Stack.Screen name="Home" component = {NavBar}/>
      </Stack.Navigator>
      </NavigationContainer>)
      {/*<View style={styles.container}>
     
    {/*<DaysOfWeekButtons/>
    <Search/>

  <LoadHabits/>
  <NavBar/>


    {/*<Text>Open up App.tsx to start working on your app!</Text>
    <StatusBar style="auto" />

</View>  ;
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#black',
    alignItems: 'center',
    justifyContent: 'center',
  
  },
});*/
