import { useState } from "react"
import { collection, query, where, limit, getDocs, Timestamp, setDoc, addDoc, updateDoc } from "firebase/firestore";
import { app, db } from "../firebase";
import { useDispatch } from "react-redux";
import { useApplicationContext } from "./useApplicationContext";


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

	const createPost = async (content, image, userId, type) => {
		const newPost = {
			content,
			createdAt: Timestamp.fromMillis(Date.now()),
			image,
			userId,
			type
		};

		const newPostRef = await addDoc(collection(db, 'post'), newPost);
		const result = await updateDoc(newPostRef, { postId: newPostRef.id });
		console.log('result from add post', result);
		return Promise.resolve(newPostRef);
	};

	return { getPostByPostId, createPost };
}
