import { createContext, useEffect, useLayoutEffect, useState } from "react"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, limit, getDocs, doc, getDoc } from "firebase/firestore";
import { useUser } from "../hooks/useUser";
import { usePost } from "../hooks/usePost";
import { useNewsfeed } from "../hooks/useNewsfeed";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { app, auth, db } from '../firebase';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

export const ApplicationContext = createContext();

export default function ApplicationContextProvider({ children }) {

	// variables
	const [user, setUser] = useState({
		userId: ''
	}); 
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

	// auto login if user already logged in 
	// useEffect(() => {
	// 	console.log('auth.currentUser', auth.currentUser);
	// 	if(auth.currentUser && auth.currentUser.uid) {
	// 		setUser(prev => ({...prev, userId: auth.currentUser.uid}));
	// 		console.log('auth.currentUser.uid', auth.currentUser.uid)
	// 		navigation.navigate('Camera');
	// 	}
	// }, []);

	// get user info 
	useEffect(() => {
		(async () => {
			try {
				let userValue = await getUserByUserId(user.userId);
				setUser(userValue);
			} catch(err) {
				console.log(err.message);
			}
			
		})();
	}, [userId]);

	// get newsfeed
	useEffect(() => {
		(async () => {
			try {
				let newsfeedValue = await getNewsfeedByUserId(userId);
				setNewsfeed(newsfeedValue);
			} catch(err) {
				console.log(err.message);
			}
		})();
	}, [userId]);

	// get postIds
	useEffect(() => {
		(async () => {
			try {
				let tempPosts = [...newsfeed.posts];
				tempPosts.reverse();
				setPostIds([...tempPosts]);
			} catch(err) {
				console.log(err.message);
			}
		})();
	}, [newsfeed]);

	useEffect(() => {
		const fetchUserData = async () => {
		  try {
			await SplashScreen.preventAutoHideAsync();
			console.log("Fetching userData from AsyncStorage");
			const userData = await AsyncStorage.getItem('userData');
			console.log("Fetched data: ", userData);
	  
			if (userData) {
			  const parsedData = JSON.parse(userData);
			  console.log("Parsed data: ", parsedData);
			  setIsLogged(parsedData.isLogged);
	
			  setUserId(parsedData.uid);
	
			  const userDocRef = doc(db, 'users', userId);
			  const userDocSnapshot = await getDoc(userDocRef);
	  
			  if (userDocSnapshot.exists()) {
				const userDataFromFirestore = userDocSnapshot.data();
				console.log("User data from Firestore:", userDataFromFirestore);
			  } else {
				console.log("User document does not exist in Firestore");
			  }
			}
	  
			// if (fontsLoaded) {
			//   console.log("Fonts loaded, hiding SplashScreen");
			// }
			await SplashScreen.hideAsync();
		  } catch (error) {
			console.error("Error during fetchUserData: ", error);
		   
		  }
		};
	  
		fetchUserData();
	  }, []);


	console.log('userId', userId);
	// console.log('user', user);
	// console.log('auth current user', auth.currentUser.uid);
	// console.log('auth current user', auth.currentUser);
	console.log('newsfeed', newsfeed);
	
	return (
		<ApplicationContext.Provider value={{
			postIds, setPostIds, newsfeed,
			email, setEmail, setUser, user,
			password, setPassword, setNewsfeed,
			userId, setUserId
		}}>
			{children}
		</ApplicationContext.Provider>
	)
}