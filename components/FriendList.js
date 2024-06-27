import { Dimensions, Modal, FlatList, StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity } from "react-native"
import { useApplicationContext } from "../hooks/useApplicationContext";
import UserFriendCard from "./UserFriendCard";
import { useNavigation } from "@react-navigation/native";
import FriendFilter from "../widgets/FriendFilter";
import AllFriendFilter from "../widgets/AllFriendFilter";


const {width, height} = Dimensions.get('window');
const containerWidth = 300
const FriendList = ({
	toggleFriendsOpen, 
	filterUserId, setFilterUserId, 
	filterUserName, setFilterUserName,
	setFilterPostIds, postIds
}) => {
	const navigation = useNavigation();
	const { friends } = useApplicationContext();
	// console.log('friends: ');
	// friends.forEach(elem => {
	// 	console.log(elem);
	// })
	return (
		<>
			<TouchableWithoutFeedback onPress={toggleFriendsOpen}>
				<View style={styles.veil}/>
			</TouchableWithoutFeedback>
			<View style={[styles.container]}>
				<FlatList
					style={[styles.flatList]}
					data={friends}
					renderItem={({ item, index }) => {
						if(index === 0) {
							return (
								<AllFriendFilter 
									setFilterUserId={setFilterUserId}	
									toggleFriendsOpen={toggleFriendsOpen}
									filterUserName={filterUserName}
									setFilterUserName={setFilterUserName}
								/>
							)
						}
						return (<FriendFilter
									postIds={postIds}
									toggleFriendsOpen={toggleFriendsOpen}
									setFilterUserId={setFilterUserId}	
									userId={item.userId}
									username={item.userName}
									avatar={item.avatar}
									navigation={navigation}
									setFilterPostIds={setFilterPostIds}
									filterUserName={filterUserName}
									setFilterUserName={setFilterUserName}
								/>)
					}}
					keyExtractor={(item) => `${item.userId} ${Math.random()}`}
					horizontal={false}
					maxToRenderPerBatch={4}
				/>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	veil: {
		position: 'absolute',
		backgroundColor: 'black',
		opacity: 0.3,
		top: height * 0.07,
		width: width,
		left: 0,
		height: Dimensions.get('screen').height,
	},

	container: {
		position: "absolute",
		width: containerWidth,
		// backgroundColor: 'red',
		left: width * 0.5 - (containerWidth / 2),
		top: height * 0.07,
		flex: 1
	},


	flatList: {
		borderRadius: 30,
		backgroundColor:  '#F8FFF8',
		// backgroundColor:  'yellow',
		// flex: 1
	},
});
  
export default FriendList;
  