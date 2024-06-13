import React from 'react';
import { StyleSheet, Image } from 'react-native';

const PostImage = () => {
  return (
    <Image style={styles.image} resizeMode='cover' source={require('../assets/Kiana Avatar.jpg')}/>
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

export default PostImage