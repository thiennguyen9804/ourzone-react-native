import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './screens/CameraScreen';
import HistoryScreen from './screens/HistoryScreen';
import AccountScreen from './screens/AccountScreen';
import ChangeEmailScreen from './screens/changeInfo/ChangeEmailScreen';
import ChangePhoneNumberScreen from './screens/changeInfo/ChangePhoneNumberScreen';
import ChangePasswordScreen from './screens/changeInfo/ChangePasswordScreen';
import ChangeThemeScreen from './screens/changeInfo/ChangeThemeScreen';
import ReportScreen from './screens/changeInfo/ReportScreen';
import ChangeNameScreen from './screens/changeInfo/ChangeNameScreen';
import FriendScreen from './screens/FriendScreen';
import ConfirmDialog from './components/ConfirmDialog';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import store from './stores/store'
import { Provider } from 'react-redux';
import ApplicationContext from './contexts/ApplicationContext';
import StartScreen from './screens/StartScreen';

import SigninEmail from './screens/SignIn/SigninemailScreen';
import SigninPass from './screens/SignIn/SigninpassScreen';

import SignupEmail from './screens/SignUp/SignupemailScreen';
import SignupPass from './screens/SignUp/SignuppassScreen';
import SignupName from './screens/SignUp/SignupNameScreen';
// import { Asset } from 'expo-asset'
import { useFonts } from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';



const Stack = createNativeStackNavigator();


export default function App() {
  const [fontsLoaded] = useFonts({
    OpenSans: require('./assets/fonts/OpenSans-Regular.ttf'),
    OpenSansBold: require('./assets/fonts/OpenSans-Bold.ttf'),
    OtomanopeeOne: require('./assets/fonts/OtomanopeeOne-Regular.ttf'),
  })
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, [])

  if (!fontsLoaded) {
    return undefined;
  }
  else {
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
          initialRouteName='Camera'
        >
       <Stack.Screen name="Start" component={StartScreen} />
              <Stack.Screen name="SignupEmail" component={SignupEmail} />
              <Stack.Screen name="SignupPass" component={SignupPass} />
              <Stack.Screen name="SignupName" component={SignupName} />
              <Stack.Screen name="SigninPass" component={SigninPass} />
              <Stack.Screen name="SigninEmail" component={SigninEmail} />
              <Stack.Screen name="Camera" component={CameraScreen} />
              <Stack.Screen name="History" component={HistoryScreen} />
              <Stack.Screen name="Account" component={AccountScreen} />
              <Stack.Screen name="ChangeEmail" component={ChangeEmailScreen} />
              <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
              <Stack.Screen name="ChangePhoneNumber" component={ChangePhoneNumberScreen} />
              <Stack.Screen name="ChangeTheme" component={ChangeThemeScreen} />
              <Stack.Screen name="Report" component={ReportScreen} />
              <Stack.Screen name="ChangeName" component={ChangeNameScreen} />
          <Stack.Screen name="Friend" component={FriendScreen} />
          <Stack.Screen name="Confirm" component={ConfirmDialog} />

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