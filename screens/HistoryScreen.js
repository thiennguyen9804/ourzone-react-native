// frameworks
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Animated, { SlideInDown, SlideInUp, SlideOutDown, SlideOutUp } from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import { useState } from "react";

// icons
import backIcon from "../assets/back-icon";
import friendArrowIcon from "../assets/friend-arrow-icon";
import chatIcon from "../assets/chat-icon";
import PostImage from "../components/PostImage";
import PostVideo from "../components/PostVideo";

const posts = [
	{
		id: 1,
		uri: '../assets/Kiana Avatar.jpg',
		type: 'video'
	},
	{
		id: 2,
		uri: '../assets/Kiana Avatar.jpg',
		type: 'image'
	},
	{
		id: 3,
		uri: '../assets/Kiana Avatar.jpg',
		type: 'image'
	},
	{
		id: 4,
		uri: '../assets/Kiana Avatar.jpg',
		type: 'video'
	},
	{
		id: 5,
		uri: '../assets/Kiana Avatar.jpg',
		type: 'video'
	},
	{
		id: 6,
		uri: '../assets/Kiana Avatar.jpg',
		type: 'image'
	},
]


const HistoryScreen = ({ navigation }) => {
	const [isFriendsOpen, setIsFriendsOpen] = useState(false);

	const toggleFriendsOpen = () => setIsFriendsOpen(curr => !curr);

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

			<FlatList
				style={styles.list}
				data={posts}
				renderItem={({item}) => (
					item.type === 'image' ? (
						<PostImage key={item.id} uri={item.uri}/>
					) : (
						<PostVideo />
					)
				)}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				pagingEnabled
					
			/>
			{/* <PostVideo /> */}

			<View>
				{/* footer buttons */}
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
		marginTop: 60,
		// top: 50,
		// left: 50,
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

