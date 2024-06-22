import React, { useState } from 'react';
import { ImageBackground, Text, TextInput, View, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth,db  } from '../../firebase'; 
import backIcon from '../../assets/back-icon';
import hideIcon from '../../assets/eyehide-icon';
import showIcon from '../../assets/eye-icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth ,  sendPasswordResetEmail,  confirmPasswordReset } from "firebase/auth";
import { doc, getDoc} from 'firebase/firestore';
const SigninpassScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const [password, setPassword] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const auth = getAuth(); 

  const loginWithEmailHandler = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userId = user.uid;
  
  
      await AsyncStorage.setItem('userId', userId);
      const userDocRef = doc(db, 'user', userId); 
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
  
        const userDataFromFirestore = userDocSnapshot.data();
        const firstName = userDataFromFirestore.firstName;
        const lastName = userDataFromFirestore.lastName;
        const avatar =userDataFromFirestore.avatar;
       
        await AsyncStorage.setItem('userId', userId);
  
        
        const userData = {
          email: user.email,
          uid: userId,
          firstName: firstName,
          lastName: lastName,
          avatar: avatar,
          isLogged: true
        };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

     
      setIsLogged(true);

      console.log('Logged in successfully:', user.email);
      navigation.navigate('Camera'); 
    }
   } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error logging in:', errorCode, errorMessage);
      Alert.alert('Error', 'Email or Password was not corectt. Please try again.');
    }
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email or password cannot be empty.');
      return;
    }

    loginWithEmailHandler(email, password);

  };
  // const handleResetPassword = async () => {
  //   try {
  //     await confirmPasswordReset(auth, oobCode, password);
  //     Alert.alert('Password Updated', 'Your password has been updated successfully.');
  //     navigation.navigate('SignIn'); 
  //   } catch (error) {
  //     console.error('Error updating password:', error);
  //     Alert.alert('Error', 'Failed to update password. Please try again.');
  //   }
  // };

  const changePassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Password Reset Email Sent', 'Check your email to reset your password.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      Alert.alert('Error', 'Failed to send password reset email. Please try again.');
    }
  };
  return (
    <ImageBackground style={styles.background}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('SigninEmail')}>
          <SvgXml style={styles.backIcon} xml={backIcon} />
        </TouchableOpacity>
        <Text style={styles.txt}>Enter your password: </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            textContentType='password'
            secureTextEntry={isSecureEntry}
            placeholder="Your password..."
            value={password}
          />
          <TouchableOpacity style={styles.toggle} onPress={() => setIsSecureEntry(prev => !prev)}>
            <SvgXml style={{ width: 21, height: 21 }} xml={isSecureEntry ? showIcon : hideIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.forgot} onPress={changePassword}>
          <Text style={{ color: '#FFFFFF', fontSize: 17, fontFamily: 'OpenSansBold' }}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContinue} onPress={handleLogin}>
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
    marginTop: 215,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  input: {
    height: 55,
    width: 285,
    borderWidth: 1,
    padding: 10,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    fontSize: 17,
  },
  toggle: {
    position: 'absolute',
    right: 32,
    padding: 10,
  },
  forgot: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 285,
    height: 60,
    alignSelf: 'center',
  },
  btnContinue: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#738F81',
    width: 285,
    height: 60,
    borderRadius: 35,
    marginTop: 215,
    alignSelf: 'center',
  },
});

export default SigninpassScreen;