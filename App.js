import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import ApplicationContext from './contexts/ApplicationContext';
import store from './stores/store';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase'; 


import StartScreen from './screens/StartScreen';
import SignupEmail from './screens/SignUp/SignupemailScreen';
import SignupPass from './screens/SignUp/SignuppassScreen';
import SignupName from './screens/SignUp/SignupNameScreen';
import SigninPass from './screens/SignIn/SigninpassScreen';
import SigninEmail from './screens/SignIn/SigninemailScreen';
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


// const clearUserData = async () => {
//   try {
//     await AsyncStorage.removeItem('userData');
//     console.log('UserData cleared successfully!');
//   } catch (error) {
//     console.error('Error clearing userData: ', error);
//   }
// };

// clearUserData();

const Stack = createNativeStackNavigator();

export default function App () {
  const [isLogged, setIsLogged] = useState(false);
  const [fontsLoaded] = useFonts({
    OpenSans: require('./assets/fonts/OpenSans-Regular.ttf'),
    OpenSansBold: require('./assets/fonts/OpenSans-Bold.ttf'),
    OtomanopeeOne: require('./assets/fonts/OtomanopeeOne-Regular.ttf'),
  });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        // console.log("Fetching userData from AsyncStorage");
        // const userData = await AsyncStorage.getItem('userData');
        // console.log("Fetched data: ", userData);
  
        // if (userData) {
        //   const parsedData = JSON.parse(userData);
        //   console.log("Parsed data: ", parsedData);
        //   setIsLogged(parsedData.isLogged);
  
  
        //   const userId = parsedData.uid; 
        //   const userDocRef = doc(db, 'users', userId);
        //   const userDocSnapshot = await getDoc(userDocRef);
  
        //   if (userDocSnapshot.exists()) {
        //     const userDataFromFirestore = userDocSnapshot.data();
        //     console.log("User data from Firestore:", userDataFromFirestore);
  
            
        //   } else {
        //     console.log("User document does not exist in Firestore");
        //   }
        // }
  
        if (fontsLoaded) {
          // console.log("Fonts loaded, hiding SplashScreen");
          await SplashScreen.hideAsync();
        }
      } catch (error) {
        console.error("Error during fetchUserData: ", error);
       
      }
    };
  
    fetchUserData();
  }, [fontsLoaded]);
  
  if (!fontsLoaded) {
    return null; 
  }
  return (
    <Provider store={store}>
      
        <NavigationContainer>
        <ApplicationContext>
          <StatusBar />
          <GestureHandlerRootView>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              // initialRouteName={isLogged ? 'Camera' : 'Start'}
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
            </Stack.Navigator>
          </GestureHandlerRootView>
      </ApplicationContext>
        </NavigationContainer>
    </Provider>
  );
}
