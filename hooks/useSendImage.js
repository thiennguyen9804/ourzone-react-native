import { useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useApplicationContext } from "./useApplicationContext";
import { usePost } from "./usePost";
import { useNewsfeed } from "./useNewsfeed";

export const useSendImage = () => {
	const storage = getStorage();
	const { user, newsfeed, setNewsfeed, setPostIds } = useApplicationContext();
	const { createPost } = usePost();
	const { addNewPostIdToNewsfeed } = useNewsfeed();
 	const [loading, setLoading] = useState(true);
	

	// if(!user.userId) {
	// 	console.log(user);
	// 	throw new Error('userId is not exists');
	// }
	const sendImage = async (imageUri, content) => {
		if(!user) {
			throw new Error('user is not exists, happened in sendImage');
		}
		const fetchResponse = await fetch(imageUri);
		const theBlob = await fetchResponse.blob();
		const imageRef = ref(storage, `${user.userId}/${Date.now()}`);
		const uploadTask = await uploadBytesResumable(imageRef, theBlob);	 
		const downloadUri = await getDownloadURL(imageRef);
		// console.log('download uri', downloadUri);
		console.log('user in use send image', user);
		const newPostRef = await createPost(content, downloadUri, user.userId);
		const newNewsfeedRef = await addNewPostIdToNewsfeed(newsfeed.newsfeedId, newPostRef.id);
		console.log('newNewsfeedRef', newNewsfeedRef);
		setPostIds(prev => [newPostRef.id, ...prev]);
		setNewsfeed(prev => ({...prev, posts: [...prev.posts, newPostRef.id]}));
		setLoading(false);
	}

	return { loading, setLoading, sendImage };

}