import { useState } from "react"
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { app, db } from "../firebase";
import { useDispatch } from "react-redux";
import { setUserId } from "../slices/userSlice";

export const useNewsfeed = () => {
	const getNewsfeedByUserId = async userId => {
		if(!userId) {
			throw new Error('userId is required');
		}
		let res;
		const q = query(collection(db, "newsfeed"), where("userId", "==", userId), limit(1));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach(doc => {
			res = doc.data();
		});
		
		return Promise.resolve(res);
	}

	return { getNewsfeedByUserId };
}
