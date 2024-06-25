import { Image, StyleSheet, View, Text, useWindowDimensions, TextInput } from 'react-native';
import { formatDistanceStrict } from 'date-fns';
import { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';
import { usePost } from '../hooks/usePost';
import { formatDistanceToNowStrict } from 'date-fns/formatDistanceToNowStrict';
import PostImageDetail from './PostImageDetail';
import PostVideoDetail from './PostVideoDetail';

export default function PostItemDetail({postId, postActiveId}) {
	console.log(postId, postActiveId);
	const [currentUser, setCurrentUser] = useState({});
	const [currentPost, setCurrentPost] = useState({});
	const { getUserByUserId } = useUser();
	const { getPostByPostId } = usePost();
	useEffect(() => {
		if(postId !== postActiveId) {
			return;
		}
		(async () => {
			try {
				let currentPostValue = await getPostByPostId(postId).catch(reason => console.log(reason));
				setCurrentPost(currentPostValue);
			} catch(err) {
				console.log(err);
			}
		})();
	}, [setCurrentPost, postActiveId]);

	useEffect(() => {
		// if(postId !== postActiveId) {
		// 	return;
		// }
		(async () => {
			try {
				let currentUserValue = await getUserByUserId(currentPost.userId);
				setCurrentUser(currentUserValue);
			} catch(err) {
				console.log(err.message);
			}

		})();
	}, [setCurrentUser, currentPost]);
	return (
		<>
			{currentPost.type === 'image' || !currentPost.type && (
				<PostImageDetail currentPost={currentPost} currentUser={currentUser}/>
			)}
			{currentPost.type === 'video' && (
				<PostVideoDetail currentPost={currentPost} currentUser={currentUser}/>
			)} 
		</>
	);
}