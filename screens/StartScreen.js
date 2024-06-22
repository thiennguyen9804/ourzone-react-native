import React, { useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import leaficon from '../assets/leaf-icon';
import { useApplicationContext } from '../hooks/useApplicationContext';
const sourcebr = require('../assets/image.png');
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native';

const StartScreen = ({ navigation }) => {
  // console.log(leaficon); 
  const { setUser } = useApplicationContext();
  // const navigation = useNavigation();
  useEffect(() => {
	  if(auth.currentUser && auth.currentUser.uid) {
			setUser(prev => ({...prev, userId: auth.currentUser.uid}));		
			navigation.navigate('Camera');
		}
	}, []); 

  if (!leaficon) {
    console.error('SVG XML is undefined'); 
  }

  return ( 
    <ImageBackground style={{height:'100%',width:'100%',	position: 'absolute'}} source={sourcebr}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex:1}}>
        <View style={{height:'15%',width:'30%', marginTop:170, marginLeft:80}}>
          <SvgXml style={{marginTop:95, marginLeft:67, width: 59,height: 64,}} xml={leaficon}/>
        </View>
        <Text style={styles.our}>our</Text>
        <Text style={styles.zone}>Z ne</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnsignup}onPress={() => navigation.navigate('SignupEmail')}>
            <Text style={styles.btnText}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnsignin} onPress={() => navigation.navigate('SigninEmail')}>
            <Text style={styles.btnText}>Did you have account? Sign in</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  our: {
    fontSize: 100, 
    letterSpacing: -0.02,
    color: '#FFFFFF',
    fontFamily:'OtomanopeeOne',
    marginTop:-175, 
    marginLeft:10
  },
  zone: {
    fontSize: 100, 
    letterSpacing: -0.02,
    color: '#738F81',
    fontFamily:'OtomanopeeOne',
    marginTop:-38, 
    marginLeft:80
  },
  btnContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  btnsignup: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#738F81',
    width: 155,
    height: 55,
    borderRadius: 35,
    marginTop:230,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily:'OpenSansBold',
  },
  btnsignin:
  {

  }
});

export default StartScreen;
