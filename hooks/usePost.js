import { useState } from "react"
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { app, db } from "../firebase";
import { useDispatch } from "react-redux";


export const usePost = () => {
	const getPostByPostId = async postId => {
		if(!postId) {
			throw new Error('postId is required');
		}
		let res = {}
		const q = query(collection(db, 'post'), where('postId', '==', postId), limit(1));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach(doc => {
			if(doc.exists()) {
				res = doc.data();
			}
		});

		return Promise.resolve(res);
	}	

	return { getPostByPostId };
}
