import { forwardRef } from "react"
import sendIcon from "../assets/send-icon";
import { StyleSheet, TextInput, TouchableOpacity, View, Dimensions, TouchableWithoutFeedback, Keyboard} from "react-native";
import { SvgXml } from "react-native-svg";



const ChatBar = ({ toggleComment, content, setContent, commentOnImage }) => {
	const pressHandler = () => {
		toggleComment();
		Keyboard.dismiss();
	}
	return (
		<>
			<TouchableWithoutFeedback onPress={pressHandler}>
				<View style={styles.veil}/>
			</TouchableWithoutFeedback>
				
			<View style={styles.container}>
				<TextInput
					value={content}
					onChangeText={setContent}
					autoFocus
					style={styles.textInput}
					placeholder="Type a message..."
					placeholderTextColor="#fff"
				/>
				
				{<TouchableOpacity 
					style={styles.rightHalf} 
					disabled={!content}
					onPress={commentOnImage}> 
					<View style={[styles.innerRightHalf, {opacity: (!content ? 0.3 : 1)}]}>
						<SvgXml xml={sendIcon} style={styles.icon}/>
					</View>           
				</TouchableOpacity>} 
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		width: Dimensions.get('screen').width,
		height: Dimensions.get('screen').height,
		flexDirection: 'row',
		top: Dimensions.get('screen').height * 0.1,
        alignItems: 'center',
		paddingHorizontal: 20,
		// justifyContent: 'center'
		// backgroundColor: 'red'
	},

	rightHalf: {
		backgroundColor: '#AAC2B3',
		flex: 18,
		height: 50,
		borderTopRightRadius: 25,
		borderBottomRightRadius: 25
	},

	innerRightHalf: {
		width: 40,
		height: 40,
		backgroundColor: '#c2c2c2',
		margin: 'auto',
		borderRadius: 20
	},

	textInput: {
        flex: 82,
        height: 50,
        marginLeft: 10,
        // marginRight:10,
        paddingLeft: 10,
        color: "#fff",
        // borderRadius: 20,
		borderTopLeftRadius: 25,
		borderBottomLeftRadius: 25,
        backgroundColor: '#AAC2B3',
        fontFamily:'OpenSans',
    },

	veil: {
		position: 'absolute',
		backgroundColor: 'black',
		opacity: 0.3,
		width: Dimensions.get('screen').width,
		height: Dimensions.get('screen').height,
	},

	icon: {
        padding: 10,
		margin: 'auto',
		transform: [
			{scale: 0.6}
		],
		// backgroundColor: 'aqua'
    },
})

export default ChatBar;