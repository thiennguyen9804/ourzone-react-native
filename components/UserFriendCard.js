import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import arrowLeftIcon from '../assets/arrow-left-icon';
import DeleteModal from './DeleteModal';

const UserFriendCard = ({ username, navigation, avatar }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDelete = (username) => {
    // Perform delete action here
    alert(`Deleted ${username}`);
    closeModal(); // Close the modal after deletion
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View >
          <Image style={styles.avatar} source={{ uri: avatar }} />
        </View>
      </View>
      <TouchableOpacity style={styles.usernameButton} onPress={openModal}>
        <Text style={styles.usernameText}>{username}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.messButton} onPress={() => navigation.navigate('MessageBox')}>
        <SvgXml xml={arrowLeftIcon}></SvgXml>
      </TouchableOpacity>
      <DeleteModal visible={modalVisible} closeModal={closeModal} username={username} onDelete={handleDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '97%',
    height: 65,
    marginHorizontal: 10,
    backgroundColor: '#F8FFF8',
    alignItems: 'center',
    borderRadius: 21,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#738F81',
    borderRadius: 40,
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
  usernameButton: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  usernameText: {
    fontSize: 17,
    marginHorizontal: 10,
    color: '#738F81',
  },
  messButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
});

export default UserFriendCard;
