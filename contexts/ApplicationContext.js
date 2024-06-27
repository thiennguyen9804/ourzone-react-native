import { createContext, useEffect, useLayoutEffect, useState } from "react"
import { initializeApp } from "firebase/app";
import { getFirestore, onSnapshot } from "firebase/firestore";
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
import { useWindowDimensions } from "react-native";


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
	// const [chat, setChat] = useState(true);
	const [otherUserIds, setOtherUserIds] = useState([]); // raw value of friends, have not been categorized yet
	const [friendIds, setFriendIds] = useState([]);
	const [friends, setFriends] = useState([]);
	const [requestIds, setRequestIds] = useState([]);
	const [requests, setRequests] = useState([]);
	const [suggestionIds, setSuggestionIds] = useState([]);
	const [suggestions, setSuggestions] = useState([]);
	const {width, height} = useWindowDimensions();
	let messageLobby;
	let messageRoomIds;

	useEffect(() => {
		ScreenOrientation.lockAsync(OrientationLock.PORTRAIT_UP);
	}, []);


	// stay logged in check
	useEffect(() => {
		(async () => {
			try {
				const userIdValue = await AsyncStorage.getItem('userId');
				if(userIdValue) {
					// get user
					setUserId(userIdValue);
					const userValue = await getUserByUserId(userIdValue, setUser);
					// get newsfeed and posts
					const newsfeedValue = await getNewsfeedByUserId(userIdValue, setNewsfeed, setPostIds);

					// get detail posts
					newsfeedValue.posts.forEach(async elem => await getPostByPostId(elem, setPosts));
					// get other users
					const otherUserIdsValue = [...userValue.friends];
					setOtherUserIds([...otherUserIdsValue]);
					// get friend ids
					const friendIdsValue = otherUserIdsValue.filter(elem => elem.split('_')[1] === 'friend').map(elem => elem.split('_')[0]);
					setFriendIds(friendIdsValue);
					// console.log(friendIdsValue)
					// get friends
					friendIdsValue.forEach(async id => {
						let elem = await getUserByUserId(id);
						if(elem)
						// console.log(elem);
							setFriends(prev => [...prev, elem]);
					});

					//get requestIds
					const requestIdsValue = otherUserIdsValue.filter(elem => elem.split('_')[1] === 'request').map(elem => elem.split('_')[0]);
					setRequestIds(requestIdsValue);

					// get requests
					requestIdsValue.forEach(async id => {
						let elem = await getUserByUserId(id);
						if(elem)
						// console.log(elem);
							setRequests(prev => [...prev, elem]);
					});


					// get message lobby
					const unsubscribeMessageLobby = onSnapshot(
						query(collection(db, 'messageLobby'), where('userId', '==', userId), limit(1)),
						(querySnapshot) => {
							querySnapshot.forEach(doc => messageLobby = doc.data())
						}
					)
					// console.log('friend', friendIdsValue)
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
			posts, setPosts,
			postIds, setPostIds, 
			newsfeed, setNewsfeed,
			email, setEmail, 
			user, setUser,
			password, setPassword, 
			userId, setUserId,
			messageLobby,
			friendIds, setFriendIds,
			friends, setFriends,
			requestIds, setRequestIds,
			requests, setRequests,
			globaleWidth: width, globalHeight: height
		}}>
			{children}
		</ApplicationContext.Provider>
	)
}