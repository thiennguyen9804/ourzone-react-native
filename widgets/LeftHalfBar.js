import { forwardRef, useState } from "react"
import { TextInput, View, TouchableOpacity, StyleSheet, Text } from "react-native"
import { SvgXml } from "react-native-svg"
import fireIcon from '../assets/fire-icon';

const LeftHalfBar = ({chatToggle}) => {
	return (
        <TouchableOpacity style={styles.container} onPress={chatToggle}>
            <Text style={styles.text}>Send message</Text>
        </TouchableOpacity>
		
	)
}

const styles = StyleSheet.create({
	textInput: {
        flex: 1,
        height: 40,
        marginLeft: 10,
        marginRight:10,
        paddingLeft: 10,
        color: "#fff",
        borderRadius: 20,
        backgroundColor: '#AAC2B3',
        fontFamily:'OpenSans',
    },

    container: {
        height: 40,
        backgroundColor: '#AAC2B3',
        // backgroundColor: 'aqua',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        // elevation: 6,
        paddingLeft: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    
    text: {
        color: '#fff',
        fontWeight: '500',
        letterSpacing: 0.6
        // padding
    }
});

export default (LeftHalfBar);