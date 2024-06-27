import { StyleSheet, View, Image, Text } from "react-native"

const ReactionCard = ({userName, avatar, emoji}) => {
	console.log(userName);
	console.log(avatar);
	console.log(emoji);
	return (
		<View style={styles.container}>
			<View style={styles.userSection}>
				<View style={styles.avatarContainer}>
					<View style={styles.avatarOuter}>
						<Image style={styles.avatar} source={{uri: avatar}} />
					</View>
				</View>
				<Text style={{marginLeft: 5, color: 'white', fontWeight: 600, letterSpacing: 1.01}}>{userName}</Text>
			</View>
			<View style={styles.emojiSection}>
				{emoji.map((elem, index) => <Text style={{fontSize: 20}} key={`${elem}${index}`}>{elem}</Text>)}
			</View>
		</View>
	)
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	
	userSection: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},

	emojiSection: {

	},

	avatarOuter: {
		width: 26,
		height: 26,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F8FFF8',
		borderRadius: 40,
	},
	avatar: {
		width: 26,
		height: 26,
		borderRadius: 40,
	},

	avatarContainer: {
		width: 30,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#738F81',
		borderRadius: 40,
	},
});

export default ReactionCard