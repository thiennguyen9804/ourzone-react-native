// frameworks
import { FlatList, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import Animated, { SlideInDown, SlideInUp, SlideOutDown, SlideOutUp } from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import PostVideoDetail from "../components/PostVideoDetail";
import PostImageDetail from "../components/PostImageDetail";
import PostImage from '../components/PostImage';
import PostVideo from "../components/PostVideo";
import { useApplicationContext } from "../hooks/useApplicationContext";
import { usePost } from "../hooks/usePost";
import { useUser } from "../hooks/useUser";
import EmojiSelector from 'react-native-emoji-selector';
// icons
import backIcon from "../assets/back-icon";
import friendArrowIcon from "../assets/friend-arrow-icon";
import chatIcon from "../assets/chat-icon";
import gridIcon from "../assets/grid-icon";
import shareIcon from "../assets/share-icon"
import PostItemDetail from "../components/PostItemDetail";
import ReactionBar from "../widgets/ReactionBar";
import HistoryFooter from "../components/HistoryFooter";
import ChatBar from "../widgets/ChatBar";
import { db } from '../firebase'
import { collection, getDocs, query, or, where, limit } from "firebase/firestore";
import { useMessage } from "../hooks/useMessage";
import FriendList from "../components/FriendList";

let globalChat = false;

const HistoryScreen = ({ navigation }) => {
	const { postIds, setPostIds, newsfeed, user, posts } = useApplicationContext();
	const [filterPostIds, setFilterPostIds] = useState([]);
	const [filterUserId, setFilterUserId] = useState('all');
	const [currentUser, setCurrentUser] = useState({});
	const [currentPost, setCurrentPost] = useState({});
	const [isFriendsOpen, setIsFriendsOpen] = useState(false);
	const [comment, setComment] = useState(false); 
	const [emojiOpen, setEmojiOpen] = useState(false);
	const [isGrid, setIsGrid] = useState(false);
	const [postActiveId, setPostActiveId] = useState(postIds[0]);
	const [postActiveIndex, setPostActiveIndex] = useState(0);
	const linearListRef = useRef();
	const toggleFriendsOpen = () => setIsFriendsOpen(curr => !curr);
	const [content, setContent] = useState('');
	const [outCurrentUser, setOutCurrentUser] = useState({});
	const [outCurrentPost, setOutCurrentPost] = useState({});
	const { getPostByPostId } = usePost();
	const toggleIsGrid = () => {
		setIsGrid(curr => !curr);
	};
	const toggleComment = () => setComment(prev => !prev);
	const { addMessage } = useMessage();
	// console.log('all posts', posts);

	const viewabilityConfigCallbackPairs = useRef([
		{
			viewabilityConfig: { itemVisiblePercentThreshold: 100 },
			onViewableItemsChanged: ({changed, viewableItems}) => {
				if(viewableItems.length > 0 && viewableItems[0].isViewable) {
					console.log(viewableItems[0].item);
					setPostActiveId(viewableItems[0].item);
					setPostActiveIndex(viewableItems[0].index)
				}
			}
		}
	]);

	const pressHandler = (index) => {
		// toggleIsGrid();
		// linearListRef.current.scrollToIndex({index: index, animated: false});
		// console.log(index);
	}

	const historyPress = () => {
		setChat(prev => !prev);
		Keyboard.dismiss();
	}

	const wholeScreenPressHandler = () => {
		toggleComment();
		Keyboard.dismiss();
	}

	const commentOnImage = async () => {
		console.log('comment value', content, user, outCurrentUser, outCurrentPost);
		const q = query(collection(db, 'messageRoom'), or(
            where('users', '==', [user.userId, currentUser.userId], limit(1)),
            where('users', '==', [currentUser.userId, user.userId], limit(1))
        ));
		const newValue = {
			mediaType: (!outCurrentPost.mediaType || outCurrentPost.mediaType === 'image') ? 'image' : 'video',
			image: outCurrentPost.image,
			sendUser: user.userId,
			content
		}

		console.log(newValue);
		console.log(outCurrentPost)
		const querySnapshot = await getDocs(q);
		let messageRoomId;
		querySnapshot.forEach(doc => {
			messageRoomId = doc.id;
		});
		console.log('room', messageRoomId);
		addMessage(messageRoomId, newValue);
		Keyboard.dismiss();
		toggleComment();
		setContent('');
		// console.log('room id', messageRoomId)
	}

	useEffect(() => {
		console.log(postIds);
		let temp = [];
		if(filterUserId === 'all') {
			posts.forEach(elem => {
				temp.push(elem.postId);
			});
		} else {
			posts.forEach(elem => {
				if(elem.userId === filterUserId)
					temp.push(elem.postId);
			});
		}
		console.log(temp);
		if(temp)
			setPostActiveId(temp[0])
		setFilterPostIds([...temp]);
		return () => setFilterPostIds([]);
	}, [filterUserId]);
	
	
	console.log('---------------------------------------')
	console.log('all filter posts', filterPostIds);
	return (
		<Animated.View
			style={styles.container}
			entering={SlideInDown}
			exiting={SlideOutDown}
		>
			<View style={styles.headerSection}>
				{/* back btn */}
				<TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Camera')}>
					<SvgXml style={styles.backIcon} rotation={90} xml={backIcon} />
				</TouchableOpacity>

				{/* friend filter */}
				<TouchableOpacity style={styles.friendBtn} onPress={toggleFriendsOpen}>
					<Text style={styles.friendTxt}>All Friends</Text>
					<SvgXml translateY={2.6} rotation={!isFriendsOpen ? 0 : 180.0} xml={friendArrowIcon} />
				</TouchableOpacity>

				{isFriendsOpen && 
				<FriendList 
					toggleFriendsOpen={toggleFriendsOpen} 
					filterUserId={filterUserId} setFilterUserId={setFilterUserId}
					postIds={postIds} setFilterPostIds={setFilterPostIds}
				/>}

				{/* chat btn */}
				<TouchableOpacity style={styles.chatBtn} onPress={() => navigation.navigate('Message')}>
					<SvgXml xml={chatIcon} />
				</TouchableOpacity>
			</View>

			{/* for linear layout */}
			<FlatList
				scrollEnabled={!isFriendsOpen}
				ref={linearListRef}
				style={[styles.list, (isGrid && {display: 'none'})]}
				data={filterPostIds}
				renderItem={({item}) => (
					<PostItemDetail 
						postId={item} 
						postActiveId={postActiveId}
						setOutCurrentPost={setOutCurrentPost}
						setOutCurrentUser={setCurrentUser}
					/>)}
				numColumns={1}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				pagingEnabled
				keyExtractor={(item, index) => (`${item.postId} ${index} ${isGrid}`)}
				viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
			/>

			{/* for grid layout */}
			{/* <FlatList
				style={[styles.list, {marginTop: 140}, (!isGrid && {display: 'none'})]}
				data={postIds}
				renderItem={({ item, index }) => (
					(item.type === 'image' || !item.type) ? (
						<PostImage 
							postId={item} postActiveId={postActiveId}
							pressHandler={pressHandler} index={index}
						/>
					) : (
						
						<PostVideo pressHandler={pressHandler} index={index} />
					)
				)}
				numColumns={3}
				horizontal={false}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item, index) => (`${item} ${index} ${isGrid}`)}
			/> */}
			
			{/* footer buttons */}
			{comment && 
			<ChatBar 
				toggleComment={toggleComment}
				content={content}
				setContent={setContent}
				commentOnImage={commentOnImage}
			/>}
			{!comment && <HistoryFooter toggleComment={toggleComment} toggleIsGrid />}
		</Animated.View>
	)
}

export default HistoryScreen


const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		// opacity: (globalChat ? 0.8 : 1)
		// position: 'absolute'
	},

	headerSection: {
		position: 'absolute',
		display: 'flex',
		flexDirection: 'row',
		// marginTop: 60,
		top: 60,
		// left: 50,
		justifyContent: 'space-around',
		zIndex: 1,
		width: '100%'
	},

	footerSection : {
		position: 'absolute',
		display: 'flex',
		flexDirection: 'row',
		bottom: 40,
		left: 0,
		right: 0,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		zIndex: 1,
		width: '100%'
	},

	friendTxt: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#738F81',
		letterSpacing: 1.08
	},

	friendBtn: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: 145,
		height: 50,
		gap: 15,
		transform: [
			{translateY: -2}
		]
	},

	chatBtn: {
		backgroundColor: '#AAC2B3',
		width: 50,
		height: 50,
		borderRadius: 25,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},

	backBtn: {
		width: 50,
		height: 50,
	},

	backIcon: {
		margin: 'auto'
	},
	
	list: {
		
		// flexWrap: 'wrap',
		// aspectRatio: 1
		// height: null,
		// backgroundColor: 'orange'
	},

	listContainer: {
		// flex: 1,
		width: '100%',
		height: '100%',
		position: 'absolute'
		// backgroundColor: 'aqua'
	}

});

