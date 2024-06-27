import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TouchableWithoutFeedback, Alert, FlatList, Dimensions } from 'react-native';
import ReactionCard from './ReactionCard';
import Animated, { SlideInDown, SlideInUp, SlideOutDown } from 'react-native-reanimated';
import { useApplicationContext } from '../hooks/useApplicationContext';



const AllReact = ({ width, reaction, toggleOpenAllReaction }) => {

	const pressHandler = () => {
		toggleOpenAllReaction();
	}

	const { globalWidth } = useApplicationContext();
	console.log(...reaction);
    return (
		<Animated.View entering={SlideInDown} exiting={SlideOutDown}>
			<TouchableWithoutFeedback onPress={pressHandler}>
				<View style={styles.veil}/>	
			</TouchableWithoutFeedback>
				
			<View style={styles.container}>
				<FlatList
					data={reaction}
					renderItem={({ item }) => <ReactionCard userName={item.user.userName} emoji={item.emoji} avatar={item.user.avatar}/>}
					keyExtractor={item => `${Math.random()}`}
				/>
			</View>
		</Animated.View>
    );
};
  
const styles = StyleSheet.create({
	veil: {
		position: 'absolute',
		backgroundColor: '#AAC2B3',
		opacity: 1,
		// right: 0,
		// left: 0,
		top: -200,
		borderRadius: 40,
		width: '100%',
		height: Dimensions.get('screen').height,
	},
})

export default AllReact;
