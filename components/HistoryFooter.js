import { View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import gridIcon from '../assets/grid-icon';
import shareIcon from '../assets/share-icon';
import { SvgXml } from 'react-native-svg';
import ReactionBar from '../widgets/ReactionBar';

const HistoryFooter = ({toggleIsGrid, toggleComment}) => {
	const pressHandler = () => {
		Keyboard.dismiss();
	}
	return (
		<View style={styles.footerSection}>
			{/* grid */}
			<TouchableOpacity onPress={toggleIsGrid}>
				<SvgXml xml={gridIcon}/>
			</TouchableOpacity>

			{/* reaction bar */}
			<ReactionBar toggleComment={toggleComment}/>

			{/* share */}
			<TouchableOpacity>
				<SvgXml xml={shareIcon}/>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	footerSection : {
		position: 'absolute',
		display: 'flex',
		flexDirection: 'row',
		bottom: 40,
		left: 0,
		right: 0,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		zIndex: 1,
		width: '100%'
	},
})


export default HistoryFooter