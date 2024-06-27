import { View, StyleSheet, Keyboard, Text, TouchableOpacity } from "react-native";
import LeftHalfBar from "./LeftHalfBar";
import RightHalfBar from "./RightHalfBar";
import ChatBar from "./ChatBar";
import { useState } from "react";
import { useApplicationContext } from "../hooks/useApplicationContext";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AllReact from "./AllReact";


export default function MyReactionBar({ width, toggleComment, toggleEmojiOpen, outCurrentPost }) {
	// const { chat, setChat } = useApplicationContext();
	// const chatToggle = () => setChat(prev => !prev);
	const [openAllReaction, setOpenAllReaction] = useState(false);
	const toggleOpenAllReaction = () => setOpenAllReaction(prev => !prev);
	let reaction;
	if(outCurrentPost && outCurrentPost.reaction)
		reaction = [...outCurrentPost.reaction];
	const pressHandler = () => {
		// chatToggle();
		if(!reaction)
			return;

		toggleOpenAllReaction();
	}
	// console.log(reaction)
	return (
		<View style={styles.largeContainer}>
			<View style={styles.container}>
				<View style={styles.reactionContainer}>
					<TouchableOpacity style={styles.subContainer} onPress={pressHandler} >
						{!reaction && <Text style={styles.text}>No reaction yet!</Text>}
						{reaction && <Text style={styles.text}>Someone reacted to your post!</Text>}
					</TouchableOpacity>
				</View>
			</View>
			{openAllReaction && <AllReact width={width} reaction={reaction} toggleOpenAllReaction={toggleOpenAllReaction}/>}
			
		</View>
	)
};

const styles = StyleSheet.create({
	largeContainer: {
		position: 'relative'
	},
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
	},

	subContainer: {
        height: 40,
        backgroundColor: '#AAC2B3',
        // backgroundColor: 'aqua',
        borderRadius: 20,
        // elevation: 6,
        paddingLeft: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },

	text: {
        color: '#fff',
        fontWeight: '500',
        letterSpacing: 0.6
        // padding
    }
});