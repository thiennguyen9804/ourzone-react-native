import { View, StyleSheet, Keyboard } from "react-native";
import LeftHalfBar from "./LeftHalfBar";
import RightHalfBar from "./RightHalfBar";
import ChatBar from "./ChatBar";
import { useState } from "react";
import { useApplicationContext } from "../hooks/useApplicationContext";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function ReactionBar() {
	const { chat, setChat } = useApplicationContext();
	const chatToggle = () => setChat(prev => !prev);
	const pressHandler = () => {
		
	}
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				{/* {chat && <ChatBar />} */}
				<View style={styles.reactionContainer}>
					<LeftHalfBar chatToggle={chatToggle}/>
					<RightHalfBar/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		width: 250,
		height: 40,
		// backgroundColor: 'red',
		elevation: 6,
		borderRadius: 20
	},

	reactionContainer: {
		display: 'flex',
		flexDirection: 'row',
	}
});