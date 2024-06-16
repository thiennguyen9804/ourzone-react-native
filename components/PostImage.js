import React,{ useState, useEffect } from 'react';
import { StyleSheet, Image, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useUser } from '../hooks/useUser';
import { usePost } from '../hooks/usePost';

const PostImage = ({ postId, pressHandler, index }) => {
	const [currentPost, setCurrentPost] = useState({});
	const { getPostByPostId } = usePost();
	useEffect(() => {
		(async () => {
			let currentPostValue = await getPostByPostId(postId);
			setCurrentPost(currentPostValue);
		})();
	}, [setCurrentPost]);


  	return (
		<Pressable style={styles.image} onPress={() => pressHandler(index)}>
			<Image style={styles.image} resizeMode='cover' source={{uri: currentPost.image}}/>
		</Pressable>
	// <TouchableOpacity style={styles.image}>
	// </TouchableOpacity>
  	);
}

const styles = StyleSheet.create({
	image: {
		aspectRatio: 1,
		flex: 1,
		width: null,
		height: null
	},

	container: {
		// backgroundColor: 'red',
		// aspectRatio: 1,
		// flex: 1,
		// width: null,
		// height: null,
		// borderRadius: 30
		width: '100%'
	}
})

export default PostImage