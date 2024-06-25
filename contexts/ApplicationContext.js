import { createContext, useEffect, useLayoutEffect, useState } from "react"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, limit, getDocs, doc, getDoc } from "firebase/firestore";
import { useUser } from "../hooks/useUser";
import { usePost } from "../hooks/usePost";
import { useNewsfeed } from "../hooks/useNewsfeed";
import { initializeAuth, getReactNativePersistence, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { app, auth, db } from '../firebase';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import * as ScreenOrientation from 'expo-screen-orientation';
import { OrientationLock } from "expo-screen-orientation";


export const ApplicationContext = createContext();

export default function ApplicationContextProvider({ children }) {

	// variables
	const [user, setUser] = useState({}); 
	const [userId, setUserId] = useState('');
	const [postIds, setPostIds] = useState([]);
	const [newsfeed, setNewsfeed] = useState({});
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [posts, setPosts] = useState([]);
	const { getUserByUserId } = useUser();
	const { getNewsfeedByUserId } = useNewsfeed()
	const { getPostByPostId } = usePost();
	const navigation  = useNavigation();
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		ScreenOrientation.lockAsync(OrientationLock.PORTRAIT_UP);
	}, []);


	// stay logged in check
	useEffect(() => {
		(async () => {
			try {
				const userIdValue = await AsyncStorage.getItem('userId');
				if(userIdValue) {
					setUserId(userIdValue);
					getUserByUserId(userIdValue, setUser);
					getNewsfeedByUserId(userIdValue, setNewsfeed, setPostIds);
					navigation.navigate('Camera');
				}
			} catch(error) {
				console.log(error.message);
			}
		})();
	}, []);

	// console.log('userId', userId);
	// console.log('user', user);
	// console.log('auth current user', auth.currentUser.uid);
	// console.log('auth current user', auth.currentUser);
	// console.log('newsfeed', newsfeed);
	
	return (
		<ApplicationContext.Provider value={{
			postIds, setPostIds, 
			newsfeed, setNewsfeed,
			email, setEmail, 
			user, setUser,
			password, setPassword, 
			userId, setUserId
		}}>
			{children}
		</ApplicationContext.Provider>
	)
}