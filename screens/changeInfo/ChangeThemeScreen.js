import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Touchable } from 'react-native';
import Animated, { SlideInDown, SlideInUp, SlideOutDown, SlideOutUp } from "react-native-reanimated";
import { SvgXml } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

import iconBack from "../../assets/back-icon";

const RadioButton = ({ selected, onPress, label, customStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.radioButtonContainer, customStyle]}>
            <View style={styles.radioButton}>
                {selected ? <View style={styles.radioButtonSelected} /> : null}
            </View>
            <Text style={styles.radioButtonLabel}>{label}</Text>
        </TouchableOpacity>
    );
};
const ChangeThemeScreen = ({ navigation }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { value: 'option1', style: { backgroundColor: '#DC8686' } },
        { value: 'option2', style: { backgroundColor: '#E5B29C' } },
        { value: 'option3', style: { backgroundColor: '#798F74' } },
        { value: 'option4', style: { backgroundColor: '#85C9D8' } },
        { value: 'option5', style: { backgroundColor: '#A3A2E1' } },
        { value: 'option6', style: { backgroundColor: '#FCC9FD' } },
        { value: 'option7', style: { backgroundColor: '#8C7B83' } },
    ];

    useEffect(() => {
        const loadSelectedOption = async () => {
            try {
                const value = await AsyncStorage.getItem('@selected_option');
                if (value !== null) {
                    setSelectedOption(value);
                }
            } catch (e) {
                Alert.alert('Failed to load the selected option.');
            }
        };

        loadSelectedOption();
    }, []);

    const handlePress = async (value) => {
        setSelectedOption(value);
        try {
            await AsyncStorage.setItem('@selected_option', value);
        } catch (e) {
            Alert.alert('Failed to save the selected option.');
        }
    };

    return (
        <Animated.View
            style={styles.container}
            entering={SlideInDown}
            exiting={SlideOutDown}
        >
            <TouchableOpacity style={styles.btnBack} onPress={() => navigation.navigate('Account')}>
                <SvgXml style={styles.icon} xml={iconBack}></SvgXml>
            </TouchableOpacity>

            <View style={styles.frmTopic}>
                <Text style={styles.textTopic}
                >Choose a color</Text>
            </View>

            <View style={styles.radioGroup}>
                {options.map((option) => (
                    <RadioButton
                        key={option.value}
                        label={option.label}
                        selected={selectedOption === option.value}
                        onPress={() => handlePress(option.value)}
                        customStyle={option.style}
                    />
                ))}
            </View>
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
        marginHorizontal: 20,
        marginVertical: 170,
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

    radioButtonContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        marginHorizontal: "auto"
    },

    radioGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: 50,
        margin: 9,
        borderRadius: 50
        ,
    },

    radioButton: {
        height: 50,
        width: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },

    radioButtonSelected: {
        height: 30,
        width: 30,
        borderRadius: 40,
        backgroundColor: '#FFFFFF',
    },

    radioButtonLabel: {
        fontSize: 16,
    },
});


export default ChangeThemeScreen;