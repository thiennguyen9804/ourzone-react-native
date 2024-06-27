import { forwardRef, useState } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { SvgXml } from "react-native-svg"
// import EmojiPicker from "emoji-picker-react";
import EmojiSelector from 'react-native-emoji-selector'

import heartEmojiIcon from "../assets/heart-emoji-icon";
import sadEmojiIcon from "../assets/sad-emoji-icon";
import fireEmojiIcon from "../assets/fire-emoji-icon";
import moreEmojiIcon from "../assets/more-emoji-icon"

const RightHalfBar = ({toggleEmojiOpen}) => {
	const [emojiOpen, setEmojiOpen] = useState(false);
	const pressHandler = () => {
		toggleEmojiOpen();
	}
	return (
		<TouchableOpacity style={styles.container} onPress={pressHandler}>
			{/* <EmojiSelector/> */}
			<SvgXml xml={heartEmojiIcon} />
			<SvgXml xml={sadEmojiIcon} />
			<SvgXml xml={fireEmojiIcon} />
			<SvgXml xml={moreEmojiIcon} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
        height: 40,
        backgroundColor: '#AAC2B3',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        // elevation: 6,
		paddingRight: 5,
        display: 'flex',
		flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1
    },
})

export default (RightHalfBar)