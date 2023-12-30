import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoadHabits from './src/component/loadHabits';

export default function App() {
  return (
    <View style={styles.container}>

    <LoadHabits/>


      {/*<Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />*/}

  </View>  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#black',
    alignItems: 'center',
    justifyContent: 'center',
  
  },
});
