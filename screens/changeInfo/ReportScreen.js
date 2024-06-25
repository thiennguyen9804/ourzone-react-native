import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import Animated from "react-native-reanimated";
import { SvgXml } from 'react-native-svg';
import * as MailComposer from 'expo-mail-composer';
import * as Mailer from 'react-native-mail';


import iconBack from "../../assets/back-icon";

const ReportScreen = ({ navigation }) => {
    const [yourEmail, setYourEmail] = useState('');
    const [report, setReport] = useState('');

    const handleReport = () => {
        if (!yourEmail || !report.trim()) {
            Alert.alert('Error', 'Please fill in both email and content fields.');
            return;
        }

        // MailComposer.composeAsync({
        //     recipients: ['ourzone.company@gmail.com'],
        //     subject: 'Report a problem',
        //     body: `Email: ${yourEmail}\n\nContent:\n${report}`,
        // }).then(result => {
        //     if (result.status === 'sent') {
        Alert.alert('Report sent', 'Thanks for your report');
        setYourEmail('');
        setReport('');
        //     } else {
        //         Alert.alert('Error', 'Failed to send email.');
        //     }
        // }).catch(e => {
        //     console.error('Error sending report: ', e);
        //     Alert.alert('Error', 'Failed to send report. Please try again later.');
        // });
    };

    // const handleReport = () => {
    //     if (!yourEmail || !report) {
    //         Alert.alert('Error', 'Please fill in both email and content fields.');
    //         return;
    //     }

    //     Mailer.mail({
    //         subject: 'Report a problem',
    //         recipients: ['ourzone.company@gmail.com'],
    //         body: `Email: ${yourEmail}\n\nContent:\n${report}`,
    //         isHTML: false, // Có thể đặt là true nếu bạn muốn gửi HTML
    //     }, (error, event) => {
    //         if (error) {
    //             console.error('Could not send mail. Please try again later.', error);
    //             Alert.alert('Error', 'Failed to send report. Please try again later.');
    //         } else {
    //             Alert.alert('Report sent', 'Thanks for your report');
    //             setYourEmail('');
    //             setReport('');
    //         }
    //     });
    // };

    return (
        <Animated.View
            style={styles.container}
        >
            <TouchableOpacity style={styles.btnBack} onPress={() => navigation.navigate('Account')}>
                <SvgXml style={styles.icon} xml={iconBack} />
            </TouchableOpacity>

            <View style={styles.frmTopic}>
                <Text style={styles.textTopic}>Report A Problem</Text>
            </View>

            <TextInput
                style={styles.frmEditEmail}
                onChangeText={text => setYourEmail(text)}
                placeholder='Your email address'
                value={yourEmail}
            />

            <TextInput
                style={styles.frmEditReport}
                onChangeText={text => setReport(text)}
                placeholder="Tell us about what's going on..."
                value={report}
                multiline={true}
            />

            <TouchableOpacity style={styles.btnSave} onPress={handleReport}>
                <Text style={styles.textInBtn}>Report</Text>
            </TouchableOpacity>

        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#F8FFF8',
    },

    btnBack: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: 103,
        zIndex: 1000,
        backgroundColor: 'transparent'
    },

    icon: {
        margin: 'auto'
    },

    frmTopic: {
        alignSelf: 'center',
        marginTop: 150,
        marginBottom: 25
    },

    textTopic: {
        fontWeight: '800',
        color: '#738F81',
        letterSpacing: 0.5,
        fontSize: 26,
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 10,
    },

    frmEditEmail: {
        width: '90%',
        height: 50,
        marginHorizontal: 'auto',
        borderColor: '#626262',
        borderRadius: 50,
        borderWidth: 0.6,
        paddingLeft: 20,
        fontSize: 12,
        color: '#626262',
        letterSpacing: 3,
        marginBottom: 10
    },

    frmEditReport: {
        width: '90%',
        height: 241,
        marginHorizontal: 'auto',
        borderColor: '#626262',
        borderRadius: 21,
        borderWidth: 0.6,
        padding: 20,
        fontSize: 12,
        color: '#626262',
        letterSpacing: 3,
        textAlignVertical: 'top',
    },

    btnSave: {
        width: 118,
        height: 48,
        borderRadius: 50,
        backgroundColor: '#738F81',
        marginHorizontal: 'auto',
        marginTop: 30,
        alignItems: 'center',
    },

    textInBtn: {
        fontSize: 16,
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: 3,
        marginVertical: 'auto'
    }
});

export default ReportScreen;
