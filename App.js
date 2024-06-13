import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './screens/CameraScreen';
import HistoryScreen from './screens/HistoryScreen';
import StartScreen from './screens/StartScreen';

import SigninEmail from './screens/SignIn/SigninemailScreen';


// import { Asset } from 'expo-asset'
import {useFonts} from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';



const Stack = createNativeStackNavigator();


export default function App() {
  const [fontsLoaded]=useFonts({
    OpenSans: require('./assets/fonts/OpenSans-Regular.ttf'),
    OpenSansBold: require('./assets/fonts/OpenSans-Bold.ttf'),
    OtomanopeeOne: require('./assets/fonts/OtomanopeeOne-Regular.ttf'),
  })
  useEffect(()=>{
    async function prepare(){
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, [])

  if(!fontsLoaded)
    {
      return undefined;
    }
    else 
    {
      SplashScreen.hideAsync();
    }

  return (
    <NavigationContainer>
      <StatusBar />

      <GestureHandlerRootView>
        
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName='SigninEmail'
        
        >
                 <Stack.Screen name ="SigninEmail" component={SigninEmail}/>
          <Stack.Screen name ="Start" component={StartScreen}/>
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          
        </Stack.Navigator>
      </GestureHandlerRootView>
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
