// frameworks
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Animated, { SlideInDown, SlideInUp, SlideOutDown, SlideOutUp } from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import { useState, useRef } from "react";
import PostVideoDetail from "../components/PostVideoDetail";
import PostImageDetail from "../components/PostImageDetail";
import PostImage from '../components/PostImage';
import PostVideo from "../components/PostVideo";

// icons
import backIcon from "../assets/back-icon";
import friendArrowIcon from "../assets/friend-arrow-icon";
import chatIcon from "../assets/chat-icon";
import gridIcon from "../assets/grid-icon";
import shareIcon from "../assets/share-icon"


const posts = [
	{
		id: 1,
		uri: '../assets/Kiana.jpg',
		type: 'video',
		userAvatar: '../assets/Kiana Avatar.jpg'
	},
	{
		id: 2,
		uri: '../assets/Kiana.jpg',
		type: 'image',
		userAvatar: '../assets/Kiana Avatar.jpg'
	},
	{
		id: 3,
		uri: '../assets/Kiana.jpg',
		type: 'image',
		userAvatar: '../assets/Kiana Avatar.jpg'
	},
	{
		id: 4,
		uri: '../assets/Kiana.jpg',
		type: 'video',
		userAvatar: '../assets/Kiana Avatar.jpg'
	},
	{
		id: 5,
		uri: '../assets/Kiana.jpg',
		type: 'video',
		userAvatar: '../assets/Kiana Avatar.jpg'
	},
	{
		id: 6,
		uri: '../assets/Kiana Avatar.jpg',
		type: 'image',
		userAvatar: '../assets/Kiana Avatar.jpg'
	},
]

const HistoryScreen = ({ navigation }) => {
	const [isFriendsOpen, setIsFriendsOpen] = useState(false);
	const [isGrid, setIsGrid] = useState(false);
	const [postActiveId, setPostActiveId] = useState(posts[0].id);

	const toggleFriendsOpen = () => setIsFriendsOpen(curr => !curr);
	const toggleIsGrid = () => setIsGrid(curr => !curr);
	const viewabilityConfigCallbackPairs = useRef([
		{
			viewabilityConfig: { itemVisiblePercentThreshold: 100 },
			onViewableItemsChanged: ({changed, viewableItems}) => {
				if(viewableItems.length > 0 && viewableItems[0].isViewable) {
					setPostActiveId(viewableItems[0].item.id)
				}
			}
		}
	]);

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

				{/* chat btn */}
				<TouchableOpacity style={styles.chatBtn}>
					<SvgXml xml={chatIcon} />
				</TouchableOpacity>
			</View>

			{!isGrid ? (
				<FlatList
					key={isGrid}
					style={styles.list}
					data={posts}
					renderItem={({item}) => (
						item.type === 'image' ? (
							<PostImageDetail id={item.id} uri={item.uri} postActiveId={postActiveId}/>
						) : (
							<PostVideoDetail id={item.id} uri={item.uri} postActiveId={postActiveId}/>
						)
					)}
					numColumns={1}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					pagingEnabled
					viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
				/>
			) : (
				<FlatList
					key={isGrid}
					style={[styles.list, {marginTop: 140}]}
					data={posts}
					renderItem={({item}) => (
						item.type === 'image' ? (
							<PostImage />
						) : (
							<PostVideo />
						)
					)}
					numColumns={3}
					horizontal={false}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
				/>
			)}

			{/* footer buttons */}
			<View style={styles.footerSection}>
				{/* grid */}
				<TouchableOpacity onPress={toggleIsGrid}>
					<SvgXml xml={gridIcon}/>
				</TouchableOpacity>

				{/* share */}
				<TouchableOpacity>
					<SvgXml xml={shareIcon}/>
				</TouchableOpacity>
			</View>

		</Animated.View>
	)
}

export default HistoryScreen

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
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
		justifyContent: 'space-around',
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

