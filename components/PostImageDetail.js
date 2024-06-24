import { Image, StyleSheet, View, Text, useWindowDimensions, TextInput } from 'react-native';
import { formatDistanceStrict } from 'date-fns';
import { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';
import { usePost } from '../hooks/usePost';
import { formatDistanceToNowStrict } from 'date-fns/formatDistanceToNowStrict';

export default function PostImageDetail({postId}) {
	const [currentUser, setCurrentUser] = useState({});
	const [currentPost, setCurrentPost] = useState({});
	const { getUserByUserId } = useUser();
	const { getPostByPostId } = usePost();
	useEffect(() => {
		(async () => {
			try {
				let currentPostValue = await getPostByPostId(postId).catch(reason => console.log(reason));
				setCurrentPost(currentPostValue);
			} catch(err) {
				console.log(err);
			}
		})();
	}, [setCurrentPost]);

	useEffect(() => {
		(async () => {
			try {
				let currentUserValue = await getUserByUserId(currentPost.userId);
				setCurrentUser(currentUserValue);
			} catch(err) {
				console.log(err.message);
			}

		})();
	}, [setCurrentUser, currentPost]);

	const { height } = useWindowDimensions();
	console.log('currentPost', currentPost);
	console.log('currentUser', currentUser);
	// console.log('createdAt: ', currentPost.createdAt, new Date(currentPost.createdAt.seconds * 1000));
	return (
		<View style={[styles.container, { height }]}>
			{/* image  */}
			<View style={styles.imageContainer}>
				<View style={styles.innerImageContainer}>
					<Image style={styles.image} resizeMode='cover' source={{uri: currentPost.image}}/>
					{currentPost.content && <View style={{width: '100%', position: 'absolute', left: 0, right: 0, bottom: 10, justifyContent: 'center', alignItems: 'center'}}>
						<TextInput multiline textAlign='center' style={styles.messageInput} editable={false} value={currentPost.content}/>
					</View>}
				</View>
				
			</View>

			{/* user  */}
			<View style={styles.userContainer}>
				{/* avatar */}
				<View style={styles.avatarContainer}>
					<View style={styles.innerImageContainer}>
						<Image style={styles.image} resizeMode='cover' source={{uri: currentUser.avatar}}/>
					</View>
				</View>

				{/* name */}
				<Text style={styles.userName}>{`${currentUser.firstName} ${currentUser.lastName}`}</Text>

				{/* time */}
				{/* <Text style={styles.timeTxt}>{formatDistanceToNowStrict(new Date((currentPost.createdAt.seconds * 1000) || 0))}</Text>	 */}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
	},
	
	imageContainer: {
		backgroundColor: '#AAC2B3',
		width: '100%',
		aspectRatio: 1,
		borderRadius: 40,
		padding: 15,
		display: 'flex'
	},

	innerImageContainer: {
		width: '100%',
		aspectRatio: 1,
		borderRadius: 35,
		elevation: 13,
		overflow: 'hidden'
	},

	image: {
		aspectRatio: 1,
		flex: 1,
		width: null,
		height: null
	},

	userContainer: {
		marginTop: 20,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10
	},


	avatarContainer: {
		backgroundColor: '#AAC2B3',
		width: 30,
		aspectRatio: 1,
		borderRadius: 15,
		padding: 2,
		display: 'flex',
	},

	userName: {
		fontWeight: 'bold',
		color: '#738F81',
		fontSize: 20,
		letterSpacing: 1.03
	},

	timeTxt: {
		color: '#A1A1A1',
		fontWeight: 'bold',
		fontSize: 12,

	},

	messageInput: {
		borderRadius: 18,
		fontWeight: 'bold',
		backgroundColor: '#fff',
		letterSpacing: 1.2,
		borderWidth: 5,
		borderColor: '#fff',
		paddingHorizontal: 10,
		paddingVertical: 3,
		fontSize: 16,
	},
})