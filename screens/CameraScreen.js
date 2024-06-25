// framework
import { useCameraPermissions, useMicrophonePermissions } from 'expo-camera'
import { Camera, CameraType, FlashMode } from 'expo-camera/legacy';
import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import { Button, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native'
import { SvgXml } from 'react-native-svg';
import { Video, ResizeMode } from 'expo-av';
import { manipulateAsync, FlipType } from 'expo-image-manipulator';
import Animated, { SlideInDown, SlideInLeft, SlideInUp, SlideOutRight, SlideOutUp, useSharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useApplicationContext } from '../hooks/useApplicationContext';
import { useIsFocused } from '@react-navigation/native';
import { useSendImage } from '../hooks/useSendImage';

// widgets
import CaptureButton from '../widgets/CaptureButton';

// icon 
import friendIcon from '../assets/friend-icon';
import chatIcon from '../assets/chat-icon';
import flipIcon from '../assets/flip-icon';
import flashOnIcon from '../assets/flash-on-icon';
import flashOffIcon from '../assets/flash-off-icon';
import cancelIcon from '../assets/cancel-icon';
import sendIcon from '../assets/send-icon';
import cameraIcon from '../assets/camera-icon';
import { useSelector } from 'react-redux';
import { useNewsfeed } from '../hooks/useNewsfeed';

const CameraScreen = ({ navigation }) => {
	// variables
	const isFocused = useIsFocused();
	const [flashMode, setFlashMode] = useState(FlashMode.off);
	const [facing, setFacing] = useState(CameraType.back);
	const [permission, requestPermission] = useCameraPermissions();
	const [imageUri, setImageUri] = useState(null);
	const [videoUri, setVideoUri] = useState(null);
	const [captureMode, setCaptureMode] = useState('video');
	// let mutableCaptureMode = 'picture'
	const [status, setStatus] = useState(false); // false: not capture yet | true: captured
	const [message, setMessage] = useState(null);
	const cameraRef = useRef();
	const isPressingButton = useSharedValue(false);
	const [cameraStatus, requestCameraPermission] = Camera.useCameraPermissions();
	const [microphoneStatus, requestMicrophonePermission] = Camera.useMicrophonePermissions();
	const { loading, setLoading, sendImage } = useSendImage();
	const { user, userId, setNewsfeed, setPostIds } = useApplicationContext();
	const { getNewsfeedByUserId } = useNewsfeed();
	// end variables

	// functions
	const toggleFlashMode = () => setFlashMode(curr => curr === FlashMode.off ? FlashMode.on : FlashMode.off);
	const toggleFacing = () => setFacing(curr => curr === CameraType.front ? CameraType.back : CameraType.front);
	const toggleStatus = () => setStatus(curr => {
		return !curr
	})

	const takePhoto = useCallback(async () => {
		try {
			if (cameraRef.current) {
				const options = { quality: 0.5, base64: true, skipProcessing: true, isImageMirror: false };
				const data = await cameraRef.current.takePictureAsync(options);

				if(facing === CameraType.front) {
					const manipResult = await manipulateAsync(
						data.uri,
						[{rotate: 180}, {flip: FlipType.Vertical}]
					);

					setImageUri(manipResult.uri);
				} else {
					setImageUri(data.uri);
				}


				setImageUri(data.uri)
				if (data.uri) {
					// console.log(imag)
					toggleStatus();
				}
			}
		} catch (error) {
			console.log(error.message)
		}
	}, [flashMode, facing, setCaptureMode]);

	const startRecord = useCallback(async () => {

		// console.log('capture mode: ', mutableCaptureMode);
		try {
			if (cameraRef.current) {
				const options = { quality: '1080p', mute: true };
				const data = await cameraRef.current.recordAsync(options);
				setVideoUri(data.uri);
				if (data.uri) {
					toggleStatus();
				}

			}
		}
		catch (error) {
			console.log(error.message)
		}

	}, [flashMode, facing]);

	const stopRecord = useCallback(() => {
		cameraRef.current.stopRecording();
		console.log('stop record');
		// console.log(imageUri);
	}, [flashMode, facing]);

	const cancelHandler = () => {
		setImageUri(null);
		setVideoUri(null)
		setMessage('');
		toggleStatus();
	}

	const submitImage = async () => {
		
		try {
			if(imageUri)
				await sendImage(imageUri, message);
			else if(videoUri) 
				await sendImage(videoUri, message)
			setImageUri(null);
			setVideoUri(null)
			setMessage('');
			toggleStatus();
		} catch(err) {
			console.log(err.message);
		}
	}

	const setIsPressingButton = (_isPressingButton) => {
		isPressingButton.value = _isPressingButton;
	}
	// end functions

	// side effect
	useEffect(() => {
		requestCameraPermission();
		requestMicrophonePermission();
		// cameraRef.current.resumePreview();
	}, []);

	// update newsfeed
	useEffect(() => {
		if(userId) {
			getNewsfeedByUserId(userId, setNewsfeed, setPostIds);
		}
	}, [])

	// ui render
	return (
		<Animated.View
			style={styles.container}
			entering={SlideInDown}
			exiting={SlideOutUp}
		>
			<View style={styles.navSection}>
				{/* profile */}
				<TouchableOpacity onPress={() => navigation.navigate('Account')} style={[styles.navBtn, styles.avatar]}>
					<Image />
				</TouchableOpacity>

				{/* friend nav */}
				<TouchableOpacity
				style={styles.friendBtn}
				onPress={() => navigation.navigate('Friend')}>
					<SvgXml xml={friendIcon}/>
					<Text style={styles.friendTxt}>Friend</Text>
				</TouchableOpacity>

				{/* chat nav */}
				<TouchableOpacity style={styles.navBtn} onPress={()=>navigation.navigate('Message')}>
					<SvgXml xml={chatIcon} />
				</TouchableOpacity>
			</View>


			{!status ? (
				// pre cap
				<>
					{/* camera */}
					{isFocused && <Camera
						ref={cameraRef}
						style={styles.camera}
						type={facing}
						flashMode={flashMode}
						ratio='1:1'
					/>}

					<View style={styles.captureSection}>
						{/* flash */}
						<TouchableOpacity onPress={toggleFlashMode}>
							<SvgXml xml={(flashMode === 'off' ? flashOffIcon : flashOnIcon)} />
						</TouchableOpacity>

						{/* capture */}
						<CaptureButton
							cameraRef={cameraRef}
							flashMode={flashMode}
							facing={facing}
							takePhoto={takePhoto}
							startRecord={startRecord}
							stopRecord={stopRecord}
							enabled={true}
							setIsPressingButton={setIsPressingButton}
							captureMode={captureMode}
							setCaptureMode={setCaptureMode}
						/>


						{/* len changing */}
						<TouchableOpacity onPress={toggleFacing}>
							<SvgXml xml={flipIcon} />
						</TouchableOpacity>
					</View>

					{/* history navigate */}
					<TouchableOpacity onPress={() => navigation.navigate('History')}>
						<Text style={styles.historyTxt}>History</Text>
					</TouchableOpacity>
				</>

			) : (
				// post cap
				<>
					{/* message */}
					<View style={styles.imageSection}>
						{imageUri &&
							<Image source={{ uri: imageUri }} style={styles.camera} />
						}
						{videoUri &&
							<Video
								style={styles.camera}
								source={{ uri: videoUri }}
								isLooping
								shouldPlay
								resizeMode={ResizeMode.COVER}
							/>
						}
						<View style={{ width: '100%', position: 'absolute', left: 0, right: 0, bottom: 10, justifyContent: 'center', alignItems: 'center' }}>
							<TextInput textAlign='center' numberOfLines={1} style={styles.messageInput} onChangeText={setMessage} value={message} />
						</View>
					</View>

					<View style={styles.captureSection}>
						{/* cancel */}
						<TouchableOpacity onPress={cancelHandler}>
							<SvgXml xml={cancelIcon} />
						</TouchableOpacity>

						{/* send */}
						<TouchableOpacity style={styles.captureBtn} onPress={submitImage}>
							<View style={styles.cameraBtnInner}>
								<SvgXml style={{ margin: 'auto' }} xml={sendIcon} />
							</View>
						</TouchableOpacity>

						{/* saving */}
						<TouchableOpacity onPress={toggleFacing}>
							<SvgXml xml={flipIcon} />
						</TouchableOpacity>
					</View>
				</>
			)}
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
	},

	cameraContainer: {
		width: '100%',
		aspectRatio: 1,
		borderWidth: 4,
		borderRadius: 40,
		backgroundColor: '#AAC2B3',
		borderColor: '#D0E2DE',
		padding: 20
	},

	cameraOuter: {
		borderRadius: 30
	},

	camera: {
		width: '100%',
		aspectRatio: 1,
		marginTop: 40
	},

	navBtn: {
		backgroundColor: '#AAC2B3',
		width: 50,
		height: 50,
		borderRadius: 25,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},


	navSection: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: 60,
		justifyContent: 'space-around',
	},


	friendBtn: {
		width: 145,
		height: 50,
		backgroundColor: '#AAC2B3',
		borderRadius: 25,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		gap: 10
	},

	friendTxt: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#fff'
	},

	captureBtn: {
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

	captureSection: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '25%',
		gap: 25
	},

	imageSection: {
		// position: 'relative'
	},

	messageInput: {
		borderRadius: 18,
		fontWeight: 'bold',
		backgroundColor: '#fff',
		letterSpacing: 1.2,
		borderWidth: 5,
		borderColor: '#fff',
		paddingHorizontal: 10,
		fontSize: 16,
	},
	historyTxt: {
		marginHorizontal: 'auto',
		marginTop: 20,
		fontSize: 20,
		backgroundColor: '#A5B9B1',
		paddingHorizontal: 10,
		paddingVertical: 3,
		borderRadius: 20,
		color: '#fff',
		fontWeight: 'bold',
		letterSpacing: 1.2
	}
})

export default CameraScreen