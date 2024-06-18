import React, { useState } from 'react';
import { ImageBackground, Text, TextInput, View, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; 
import backIcon from '../../assets/back-icon';
import hideIcon from '../../assets/eyehide-icon';
import showIcon from '../../assets/eye-icon';

const SigninpassScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const [password, setPassword] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const handleLogin = async () => {
    try {
      console.log("Logging in with:", email, password);
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Logged in successfully!", [{ text: "OK", onPress: () => navigation.navigate('Camera') }]);
    } catch (error) {
      console.error('Error logging in: ', error);
      Alert.alert("Error", "Failed to log in. Please try again.");
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
        <TouchableOpacity style={styles.forgot} onPress={() => navigation.navigate('ForgotPassword')}>
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
