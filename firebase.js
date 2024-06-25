// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth'; 
import 'firebase/compat/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAd9yfmEOMjE04GK8IWSfJnGgXZi2_aK10",
  authDomain: "locket-clone-d9494.firebaseapp.com",
  projectId: "locket-clone-d9494",
  storageBucket: "locket-clone-d9494.appspot.com",
  messagingSenderId: "388995846486",
  appId: "1:388995846486:web:8ed2b8db843ed32ac0c6f7",
  measurementId: "G-RQBMK36XVG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
console.log('auth current user in firebase', auth.currentUser);
const db = getFirestore(app);

export { app, auth, db };
