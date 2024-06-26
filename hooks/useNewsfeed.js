import { useState } from "react"
import { collection, query, where, limit, getDocs, updateDoc, doc, arrayUnion, onSnapshot, getDoc } from "firebase/firestore";
import { app, db } from "../firebase";
import { useDispatch } from "react-redux";
import { setUserId } from "../slices/userSlice";

export const useNewsfeed = () => {
	// get real time update
	// setNewsfeed can be optional
	const getNewsfeedByUserId = async (userId, setNewsfeed, setPostIds) => {
		if(!userId) {
			throw new Error('getNewsfeedByUserId userId is required');
		}
		let res;
		const q = query(collection(db, "newsfeed"), where("userId", "==", userId), limit(1));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach(doc => {
			res = doc.data();
			if(setNewsfeed) {
				setNewsfeed(res);
				if(setPostIds) {
					let postIdsValue = [...res.posts].reverse();
					setPostIds(postIdsValue);
				}
			}
			return Promise.resolve(doc.data())
		})
		

		return Promise.resolve(res);
	}

	const addNewPostIdToNewsfeed = async (newsfeedId, postId) => {
		const newsfeedRef = await doc(db, 'newsfeed', newsfeedId);
		const newsfeedRes = await updateDoc(newsfeedRef, {
			posts: arrayUnion(postId)
		});

		return Promise.resolve(newsfeedRes);
	}

	return { getNewsfeedByUserId, addNewPostIdToNewsfeed };
}
