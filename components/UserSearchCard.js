import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';


const UserSearchCard = ({ username }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleCardPress = () => {
    setShowConfirmDialog(true);
  };

  const handleCloseDialog = () => {
    setShowConfirmDialog(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatarOuter}>
          <Image style={styles.avatar} source={require('../assets/avatar-picture.jpg') }/>
        </View>
      </View>
      <TouchableOpacity style={styles.usernameButton}>
        <Text style={styles.usernameText}>{username}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={handleCardPress}>
        <Text style={styles.addText}>+ Add</Text>
      </TouchableOpacity>

      <Modal
        visible={showConfirmDialog}
        transparent={true}
        animationType='slide'
        onRequestClose={handleCloseDialog}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBackground}></View>
          <View style={styles.dialog}>
            <Text style={styles.headerText}>Are you sure?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.noButton]} onPress={handleCloseDialog}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.yesButton]} onPress={handleCloseDialog}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECF4F4',
    marginHorizontal: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  addText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D2D2D',
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    padding: 30,
    alignItems: 'center',
    zIndex: 1, 
  },
  headerText: {
    color: '#F54242',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#000000',
    
    },
    noButton: {
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#00000000',
    },
    yesButton: {
    backgroundColor: '#D9D9D9',
    },
    buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    },
});

export default UserSearchCard;
