import React, { memo, useEffect, useMemo, useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Circle, Svg, SvgXml } from 'react-native-svg';
import Reanimated, { 
	useAnimatedStyle, useSharedValue, withRepeat, 
	withSpring, withTiming, Easing } 
from 'react-native-reanimated';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

// to be archived
{/* <View style={styles.captureBtn}>
	<View style={styles.cameraBtnInner}>
		<SvgXml style={{margin: 'auto'}} xml={cameraIcon}/>
	</View>
</View> */}

// icons
import cameraIcon from '../assets/camera-icon';

const CaptureButton = ({ 
	cameraRef, flashMode, facing, takePhoto, 
	enabled, startRecord, stopRecord, mutableCaptureMode
}) => {
	const circularRef = useRef();
	const timerRef = useRef();
	const reanimatedRef = useRef();
	const recordingProgress = useSharedValue(0);
	const isPressingButton = useSharedValue(false);
	const pressDownDate = useRef();
	const START_RECORDING_DELAY = 200;
	const CIRCLE_LENGTH = 1000;
	const R = CIRCLE_LENGTH / (2 * Math.PI);
	const { width, height } = Dimensions.get('screen');
	const AnimatedCircle = Animated.createAnimatedComponent(Circle);
	const tap = useMemo(
		() => 
			Gesture.Tap()
			.maxDuration(3600)
			.runOnJS(true)
			.onBegin(async () => {
				recordingProgress.value = 0;
				isPressingButton.value = true;
				const now = new Date();
				pressDownDate.current = now;
				setTimeout(async () => {
					if(pressDownDate.current === now) {
						// await setCaptureMode('video');
						console.log(mutableCaptureMode)
						await startRecord();
						console.log('start record');
						// timerRef.current = circularRef.current.animate(100, 3200, Easing.linear);
					}
				}, START_RECORDING_DELAY);
				return;
			})
			.onFinalize(async () => {
				try {
					if (pressDownDate.current === null) 
						throw new Error('PressDownDate ref .current was null!');
					const now = new Date();
					const diff = now.getTime() - pressDownDate.current.getTime();
					pressDownDate.current = undefined;
					if(diff < START_RECORDING_DELAY) {
						// await setCaptureMode('picture');
						console.log(mutableCaptureMode)
						await takePhoto();
						console.log('capture image');
						
					} else if(diff >= START_RECORDING_DELAY) {
						await stopRecord();
						console.log('stop recording');
						// timerRef.current.reset();
					}
				} finally {
					setTimeout(() => {
						isPressingButton.value = false;
						// setIsPressingButton
					}, 3000);
				}

				return;
			}),
		[isPressingButton, recordingProgress, takePhoto, startRecord, stopRecord]
	);

	useEffect(() => {
		
	}, []);
	return (
		<>
			
			<GestureDetector gesture={tap}>
				<Reanimated.View style={styles.border}>
					<View style={styles.captureBtn}>
						<View style={styles.cameraBtnInner}>
							<SvgXml style={{margin: 'auto'}} xml={cameraIcon}/>
						</View>
					</View>
				</Reanimated.View>
			</GestureDetector>
		</>
	)
}

const styles = StyleSheet.create({
	border: {
		width: 104,
		height: 104,
		borderWidth: 4.5,
		borderColor: 'white',
		borderRadius: 104 / 2
	},

	captureBtn: {
		margin: 'auto',
		width: 90,
		height: 90,
		borderRadius: 45,
		backgroundColor: '#AAC2B3',
	},

	cameraBtnInner: {
		margin: 'auto',
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: '#ECF4F4'
	},
});

export default memo(CaptureButton);