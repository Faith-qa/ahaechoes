import { StyleSheet, Text, View } from 'react-native';
import NavBar from './src/Navigation/nav';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Provider, useSelector} from 'react-redux';
import { store } from './src/store/store';
import {
    useFonts,
    Raleway_100Thin,
    Raleway_200ExtraLight,
    Raleway_300Light,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
    Raleway_800ExtraBold,
    Raleway_900Black,
    Raleway_100Thin_Italic,
    Raleway_200ExtraLight_Italic,
    Raleway_300Light_Italic,
    Raleway_400Regular_Italic,
    Raleway_500Medium_Italic,
    Raleway_600SemiBold_Italic,
    Raleway_700Bold_Italic,
    Raleway_800ExtraBold_Italic,
    Raleway_900Black_Italic,
} from '@expo-google-fonts/raleway';

const Stack = createNativeStackNavigator();

function App() {

    let [fontsLoaded] = useFonts({
        Raleway_100Thin,
        Raleway_200ExtraLight,
        Raleway_300Light,
        Raleway_400Regular,
        Raleway_500Medium,
        Raleway_600SemiBold,
        Raleway_700Bold,
        Raleway_800ExtraBold,
        Raleway_900Black,
        Raleway_100Thin_Italic,
        Raleway_200ExtraLight_Italic,
        Raleway_300Light_Italic,
        Raleway_400Regular_Italic,
        Raleway_500Medium_Italic,
        Raleway_600SemiBold_Italic,
        Raleway_700Bold_Italic,
        Raleway_800ExtraBold_Italic,
        Raleway_900Black_Italic,
    });

    if(!fontsLoaded) {
        return null
    }
  return (
    <Provider store={store}>
      <SafeAreaProvider>
      <NavigationContainer>
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
    backgroundColor: '#FFFFFF',
  }

});

export default App;
