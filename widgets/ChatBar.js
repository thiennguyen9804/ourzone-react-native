import { forwardRef } from "react"
import sendIcon from "../assets/send-icon";
import { StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import { SvgXml } from "react-native-svg";

const ChatBar = () => {
	return (
		<View style={styles.container}>
			<TextInput
				focusable
				style={styles.textInput}
				placeholder="Type a message..."
				placeholderTextColor="#fff"
			/>
			<TouchableOpacity>            
				<SvgXml xml={sendIcon} style={styles.icon}/>
			</TouchableOpacity> 
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
        alignItems: 'center',
	},

	textInput: {
        flex: 1,
        height: 40,
        marginLeft: 10,
        marginRight:10,
        paddingLeft: 10,
        color: "#fff",
        borderRadius: 20,
        backgroundColor: '#AAC2B3',
        fontFamily:'OpenSans',
    },

	icon: {
        padding: 10,
    },
})

export default ChatBar;