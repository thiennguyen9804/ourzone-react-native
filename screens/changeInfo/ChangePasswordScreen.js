import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Touchable } from 'react-native';
import Animated, { SlideInDown, SlideInUp, SlideOutDown, SlideOutUp } from "react-native-reanimated";
import { SvgXml } from 'react-native-svg';
import { TextInput } from 'react-native-gesture-handler';

import iconBack from '../../assets/back-icon';
import iconEyeOpen from '../../assets/eye-open-icon';
import iconEyeClose from '../../assets/eye-close-icon';

const ChangePasswordScreen = ({ navigation }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const toggleSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    return (
        <Animated.View
            style={styles.container}
            entering={SlideInDown}
            exiting={SlideOutDown}
        >
            <TouchableOpacity style={styles.btnBack} onPress={() => navigation.navigate('Account')}>
                <SvgXml style={styles.icon} xml={iconBack}></SvgXml>
            </TouchableOpacity>

            <View style={styles.frmTopic}>
                <Text style={styles.textTopic}>Enter Your Password</Text>
            </View>
            {/* 
            <View style={styles.frmEdit}>
                <TextInput style={styles.textInEdit}
                    placeholder='Enter current password'
                    value={text}
                    onChangeText={setCurrentPassword}
                    secureTextEntry={secureTextEntry}
                ></TextInput>
                <TouchableOpacity style={styles.icon}
                    onPress={toggleSecureTextEntry}>
                </TouchableOpacity>
            </View> */}

            <TextInput style={styles.frmEdit}
                placeholder='Enter current password'
                onChange={setCurrentPassword}
                value={currentPassword}></TextInput>
            <TextInput style={styles.frmEdit}
                placeholder='Enter new password'
                onChange={setNewPassword}
                value={newPassword}></TextInput>
            <TextInput style={styles.frmEdit}
                placeholder='Confirm new password'
                onChange={setConfirmPassword}
                value={confirmPassword}></TextInput>


            <TouchableOpacity style={styles.btnSave}>
                <Text style={styles.textInBtn}>Save</Text>
            </TouchableOpacity>
        </Animated.View>

    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#F8FFF8',
    },

    btnBack: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: 103,
        verticalAlign: 10,
        backgroundColor: 'transparent'
    },

    icon: {
        margin: "auto"
    },

    iconEye: {
        marginRight: 10,
    },

    frmTopic: {
        alignContent: "center",
        marginHorizontal: "auto",
        marginVertical: 200,
        marginBottom: 25,
        justifyContent: "space-between"
    },

    textTopic: {
        fontWeight: "800",
        color: "#738F81",
        letterSpacing: 0.5,
        fontSize: 26,
        textShadowColor: 'rgba(0, 0, 0, 0.25)', // Shadow color
        textShadowOffset: { width: 4, height: 4 }, // Offset for the shadow
        textShadowRadius: 10, // Radius of the shadow blur
    },

    frmEdit: {
        width: '90%',
        height: 50,
        marginHorizontal: "auto",
        borderColor: "#626262",
        borderRadius: 50,
        borderWidth: 0.6,
        paddingStart: 20,
        marginBottom: 12,
        flexDirection: 'row',
        width: "90%",
        fontSize: 12,
        fontWeight: "400",
        color: "#626262",
        letterSpacing: 2.7,
    },

    // textInEdit: {
    //     width: "90%",
    //     fontSize: 12,
    //     fontWeight: "400",
    //     color: "#626262",
    //     letterSpacing: 2.7,
    // },

    btnSave: {
        width: 118,
        height: 48,
        borderRadius: 50,
        backgroundColor: "#738F81",
        marginHorizontal: "auto",
        marginTop: 15,
        alignItems: "center",
    },

    textInBtn: {
        fontSize: 16,
        fontWeight: "800",
        color: "#FFFFFF",
        letterSpacing: 3,
        marginVertical: "auto"
    }

});

export default ChangePasswordScreen;