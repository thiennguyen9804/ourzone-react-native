import React from 'react';
import { StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

const PostVideo = () => {
  return (
		<Video
			style={styles.image}
			source={require('../assets/Kiana Video.mp4')}
			isLooping
			resizeMode={ResizeMode.COVER}
			shouldPlay
		/>
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