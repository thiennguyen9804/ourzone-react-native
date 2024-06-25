import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Touchable } from 'react-native';
import Animated, { SlideInDown, SlideInUp, SlideOutDown, SlideOutUp } from "react-native-reanimated";
import { SvgXml } from 'react-native-svg';
import { TextInput } from 'react-native-gesture-handler';
import { db, auth } from '../../firebase';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

//icon
import iconBack from "../../assets/back-icon";

const ChangeEmailScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                const userDocRef = doc(db, 'user', user.uid);
                const unsubscribeSnapshot = onSnapshot(userDocRef, (doc) => {
                    if (doc.exists()) {
                        const userData = doc.data();
                        setEmail(userData.email || '');
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
                    email: email.trim()
                });
                console.log("Document written with ID: ", userId);
                navigation.navigate('Account');
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
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
                <Text style={styles.textTopic}
                >Enter Your Email</Text>
            </View>

            <TextInput style={styles.frmEdit}
                placeholder="Enter your Email"
                value={email}
                onChangeText={text => setEmail(text)} ></TextInput>


            <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
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

    frmEdit: {
        width: '90%',
        height: 50,
        marginHorizontal: "auto",
        borderColor: "#626262",
        borderRadius: 50,
        borderWidth: 0.6,
        paddingStart: 20,
        fontSize: 12,
        fontWeight: "400",
        color: "#626262",
        letterSpacing: 3,
    },

    btnSave: {
        width: 118,
        height: 48,
        borderRadius: 50,
        backgroundColor: "#738F81",
        marginHorizontal: "auto",
        marginTop: 40,
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

export default ChangeEmailScreen;