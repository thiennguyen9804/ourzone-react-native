import React, { memo, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Reanimated, { 
	useAnimatedStyle, useSharedValue, withRepeat, 
	withSpring, withTiming, Easing } 
from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

// icons
import cameraIcon from '../assets/camera-icon';

const CaptureButton = ({ 
	cameraRef, flashMode, facing, takePhoto, 
	enabled, startRecord, stopRecord, mutableCaptureMode
}) => {
	const recordingProgress = useSharedValue(0);
	const isPressingButton = useSharedValue(false);
	const pressDownDate = useRef();
	const START_RECORDING_DELAY = 200;
	const tap = useMemo(
		() => 
			Gesture.Tap()
			.maxDuration(3200)
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
						
					} else if(diff >= START_RECORDING_DELAY) {
						await stopRecord();
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