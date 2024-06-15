import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

const PostVideo = ({ pressHandler, index }) => {
  return (
	<Pressable onPress={() => pressHandler(index)} style={styles.image}>
		<Video
			style={styles.image}
			source={require('../assets/Kiana Video.mp4')}
			isLooping
			resizeMode={ResizeMode.COVER}
			shouldPlay
		/>
	</Pressable>
	);
}

const styles = StyleSheet.create({
	image: {
		aspectRatio: 1,
		flex: 1,
		width: null,
		height: null
	}
})

export default PostVideo