import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoadHabits from './src/pages/Home/loadHabits';
import NavBar from './src/component/Navigation/nav';
import Search from './src/pages/Home/search';
import DaysOfWeekButtons from './src/pages/Home/thisWeek';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>    
      <NavigationContainer  >
          <NavBar/>

    </NavigationContainer>
    </SafeAreaProvider>

  );
};

const styles = StyleSheet.create({
  container: {
    width: 428,
    height: 926,
    flexShrink: 0,
    //borderRadius:30,
    backgroundColor: 'rgba(255, 253, 244, 0.96)', 
  }

});

export default App;
