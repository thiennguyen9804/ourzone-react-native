import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TouchableWithoutFeedback, Alert, FlatList } from 'react-native';
import ReactCard from './ReactCard';



const AllReact = ({ reaction, toggleOpenAllReaction }) => {

	const closeModal = () => {
		toggleOpenAllReaction();
	}

	const handleDelete = () => {

	}

	console.log(reaction);
    return (
		<>
			
			{/* <View></View> */}
		</>
    );
};
  


export default AllReact;
