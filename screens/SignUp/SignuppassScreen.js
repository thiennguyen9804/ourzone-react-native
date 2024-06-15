import React, { useState } from 'react';
import { ImageBackground, Text, TextInput, View, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import backIcon from '../../assets/back-icon';
import hideIcon from '../../assets/eyehide-icon';
import showIcon from '../../assets/eye-icon';

const SignuppassScreen = ({ navigation }) => {
  const [text, onChangeText] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  return (
    <ImageBackground style={styles.background}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('SignupEmail')}>
          <SvgXml style={styles.backIcon} xml={backIcon} />
        </TouchableOpacity>
        <Text style={styles.txt}>Enter your password: </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            textContentType='password'
            secureTextEntry={isSecureEntry}
            placeholder="Your password..."
            value={text}
          />
          <TouchableOpacity style={styles.toggle} onPress={() => setIsSecureEntry(prev => !prev)}>
            <SvgXml  style={{width: 21,height: 21}} xml={isSecureEntry ? showIcon : hideIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.hint}>
      <Text style={{ fontSize: 13}}>
        <Text style={{ color: '#FFFFFF', fontFamily: 'OpenSans' }}>Password must have at least</Text>
        <Text style={{ color: '#738F81', fontFamily: 'OpenSansBold' }}> 8 characters</Text>
      </Text>
    </View>
        <TouchableOpacity style={styles.btnContinue} onPress={() => navigation.navigate('SignupName')}>
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
  hint:
  {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#738F81',
    width: 385,
    height: 60,
    // borderRadius: 35,
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

export default SignuppassScreen;
