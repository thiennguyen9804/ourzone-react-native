import { useState } from "react"
import { collection, query, where, limit, getDocs } from "firebase/firestore";
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

	const getUserByUserId = async userId => {
		if(!userId) {
			throw new Error('getUserByUserId requires userId');
		}
		let res;
		const q = query(collection(db, "user"), where("userId", "==", userId), limit(1));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach(doc => {
			res = doc.data();
		});

		return Promise.resolve(res);
	}

	return { getUserByEmail, getUserByUserId };
}
