import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Touchable } from 'react-native';
import Animated, { SlideInDown, SlideInUp, SlideOutDown, SlideOutUp } from "react-native-reanimated";

const ChangeEmailScreen = ({ navigation }) => {
    return (
        <Animated.View
            style={styles.container}
            entering={SlideInDown}
            exiting={SlideOutDown}
        >
            <View>
                <Text>Change Email</Text>
            </View>
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
    },
});

export default ChangeEmailScreen;