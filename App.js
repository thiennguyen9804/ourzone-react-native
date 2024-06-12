import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './screens/CameraScreen';
import HistoryScreen from './screens/HistoryScreen';
import StartScreen from './screens/StartScreen';

import {useFonts} from 'expo-font'

const Stack = createNativeStackNavigator();


export default function App() {
  const [fontsLoaded]=useFonts({
    OpenSans: require('./assets/fonts/OpenSans-Regular.ttf'),
    OpenSansBold: require('./assets/fonts/OpenSans-Bold.ttf'),
    OtomanopeeOne: require('./assets/fonts/OtomanopeeOne-Regular.ttf'),
  })

  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName='Start'

      
      >
        <Stack.Screen name ="Start" component={StartScreen}/>
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
