import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { SvgXml } from 'react-native-svg';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; 

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

const AccountScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async (user) => {
      try {
        const userDoc = await getDoc(doc(db, 'user', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          Alert.alert("Error", "No user data found");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
        Alert.alert("Error", "Failed to fetch user data. Please try again.");
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user);
      } else {
        Alert.alert("Error", "Failed to fetch user data. Please try again.");
        navigation.navigate('Start'); 
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  if (!userData) {
    return null; 
  }

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

      <ScrollView style={styles.containerScrollView} >
        <View style={styles.bgAvatar} >
          <Image style={styles.imgAvatar} source={{ uri: userData.avatar }} />
        </View>
        <TouchableOpacity style={styles.btnChangeAvatar}>
          <SvgXml style={styles.iconChangeAvatar} xml={iconChangeAvatar}></SvgXml>
        </TouchableOpacity>

        <View style={styles.frmName}>
          <Text style={styles.textName}>{userData.firstName} {userData.lastName}</Text>
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

        <TouchableOpacity style={styles.btnMid}>
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
        </TouchableOpacity>

        <View style={styles.frmTopic}>
          <SvgXml style={styles.icon} xml={iconCommunity}></SvgXml>
          <Text style={styles.textTopic}>Community</Text>
        </View>

        <TouchableOpacity style={styles.btnStart}>
          <View style={styles.startSection}>
            <SvgXml style={styles.icon} xml={iconShareAccount}></SvgXml>
            <Text style={styles.textInBtn}>Share Your Account</Text>
          </View>
          <SvgXml style={styles.icon} xml={iconArrowNext}></SvgXml>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnMid}>
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

        <TouchableOpacity style={styles.btnMid}>
          <View style={styles.startSection}>
            <SvgXml style={styles.icon} xml={iconToS}></SvgXml>
            <Text style={styles.textInBtn}>Terms Of Service</Text>
          </View>
          <SvgXml style={styles.icon} xml={iconArrowNext}></SvgXml>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnEnd}>
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

        <TouchableOpacity style={styles.btnStart}>
          <View style={styles.startSection}>
            <SvgXml style={styles.icon} xml={iconSignOut}></SvgXml>
            <Text style={styles.textInBtn}>Sign Out</Text>
          </View>
          <SvgXml style={styles.icon} xml={iconArrowNext}></SvgXml>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnEnd}>
          <View style={styles.startSection}>
            <SvgXml style={styles.icon} xml={iconDeleteAcc}></SvgXml>
            <Text style={styles.textInBtn}>Delete Account</Text>
          </View>
          <SvgXml style={styles.icon} xml={iconArrowNext}></SvgXml>
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
        paddingHorizontal: 10,
        backgroundColor: '#F8FFF8',
        justifyContent: 'center'
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
