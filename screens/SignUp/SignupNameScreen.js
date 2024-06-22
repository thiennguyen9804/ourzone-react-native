import React, { useState } from 'react';
import { ImageBackground, Text, TextInput, View, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { getAuth, createUserWithEmailAndPassword ,sendEmailVerification} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import backIcon from '../../assets/back-icon';


const SignupNameScreen = ({ navigation, route }) => {
  const { email, password } = route.params;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const handleContinue = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
     
      await sendEmailVerification(auth.currentUser);

      const avatar = 'https://res.cloudinary.com/dh9ougddd/image/upload/uti8d5dnux7m0r5kss0m?_a=CAFAH2AfAAf0';
      const friends = [];
      const phone = null;
      const uid = user.uid;

      await setDoc(
        doc(db, 'user', user.uid), 
        {
          avatar,
          firstName,
          lastName,
          email,
          friends,
          password,
          phone,
          uid
        }, 
        { merge: true }
      );

      Alert.alert(
        "Success",
        "Account created successfully! Please check your email for verification.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate('Start'),
          },
        ]
      );
    } catch (error) {
      console.error('Error creating new user: ', error);
      Alert.alert("Error", "An account already exists. Please try again with another email.");
    }
  };


  return (
    <ImageBackground style={styles.background}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
          <SvgXml style={styles.backIcon} rotation={0} xml={backIcon} />
        </TouchableOpacity>
        <Text style={styles.txt}>Enter your name:</Text>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setFirstName}
            placeholder="First name"
            value={firstName}
          />
          <TextInput
            style={styles.input}
            onChangeText={setLastName}
            placeholder="Last name"
            value={lastName}
          />
        </View>
        <TouchableOpacity style={styles.btncontinue} onPress={handleContinue}>
          <Text style={styles.text}>Continue</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    backgroundColor: '#AAC2B3',
  },
  backIcon: {
    alignSelf: 'center',
  },
  btn: {
    marginTop: 40,
    marginLeft: 15,
    width: 43,
    height: 43,
    backgroundColor: "#738F81",
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    marginTop: 205,
    marginLeft: 40,
    fontSize: 22,
    fontFamily: 'OpenSansBold',
    color: '#ffffff',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'OpenSansBold',
  },
  input: {
    height: 55,
    width: 285,
    borderWidth: 1,
    padding: 10,
    borderRadius: 14,
    margin: 'auto',
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    fontSize: 17,
  },
  btncontinue: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#738F81',
    width: 285,
    height: 60,
    borderRadius: 35,
    marginTop: 195,
    margin: 'auto',
  },
});

export default SignupNameScreen;
