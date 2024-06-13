import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, { SlideInDown, SlideInUp, SlideOutDown, SlideOutUp } from "react-native-reanimated";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const AccountScreen = () => {
    return (
        <Animated.View
            style={styles.container}
            entering={SlideInDown}
            exiting={SlideOutDown}
        >
            <View>
                <Text>Account Screen</Text>
                {/* Các thành phần khác của màn hình */}
            </View>
        </Animated.View>

    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        // position: 'absolute'
    },
});

export default AccountScreen;