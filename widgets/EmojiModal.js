import { forwardRef } from "react"
import sendIcon from "../assets/send-icon";
import { StyleSheet, TextInput, TouchableOpacity, View, Dimensions, TouchableWithoutFeedback, Keyboard} from "react-native";
import { SvgXml } from "react-native-svg";
import EmojiSelector, { Categories } from "react-native-emoji-selector"; 

const EmojiModal = ({ toggleEmojiOpen, content, setContent, commentOnImage }) => {
	const pressHandler = () => {
		toggleEmojiOpen();
		Keyboard.dismiss();
		// setContent('');
	}
	try {
		return (
			<>
				<TouchableWithoutFeedback onPress={pressHandler}>
					<View style={styles.veil}/>
				</TouchableWithoutFeedback>
					
				<View style={styles.container}>
					<EmojiSelector 
						onEmojiSelected={(emoji) => {
							try {
								console.log(emoji);
							} catch(error) {
								console.log(error);
							}
						}} 
						category={Categories.all} 
						showTabs={true} 
						showSearchBar={false} 
						showHistory={true} 
						columns={7} 
						placeholder="Search emoji..."
					/> 
					
					{/* {<TouchableOpacity 
						style={styles.rightHalf} 
						disabled={!content}
						onPress={commentOnImage}> 
						<View style={[styles.innerRightHalf, {opacity: (!content ? 0.3 : 1)}]}>
							<SvgXml xml={sendIcon} style={styles.icon}/>
						</View>           
					</TouchableOpacity>}  */}
				</View>
			</>
		)
	} catch(error) {
		console.log(error)
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		width: Dimensions.get('screen').width,
		height: Dimensions.get('screen').height * 0.35,
		flexDirection: 'row',
		bottom: Dimensions.get('screen').height * 0.1,
        alignItems: 'center',
		paddingHorizontal: 20,
		// backgroundColor: 'white',
		flex: 1
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

export default EmojiModal;