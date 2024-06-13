import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Animated, { SlideInDown, SlideInUp, SlideOutDown, SlideOutUp } from "react-native-reanimated";
import { Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';

//icon
import iconBack from "../assets/back-icon";
import iconChangeAvatar from "../assets/change-avatar-icon";
import iconTheme from "../assets/theme-icon";
import iconChangeTheme from "../assets/change-theme-icon";
import iconArrowNext from "../assets/arrow-next-icon"


const AccountScreen = ({ navigation }) => {
    return (
        <Animated.View
            style={styles.container}
            entering={SlideInDown}
            exiting={SlideOutDown}
        >
            <View>
                <TouchableOpacity style={styles.btnBack} onPress={() => navigation.navigate('Camera')}>
                    <SvgXml style={styles.iconBack} xml={iconBack}></SvgXml>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container} >
                <View style={styles.bgAvatar} >
                    <Image style={styles.imgAvatar} source={require('../assets/avatar-picture.jpg')} />
                </View>
                <TouchableOpacity style={styles.btnChangeAvatar}>
                    <SvgXml style={styles.iconChangeAvatar} xml={iconChangeAvatar}></SvgXml>
                </TouchableOpacity>
            </ScrollView>

        </Animated.View>

    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#F8FFF8'
        // position: 'absolute'
    },

    btnBack: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: 103,
        verticalAlign: 10,
        zIndex: 1000,
        backgroundColor: 'transparent'
    },

    iconBack: {
        margin: "auto"
    },

    bgAvatar: {
        width: 144,
        height: 144,
        borderRadius: 300,
        marginHorizontal: "auto",
        marginVertical: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#AAC2B3',
    },

    imgAvatar: {
        width: 128,
        height: 128,
        marginHorizontal: "auto",
        borderWidth: 4,
        borderColor: "#FFFFFF",
        borderRadius: 300
    },

    btnChangeAvatar: {
        position: "absolute",
        width: 42,
        height: 42,
        backgroundColor: '#AAC2B3',
        borderWidth: 4,
        borderRadius: 50,
        borderColor: '#FFFFFF',
        marginHorizontal: 165,
        marginVertical: 205
    },

    iconChangeAvatar: {
        margin: "auto"
    }
});

export default AccountScreen;