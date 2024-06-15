import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './screens/CameraScreen';
import HistoryScreen from './screens/HistoryScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import store from './stores/store'
import { Provider } from 'react-redux';
import ApplicationContext from './contexts/ApplicationContext';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <Provider store={store}>
      <ApplicationContext>
        <NavigationContainer>
          <StatusBar />
          <GestureHandlerRootView>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName='Camera'
            >
              <Stack.Screen name="Camera" component={CameraScreen} />
              <Stack.Screen name="History" component={HistoryScreen} />
            </Stack.Navigator>
          </GestureHandlerRootView>
        </NavigationContainer>
      </ApplicationContext>
    </Provider>
      
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
