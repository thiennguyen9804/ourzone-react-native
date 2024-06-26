import { View, StyleSheet, Keyboard } from "react-native";
import LeftHalfBar from "./LeftHalfBar";
import RightHalfBar from "./RightHalfBar";
import ChatBar from "./ChatBar";
import { useState } from "react";
import { useApplicationContext } from "../hooks/useApplicationContext";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function ReactionBar({ toggleComment }) {
	// const { chat, setChat } = useApplicationContext();
	// const chatToggle = () => setChat(prev => !prev);
	const pressHandler = () => {
		// chatToggle();
		Keyboard.dismiss();
		toggleComment();
	}
	
	return (
		<View onPress={pressHandler}>
			<View style={styles.container}>
				<View style={styles.reactionContainer}>
					<LeftHalfBar toggleComment={toggleComment} />
					<RightHalfBar/>
				</View>
			</View>
		</View>
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