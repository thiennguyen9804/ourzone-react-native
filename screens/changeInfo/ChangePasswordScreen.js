import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Touchable, Alert } from 'react-native';
import Animated, { SlideInDown, SlideInUp, SlideOutDown, SlideOutUp } from "react-native-reanimated";
import { SvgXml } from 'react-native-svg';
import { TextInput } from 'react-native-gesture-handler';
import { db, auth } from '../../firebase';
import { updatePassword, EmailAuthCredential, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

//icon
import iconBack from '../../assets/back-icon';
import hideIcon from '../../assets/eyehide-icon';
import showIcon from '../../assets/eye-icon';

const ChangePasswordScreen = ({ navigation }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSecureEntry1, setIsSecureEntry1] = useState(true);
    const [isSecureEntry2, setIsSecureEntry2] = useState(true);
    const [isSecureEntry3, setIsSecureEntry3] = useState(true);

    const handleChangePassword = async () => {
        try {
            const user = auth.currentUser;

            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);

            if (newPassword !== confirmPassword) {
                Alert.alert('Password do not match');
                return;
            }

            await updatePassword(user, newPassword);
            console.log('Password updated successfully');

            const userDocRef = doc(db, 'user', user.uid);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                await updateDoc(userDocRef, {
                    password: newPassword
                });
                console.log("Document written with ID: ");
            } else {
                await setDoc(userDocRef, { password: newPassword });
                console.log("Create document with ID: ");
            }

            navigation.navigate('Account');
        } catch (e) {
            console.log('Error updating password: ', e);
            Alert.alert('Failed to update password. Please try again later.');
        }
    }

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

            <View style={styles.frmEdit}>
                <TextInput style={styles.textInEdit}
                    placeholder='Enter current password'
                    onChangeText={setCurrentPassword}
                    textContentType='password'
                    secureTextEntry={isSecureEntry1}
                    value={currentPassword}></TextInput>
                <TouchableOpacity style={styles.iconEye} onPress={() => setIsSecureEntry1(prev => !prev)}>
                    <SvgXml style={{ width: 21, height: 21, marginVertical: "auto" }} xml={isSecureEntry1 ? hideIcon : showIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.frmEdit}>
                <TextInput style={styles.textInEdit}
                    placeholder='Enter new password'
                    onChangeText={setNewPassword}
                    textContentType='password'
                    secureTextEntry={isSecureEntry2}
                    value={newPassword}></TextInput>
                <TouchableOpacity style={styles.iconEye} onPress={() => setIsSecureEntry2(prev => !prev)}>
                    <SvgXml style={{ width: 21, height: 21, marginVertical: "auto" }} xml={isSecureEntry2 ? hideIcon : showIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.frmEdit}>
                <TextInput style={styles.textInEdit}
                    placeholder='Confirm new password'
                    onChangeText={setConfirmPassword}
                    textContentType='password'
                    secureTextEntry={isSecureEntry3}
                    value={confirmPassword}></TextInput>
                <TouchableOpacity style={styles.iconEye} onPress={() => setIsSecureEntry3(prev => !prev)}>
                    <SvgXml style={{ width: 21, height: 21, marginVertical: "auto" }} xml={isSecureEntry3 ? hideIcon : showIcon} />
                </TouchableOpacity>
            </View>


            <TouchableOpacity style={styles.btnSave} onPress={handleChangePassword}>
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
        paddingEnd: 10
    },

    textInEdit: {
        width: "90%",
        fontSize: 12,
        fontWeight: "400",
        color: "#626262",
        letterSpacing: 2.7,
    },

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