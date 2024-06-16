import { createContext, useEffect, useState } from "react"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { useUser } from "../hooks/useUser";
import { usePost } from "../hooks/usePost";
import { useNewsfeed } from "../hooks/useNewsfeed";

export const ApplicationContext = createContext();



export default function ApplicationContextProvider({ children }) {

	// variables
	const [user, setUser] = useState({});
	const [postIds, setPostIds] = useState([]);
	const [newsfeed, setNewsfeed] = useState({});
	const [userEmail, setUserEmail] = useState('thiennguyen9804@gmail.com');
	const [posts, setPosts] = useState([]);
	const { getUserByEmail } = useUser();
	const { getNewsfeedByUserId } = useNewsfeed()
	const { getPostByPostId } = usePost();

	
	// get user info and newsfeed info
	useEffect(() => {
		(async () => {
			try {
				let userValue = await getUserByEmail(userEmail);
				setUser(userValue);
			} catch(err) {
				console.log(err.message);
			}
			
		})();
	}, []);

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
				setPostIds([...newsfeed.posts]);
			} catch(err) {
				console.log(err.message);
			}
		})();
	}, [newsfeed]);

	return (
		<ApplicationContext.Provider value={{
			postIds, setPostIds, newsfeed
		}}>
			{children}
		</ApplicationContext.Provider>
	)
}