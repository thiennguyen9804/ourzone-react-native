import React,  { useState } from 'react';
import { ImageBackground,Text, TextInput, View, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Alert} from 'react-native';
import backIcon from "../../assets/back-icon";
import { SvgXml } from "react-native-svg";


const SignupemailScreen=({ navigation })=>{
    const [email, setEmail] = React.useState('');
    const checkEmail = async () => {
        try {
          if (!email) {
            Alert.alert('Error', 'Email cannot be empty.');
            return;
          }
         else {
            navigation.navigate('SignupPass',  { email }) 
          }
        } catch (error) {
          console.error('Error checking email:', error);
          Alert.alert('Error', 'Failed to check email. Please try again.');
        }
      };
    return(
        <ImageBackground style={{height:'100%',width:'100%',backgroundColor:'#AAC2B3'}} >
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>

            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Start')}>
                <SvgXml style={styles.backIcon} rotation={0} xml={backIcon} />
                </TouchableOpacity>
                <Text style={styles.txt}>Enter your email: </Text>
           <View>
           <TextInput
        style={styles.input}
        onChangeText={setEmail}
         placeholder="Email address..."
        value={email}
      />
           </View>
           <TouchableOpacity style={styles.btncontinue} onPress={checkEmail}>
            <Text style={styles.text}>Continue</Text>
          </TouchableOpacity>
        </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backIcon: {
        margin:'auto',
        // color:'#ffffff',
        // backgroundColor:"#ffffff"
	},
    btn:
    {
        marginTop:40,
        marginLeft:15,
        width: 43,
		height: 43,
        backgroundColor:"#738F81",
        borderRadius: 35,
    },
    txt:
    {
        marginTop:215,
        marginLeft:40,
        fontSize:22,
        fontFamily:'OpenSansBold',
        color:'#ffffff',
    },
    text:
    {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily:'OpenSansBold',
    },
    input: {
        height: 55,
        width:285,
        borderWidth: 1,
        padding: 10,
        borderRadius: 14,
        margin:'auto',
        marginTop:25,
        display: 'flex',
		justifyContent: 'center',
        backgroundColor:'#ffffff',
        fontSize:17,
      },
      btncontinue:
      {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#738F81',
        width: 285,
        height: 60,
        borderRadius: 35,
        marginTop:275,
        margin:'auto',
      },
	
})

export default SignupemailScreen