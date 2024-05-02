import { StyleSheet, Text, View } from 'react-native';
import NavBar from "./src/Navigation/nav";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import { store } from './src/store/store';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
      <NavigationContainer  >
          <NavBar/>

    </NavigationContainer>
    </SafeAreaProvider>
    </Provider>

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
