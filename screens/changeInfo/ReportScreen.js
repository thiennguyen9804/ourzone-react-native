import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Touchable } from 'react-native';
import Animated, { SlideInDown, SlideInUp, SlideOutDown, SlideOutUp } from "react-native-reanimated";
import { SvgXml } from 'react-native-svg';
import { TextInput } from 'react-native-gesture-handler';
//icon
import iconBack from "../../assets/back-icon";

const ReportScreen = ({ navigation }) => {
    const [yourEmail, setYourEmail] = useState('');
    const [report, setReport] = useState('');

    return (
        <Animated.View
            style={styles.container}
            entering={SlideInDown}
            exiting={SlideOutDown}
        >
            <TouchableOpacity style={styles.btnBack} >
                <SvgXml style={styles.icon} xml={iconBack}
                    onPress={() => navigation.navigate('Account')} />
            </TouchableOpacity>

            <View style={styles.frmTopic}>
                <Text style={styles.textTopic}>Report A Problem</Text>
            </View>

            <TextInput style={styles.frmEditEmail}
                onChange={setYourEmail}
                placeholder='Your email address'
                value={yourEmail}></TextInput>

            <TextInput style={styles.frmEditReport}
                onChange={setReport}
                placeholder="Tell us about what's going on..."
                value={report}
                multiline={true}></TextInput>


            <TouchableOpacity style={styles.btnSave}>
                <Text style={styles.textInBtn}>Report</Text>
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
        marginVertical: 150,
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

    frmEditEmail: {
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
        marginBottom: 10
    },

    frmEditReport: {
        width: '90%',
        height: 241,
        marginHorizontal: "auto",
        borderColor: "#626262",
        borderRadius: 21,
        borderWidth: 0.6,
        padding: 20,
        fontSize: 12,
        fontWeight: "400",
        color: "#626262",
        letterSpacing: 3,
        textAlignVertical: "top",
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

export default ReportScreen;