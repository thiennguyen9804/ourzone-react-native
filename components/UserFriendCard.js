
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import arrowLeftIcon from '../assets/arrow-left-icon';

const UserFriendCard = ({ username, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatarOuter}>
              <Image  style={styles.avatar} />
            </View>
      </View>
      <TouchableOpacity style={styles.usernameButton}>
        <Text style={styles.usernameText}>{username}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.messButton} onPress={() => navigation.navigate('Confirm')}>
        <SvgXml  xml={ arrowLeftIcon}></SvgXml>
      </TouchableOpacity>
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
  avatarMiddle: {
    width: 47,
    height: 47,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  avatarInner: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  avatar: {
    width: 47,
    height: 47,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
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
  addIcon: {
    width: 20,
    height: 20,
  },
  addText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D2D2D',
    marginLeft: 5,
  },
});

export default UserFriendCard;
