import { Image, StyleSheet, View, Text } from 'react-native';

export default function PostImage({ uri }) {
	const thatUri = uri;
	// console.log(uri);
	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<Image style={styles.image} resizeMode='cover' source={require('../assets/Kiana Avatar.jpg')}/>
			</View>

			<View>
				<View style={styles.avatarBackground}>
					<Image />
				</View>
				<Text>

				</Text>
				<Text>

				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#AAC2B3',
		width: '100%',
		aspectRatio: 1,
		borderRadius: 40,
		padding: 15,
		display: 'flex'
	},

	innerContainer: {
		width: '100%',
		aspectRatio: 1,
		borderRadius: 35,
		elevation: 13,
		overflow: 'hidden'
	},

	image: {
		aspectRatio: 1,
		flex: 1,
		width: null,
		height: null
	},
	avatarBackground: {

	}
})