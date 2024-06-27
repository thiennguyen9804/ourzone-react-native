import { StyleSheet, View, Image, Text } from "react-native"

const ReactCard = ({userName, avatar, emoji}) => {
	return (
		<View style={styles.container}>
			<View style={styles.userSection}>
				<View style={styles.avatarContainer}>
					<View> style={styles.avatarOuter}
						<Image style={styles.avatar} source={{uri: avatar}} />
					</View>
				</View>
			</View>
			<View style={styles.emojiSection}>
				<Text>emoji...</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	
	userSection: {

	},

	emojiSection: {

	},

	avatarOuter: {
		width: 53,
		height: 53,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F8FFF8',
		borderRadius: 40,
	},
	avatar: {
		width: 53,
		height: 53,
		borderRadius: 40,
	},

	avatarContainer: {
		width: 60,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#738F81',
		borderRadius: 40,
	},
})

export default ReactCard