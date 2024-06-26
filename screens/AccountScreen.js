import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Linking, Share, Text, TouchableOpacity, Image, Alert, ScrollView, ToastAndroid } from 'react-native';
import Animated, { SlideInDown, SlideOutDown, SlideInRight, SlideOutLeft, SlideInLeft, SlideOutRight } from 'react-native-reanimated';
import { SvgXml } from 'react-native-svg';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc, getFirestore } from 'firebase/firestore';
import { auth, db } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApplicationContext } from '../hooks/useApplicationContext';
import { useIsFocused } from '@react-navigation/native';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

// Icons
import iconBack from "../assets/back-icon";
import iconChangeAvatar from "../assets/change-avatar-icon";
import iconTheme from "../assets/theme-icon";
import iconChangeTheme from "../assets/change-theme-icon";
import iconArrowNext from "../assets/arrow-next-icon";
import iconGeneral from "../assets/general-icon";
import iconChangePhoneNumber from "../assets/change-phone-num-icon";
import iconChangeEmail from "../assets/change-email-icon";
import iconChangePassword from "../assets/change-password-icon";
import iconFeedback from "../assets/feedback-icon";
import iconReport from "../assets/report-icon";
import iconCommunity from "../assets/community-icon";
import iconShareAccount from "../assets/share-account-icon";
import iconFriends from "../assets/friends-icon";
import iconRate from "../assets/rate-icon";
import iconToS from "../assets/tos-icon";
import iconPP from "../assets/pp-icon";
import iconManager from "../assets/manage-icon";
import iconSignOut from "../assets/sign-out-icon";
import iconDeleteAcc from "../assets/delete-acc-icon";
import { useUser } from '../hooks/useUser';

const AccountScreen = ({ navigation }) => {
    const { user, setUser } = useApplicationContext();
    const { updateUserByUserId } = useUser();
    const storage = getStorage();
    // const [userData, setUserData] = useState(null);

    // console.log(user);

    // const selectImage = async () => {
    //     try {
    //         const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    //         if (permissionResult.granted === false) {
    //             Alert.alert("Permission to access camera roll is required!");
    //             return;
    //         }

    //         const pickerResult = await ImagePicker.launchImageLibraryAsync({
    //             mediaType: ImagePicker.MediaTypeOptions.Images,
    //             aspect: [3, 3],
    //             quality: 1,
    //             base64: true
    //         });

    //         if (!pickerResult.canceled) {
    //             const imageUri = pickerResult.assets[0]
    //             setSelectedImage(imageUri);

    //             const response = await fetch(selectedImage.uri);
    //             const blod = await response.blob();
    //             const filename = selectedImage.uri.substring(selectedImage.uri.lastIndexOf('/') + 1);
    //             var ref = firebase.storage().ref().child('images/' + filename).put(blod);
    //             try {
    //                 await ref;

    //             } catch (e) {
    //                 console.error(e);
    //             }

    //             Alert.alert("Photo uploaded!");

    //         }
    //     } catch (error) {
    //         console.error("Error selecting image: ", error);
    //         Alert.alert("Error", "Failed to select image. Please try again.");
    //     }

    // };

    const openImagePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.canceled) {
            console.log('result uri', result.assets[0].uri);
            uploadImageToFirebase(result.assets[0].uri);
        }
    };

    const uploadImageToFirebase = async (uri) => {
        try {
            const response = await fetch(uri);
            const theBlob = await response.blob();
            const imageRef = ref(storage, `${user.userId}/${Date.now()}`);
            const uploadTask = await uploadBytesResumable(imageRef, theBlob);
            const downloadUri = await getDownloadURL(imageRef);
            updateUserByUserId(user.userId, {
                avatar: downloadUri
            }, setUser);
        } catch (error) {
            console.error("Error uploading image: ", error);
            Alert.alert("Upload Error", "Failed to upload image. Please try again.");
        }
    };

    const updateUserAvatar = async (url) => {
        try {
            const userDocRef = doc(db, 'user', auth.currentUser.uid);
            await updateDoc(userDocRef, { avatar: url });
            setSelectedImage({ uri: url });
            fetchUserData(auth.currentUser);
        } catch (error) {
            console.error("Error updating user avatar: ", error);
            Alert.alert("Update Error", "Failed to update user avatar. Please try again.");
        }
    };

    const handleSignOut = async () => {
        try {
            auth.signOut();
            AsyncStorage.removeItem('userId');
            // console.log('User signed out successfully');
            ToastAndroid.show('Logout successfully', ToastAndroid.SHORT);
            navigation.navigate('Start')
        } catch (e) {
            console.error('Error signing out:', e);
            Alert.alert('Failed to sign out. Please try again.');
        }
    }

    const handleToS = () => {
        const url = 'https://www.termsfeed.com/live/3850fb92-b96e-4c91-91ef-bddc59c16062';
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    const handlePP = () => {
        const url = 'https://www.freeprivacypolicy.com/live/333cd034-884b-4b6f-8150-84097a542a5a';
        Linking.openURL(url).catch(err => console.error("Couldn't load page"));
    };

    const handleShare = async () => {
        const userId = auth.currentUser.uid;
        const url = `https://ourzone.com/profile/${userId}`;

        try {
            const result = await Share.share({
                message: url,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('shared with activity type of: ', result.activityType)
                } else {
                    console.log('shared')
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('dismissed')
            }

        } catch (e) {
            console.error(e.message);
        }
    }

    const handleFeedback = () => {
        const userId = auth.currentUser.uid;
        const timestamp = new Date().toLocaleString();

        const email = 'mailto:ourzone.company@gmail.com';
        const subject = 'subject=Feedback';
        const body = `body=User ID: ${userId}%0D%0ATime: ${timestamp}%0D%0A%0D%0AHi, I would like to share the following feedback:%0D%0A`;

        Linking.openURL(`${email}?${subject}&${body}`)
            .catch(err => console.error("Couldn't send mail. Please try again later.", err));
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteUser(auth.currentUser);

            const userDocRef = db.collection('user').doc(auth.currentUser.uid);
            await userDocRef.delete();

            await auth.signOut();
            navigation.navigate('Start');
        } catch (e) {
            console.error('Error deleting user: ', e);
            Alert.alert('Failed to delete account. Please try again.');
        }
    }

    const confirmDeleteAccount = () => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this account?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: handleDeleteAccount, style: 'delete' }
            ],
            { cancelabel: false }
        );
    };

    return (
        <Animated.View
            style={styles.container}
            entering={SlideInLeft}
            exiting={SlideOutRight}
        >
            <View>
                <TouchableOpacity style={styles.btnBack} onPress={() => navigation.navigate('Camera')}>
                    <SvgXml style={styles.iconBack} xml={iconBack}></SvgXml>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.containerScrollView} >
                <View style={styles.bgAvatar}>
                    <Image style={styles.imgAvatar} source={{uri: user.avatar}} />
                </View>
                <TouchableOpacity style={styles.btnChangeAvatar} onPress={openImagePicker}>
                    <SvgXml style={styles.iconChangeAvatar} xml={iconChangeAvatar}></SvgXml>
                </TouchableOpacity>

                <View style={styles.frmName}>
                    <Text style={styles.textName}>{user.userName || `${user.firstName} ${user.lastName}`}</Text>
                </View>

                <TouchableOpacity style={styles.btnChangeName} onPress={() => navigation.navigate('ChangeName')}>
                    <Text style={{
                        fontSize: 20, fontWeight: "700", letterSpacing: 0.7, color: "white",
                        alignContent: "center", marginHorizontal: "auto", marginVertical: "auto"
                    }}>Edit Info</Text>
                </TouchableOpacity>

                <View style={styles.frmTopic}>
                    <SvgXml style={styles.icon} xml={iconTheme}></SvgXml>
                    <Text style={styles.textTopic}>Theme</Text>
                </View>

                <TouchableOpacity style={styles.btnNormal} onPress={() => navigation.navigate('ChangeTheme')}>
                    <View style={styles.startSection}>
                        <SvgXml style={styles.icon} xml={iconChangeTheme}></SvgXml>
                        <Text style={styles.textInBtn}>Change Theme</Text>
                    </View>
                    <SvgXml style={styles.icon} xml={iconArrowNext}></SvgXml>
                </TouchableOpacity>

                <View style={styles.frmTopic}>
                    <SvgXml style={styles.icon} xml={iconGeneral}></SvgXml>
                    <Text style={styles.textTopic}>General</Text>
                </View>

                <TouchableOpacity style={styles.btnStart} onPress={() => navigation.navigate('ChangePhoneNumber')}>
                    <View style={styles.startSection}>
                        <SvgXml style={styles.icon} xml={iconChangePhoneNumber}></SvgXml>
                        <Text style={styles.textInBtn}>Change Phone Number</Text>
                    </View>
                    <SvgXml style={styles.icon} xml={iconArrowNext}></SvgXml>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnMid} onPress={() => navigation.navigate('ChangeEmail')}>
                    <View style={styles.startSection}>
                        <SvgXml style={styles.icon} xml={iconChangeEmail}></SvgXml>
                        <Text style={styles.textInBtn}>Change Email Address</Text>
                    </View>
                    <SvgXml style={styles.icon} xml={iconArrowNext}></SvgXml>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnMid} onPress={() => navigation.navigate('ChangePassword')}>
                    <View style={styles.startSection}>
                        <SvgXml style={styles.icon} xml={iconChangePassword}></SvgXml>
                        <Text style={styles.textInBtn}>Change Password</Text>
                    </View>
                    <SvgXml style={styles.icon} xml={iconArrowNext}></SvgXml>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnMid} onPress={handleFeedback}>
                    <View style={styles.startSection}>
                        <SvgXml style={styles.icon} xml={iconFeedback}></SvgXml>
                        <Text style={styles.textInBtn}>Share Feedback</Text>
                    </View>
                    <SvgXml style={styles.icon} xml={iconArrowNext}></SvgXml>
                </TouchableOpacity>


                <TouchableOpacity style={styles.btnEnd} onPress={() => navigation.navigate('Report')}>
                    <View style={styles.startSection}>
                        <SvgXml style={styles.icon} xml={iconReport}></SvgXml>
                        <Text style={styles.textInBtn}>Report Problem</Text>
                    </View>
                    <SvgXml style={styles.icon} xml={iconArrowNext}></SvgXml>
                </TouchableOpacity>

                <View style={styles.frmTopic}>
                    <SvgXml style={styles.icon} xml={iconCommunity}></SvgXml>
                    <Text style={styles.textTopic}>Community</Text>
                </View>

                <TouchableOpacity style={styles.btnStart} onPress={handleShare}>
                    <View style={styles.startSection}>
                        <SvgXml style={styles.icon} xml={iconShareAccount}></SvgXml>
                        <Text style={styles.textInBtn}>Share Your Account</Text>
                    </View>
                    <SvgXml style={styles.icon} xml={iconArrowNext}></SvgXml>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnMid} onPress={() => navigation.navigate('Friend')}>
                    <View style={styles.startSection}>
                        <SvgXml style={styles.icon} xml={iconFriends}></SvgXml>
                        <Text style={styles.textInBtn}>Friends</Text>
                    </View>
                    <SvgXml style={styles.icon} xml={iconArrowNext}></SvgXml>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnMid}>
                    <View style={styles.startSection}>
                        <SvgXml style={styles.icon} xml={iconRate}></SvgXml>
                        <Text style={styles.textInBtn}>Rate OurZone</Text>
                    </View>
                    <SvgXml style={styles.icon} xml={iconArrowNext}></SvgXml>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnMid} onPress={handleToS}>
                    <View style={styles.startSection}>
                        <SvgXml style={styles.icon} xml={iconToS}></SvgXml>
                        <Text style={styles.textInBtn}>Terms Of Service</Text>
                    </View>
                    <SvgXml style={styles.icon} xml={iconArrowNext}></SvgXml>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnEnd} onPress={handlePP}>
                    <View style={styles.startSection}>
                        <SvgXml style={styles.icon} xml={iconPP}></SvgXml>
                        <Text style={styles.textInBtn}>Privacy Policy</Text>
                    </View>
                    <SvgXml style={styles.icon} xml={iconArrowNext}></SvgXml>
                </TouchableOpacity>


                <View style={styles.frmTopic}>
                    <SvgXml style={styles.icon} xml={iconManager}></SvgXml>
                    <Text style={styles.textTopic}>Manager</Text>
                </View>


                <TouchableOpacity style={styles.btnStart} onPress={handleSignOut}>
                    <View style={styles.startSection}>
                        <SvgXml style={styles.icon} xml={iconSignOut}></SvgXml>
                        <Text style={styles.textInBtn}>Sign Out</Text>
                    </View>
                    <SvgXml style={styles.icon} xml={iconArrowNext}></SvgXml>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnEnd} onPress={confirmDeleteAccount}>
                    <View style={styles.startSection}>
                        <SvgXml style={styles.icon} xml={iconDeleteAcc}></SvgXml>
                        <Text style={styles.textInBtn}>Delete Account</Text>
                    </View>
                    <SvgXml style={styles.icon} xml={iconArrowNext}></SvgXml>
                </TouchableOpacity>
            </ScrollView >
        </Animated.View >
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#F8FFF8',
        justifyContent: 'center',
        // position: 'absolute'
    },

    containerScrollView: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        paddingHorizontal: 0,
        backgroundColor: '#F8FFF8'
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

    icon: {
        marginRight: 10
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
        marginBottom: "auto",
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
        marginHorizontal: 190,
        marginVertical: 205
    },

    iconChangeAvatar: {
        margin: "auto"
    },

    frmName: {
        marginHorizontal: 'auto',
        paddingVertical: 3,
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10
    },

    textName: {
        alignContent: 'center',
        fontSize: 20,
        fontWeight: "700",
        letterSpacing: 0.7,
        color: '#6B9080',
        fontSize: 30,
    },

    btnChangeName: {
        width: 120,
        height: 35,
        marginHorizontal: "auto",
        backgroundColor: '#738F81',
        borderRadius: 50,
        marginBottom: 20
    },

    frmTopic: {
        flexDirection: "row",
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        marginBottom: 10
    },

    textTopic: {
        fontSize: 20,
        fontWeight: "800",
        letterSpacing: 0.4,
        color: "#6B9080",
    },

    btnNormal: {
        width: '95%',
        height: 50,
        backgroundColor: '#AAC2B3',
        borderRadius: 13,
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: "auto",
        padding: 10,
    },

    startSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    textInBtn: {
        fontSize: 20,
        fontWeight: "600",
        letterSpacing: 0.4,
        color: "#FFFFFF",
        marginVertical: "auto",
    },

    btnStart: {
        width: '95%',
        height: 50,
        backgroundColor: '#AAC2B3',
        borderTopStartRadius: 13,
        borderTopEndRadius: 13,
        marginBottom: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: "auto",
        padding: 10
    },

    btnMid: {
        width: '95%',
        height: 50,
        backgroundColor: '#AAC2B3',
        marginBottom: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: "auto",
        padding: 10
    },

    btnEnd: {
        width: '95%',
        height: 50,
        backgroundColor: '#AAC2B3',
        borderBottomEndRadius: 13,
        borderBottomStartRadius: 13,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: "auto",
        padding: 10
    },
});
export default AccountScreen;