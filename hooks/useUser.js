import { useState } from "react"
import { collection, query, where, limit, getDocs, onSnapshot, doc, getDoc } from "firebase/firestore";
import { app, db } from "../firebase";
import { useDispatch } from "react-redux";
import { setUserId } from "../slices/userSlice";

export const useUser = () => {
	const getUserByEmail = async email => {
		if(!email) {
			throw new Error('email is required');
		}
		let res;
		const q = query(collection(db, "user"), where("email", "==", email), limit(1));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach(doc => {
			res = doc.data();
		});
		
		return Promise.resolve(res);
	}

	// get real time update
	// setUser can be optional
	const getUserByUserId = async (userId, setUser) => {
		if(!userId) {
			throw new Error('getUserByUserId requires userId');
		}
		
		let res;
		const docSnap = await getDoc(doc(db, 'user', userId));
		if(docSnap.exists()) {
			res = docSnap.data();
			if(setUser) {
				setUser(res);
			}
			return Promise.resolve(res);
		}
		

	}

	return { getUserByEmail, getUserByUserId };
}
