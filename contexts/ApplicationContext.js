import { createContext, useEffect, useLayoutEffect, useState } from "react"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { useUser } from "../hooks/useUser";
import { usePost } from "../hooks/usePost";
import { useNewsfeed } from "../hooks/useNewsfeed";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { app, auth, db } from '../firebase';
import { useNavigation } from "@react-navigation/native";

export const ApplicationContext = createContext();

export default function ApplicationContextProvider({ children }) {

	// variables
	const [user, setUser] = useState({
		userId: ''
	}); 
	const [postIds, setPostIds] = useState([]);
	const [newsfeed, setNewsfeed] = useState({});
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [posts, setPosts] = useState([]);
	const { getUserByUserId } = useUser();
	const { getNewsfeedByUserId } = useNewsfeed()
	const { getPostByPostId } = usePost();
	const navigation  = useNavigation();

	// auto login if user already logged in 
	useEffect(() => {
		console.log('auth.currentUser', auth.currentUser);
		if(auth.currentUser && auth.currentUser.uid) {
			setUser(prev => ({...prev, userId: auth.currentUser.uid}));
			console.log('auth.currentUser.uid', auth.currentUser.uid)
			navigation.navigate('Camera');
		}
	}, []);

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
	}, [user.userId]);

	// get newsfeed
	useEffect(() => {
		(async () => {
			try {
				let newsfeedValue = await getNewsfeedByUserId(user.userId);
				setNewsfeed(newsfeedValue);
			} catch(err) {
				console.log(err.message);
			}
		})();
	}, [user]);

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


	// console.log('userId', userId);
	// console.log('user', user);
	// console.log('auth current user', auth.currentUser.uid);
	// console.log('auth current user', auth.currentUser);
	
	return (
		<ApplicationContext.Provider value={{
			postIds, setPostIds, newsfeed,
			email, setEmail, setUser, user,
			password, setPassword, setNewsfeed
		}}>
			{children}
		</ApplicationContext.Provider>
	)
}