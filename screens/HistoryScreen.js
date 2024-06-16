// frameworks
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
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

// icons
import backIcon from "../assets/back-icon";
import friendArrowIcon from "../assets/friend-arrow-icon";
import chatIcon from "../assets/chat-icon";
import gridIcon from "../assets/grid-icon";
import shareIcon from "../assets/share-icon"


const HistoryScreen = ({ navigation }) => {
	const { postIds, setPostIds, newsfeed } = useApplicationContext();
	const [isFriendsOpen, setIsFriendsOpen] = useState(false);
	const [isGrid, setIsGrid] = useState(false);
	const [postActiveId, setPostActiveId] = useState(postIds[0]);
	const [postActiveIndex, setPostActiveIndex] = useState(0);
	const linearListRef = useRef();
	const toggleFriendsOpen = () => setIsFriendsOpen(curr => !curr);
	const toggleIsGrid = () => {
		setIsGrid(curr => !curr);
	}
	// const viewabilityConfigCallbackPairs = useRef([
	// 	{
	// 		viewabilityConfig: { itemVisiblePercentThreshold: 100 },
	// 		onViewableItemsChanged: ({changed, viewableItems}) => {
	// 			if(viewableItems.length > 0 && viewableItems[0].isViewable) {
	// 				setPostActiveId(viewableItems[0].item.id);
	// 				setPostActiveIndex(viewableItems[0].index)
	// 			}
	// 		}
	// 	}
	// ]);

	const pressHandler = (index) => {
		// toggleIsGrid();
		// linearListRef.current.scrollToIndex({index: index, animated: false});
		console.log(index);
	}


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

			{/* for linear layout */}
			<FlatList
				ref={linearListRef}
				style={[styles.list, (isGrid && {display: 'none'})]}
				data={postIds}
				renderItem={({item}) => (
					(item.type === 'image' || !item.type) ? (
						<PostImageDetail postId={item} postActiveId={postActiveId}/>
					) : (
						<PostVideoDetail postId={item} postActiveId={postActiveId}/>
					)
				)}
				numColumns={1}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				pagingEnabled
				keyExtractor={(item, index) => (`${item} ${index} ${isGrid}`)}
			/>

			{/* for grid layout */}
			<FlatList
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
			/>
			
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

