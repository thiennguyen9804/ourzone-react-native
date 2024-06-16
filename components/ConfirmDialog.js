import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ConfirmDialog = ({navigation}) => {
return (
    <View style={styles.container}>
        <Text style={styles.headerText}>Are you sure?</Text>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.noButton]} onPress={() => navigation.navigate('Friend')}>
                    <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.yesButton]} onPress={() => navigation.navigate('Friend')}>
                <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
        </View>
    </View>
);
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dialog: {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 16,
      alignItems: 'center',
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
      borderWidth: 2, // Độ dày của viền
      borderColor: '#000000', // Màu sắc của viền
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
  
  export default ConfirmDialog;