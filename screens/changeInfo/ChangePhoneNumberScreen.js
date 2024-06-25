import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Touchable } from 'react-native';
import Animated, { SlideInDown, SlideInUp, SlideOutDown, SlideOutUp } from "react-native-reanimated";
import { SvgXml } from 'react-native-svg';
import { db, auth } from '../../firebase';
import { doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import iconBack from '../../assets/back-icon';

const ChangePhoneNumberScreen = ({ navigation }) => {
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                const userDocRef = doc(db, 'user', user.uid);
                const unsubscribeSnapshot = onSnapshot(userDocRef, (doc) => {
                    if (doc.exists()) {
                        const userData = doc.data();
                        setPhoneNumber(userData.phone || '')
                    } else {
                        console.log('No such document!');
                    }
                });

                return () => {
                    unsubscribeSnapshot();
                };
            }
        });

        return () => {
            unsubscribeAuth();
        };
    }, []);

    const handleSave = async () => {
        if (userId) {
            try {
                const userDocRef = doc(db, 'user', userId);
                await updateDoc(userDocRef, {
                    phone: PhoneNumber.trim()
                });
                console.log("Document written with ID: ", userId);
                navigation.navigate('Account');
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    };

    const validatePhoneNumber = () => {
        const trimmedPhoneNumber = PhoneNumber.trim();
        const isNumeric = /^\d+$/.test(trimmedPhoneNumber);

        if (trimmedPhoneNumber.length !== 9 || !isNumeric) {
            setError('Phone number nust be 9 digits and contain only munbers');
            return false;
        }
        setError('');
        return true;
    }

    const isPhoneNumberValid = PhoneNumber.trim().length === 9 && /^\d+$/.test(PhoneNumber.trim());

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
                <Text style={styles.textTopic}>Change Phone Number</Text>
            </View>

            <View style={{ width: "90%", flexDirection: "row", marginHorizontal: "auto" }}>
                <Text style={styles.frmEditStart}>+84</Text>
                <TextInput style={styles.frmEditEnd}
                    value={PhoneNumber}
                    keyboardType='numeric'
                    onBlur={validatePhoneNumber}
                    onChangeText={setPhoneNumber}></TextInput>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity style={styles.btnSave}
                disabled={!isPhoneNumberValid}
                onPress={handleSave}>
                <Text style={styles.textInBtn}>Change</Text>
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

    frmTopic: {
        alignContent: "center",
        marginHorizontal: "auto",
        marginVertical: 300,
        marginBottom: 25
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

    frmEditStart: {
        width: '20%',
        height: 50,
        marginHorizontal: "auto",
        borderColor: "#626262",
        borderBottomLeftRadius: 50,
        borderTopLeftRadius: 50,
        borderWidth: 0.6,
        fontSize: 18,
        paddingStart: 12,
        fontWeight: "600",
        color: "#626262",
        letterSpacing: 3,
        textAlignVertical: 'center',
    },

    frmEditEnd: {
        width: '80%',
        height: 50,
        marginHorizontal: "auto",
        borderColor: "#626262",
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
        borderWidth: 0.6,
        padding: 10,
        fontSize: 18,
        fontWeight: "600",
        color: "#626262",
        letterSpacing: 13,
    },

    btnSave: {
        width: 118,
        height: 48,
        borderRadius: 50,
        backgroundColor: "#738F81",
        marginHorizontal: "auto",
        marginTop: 30,
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

export default ChangePhoneNumberScreen;