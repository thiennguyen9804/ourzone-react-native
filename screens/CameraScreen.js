// framework
import { CameraView, useCameraPermissions } from 'expo-camera'
import React, { useState, useRef } from 'react'
import { Button, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native'
import { SvgXml } from 'react-native-svg';
import { Swipeable } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { manipulateAsync, FlipType } from 'expo-image-manipulator';

// icon 
import friendIcon from '../assets/friend-icon';
import chatIcon from '../assets/chat-icon';
import cameraIcon from '../assets/camera-icon';
import flipIcon from '../assets/flip-icon';
import flashOnIcon from '../assets/flash-on-icon';
import flashOffIcon from '../assets/flash-off-icon';
import cancelIcon from '../assets/cancel-icon';
import sendIcon from '../assets/send-icon';
import Animated, { SlideInDown, SlideInLeft, SlideInUp, SlideOutRight, SlideOutUp } from 'react-native-reanimated';

const CameraScreen = ({ navigation }) => {
	// console.log(navigation);
	const [flashMode, setFlashMode] = useState('off');
	const [facing, setFacing] = useState('front');
	const [permission, requestPermission] = useCameraPermissions();
	const [imageUri, setImageUri] = useState(null);
	const [status, setStatus] = useState(false); // false: not capture yet | true: captured
	const [message, setMessage] = useState(null);
	const cameraRef = useRef();
	const toggleFlashMode = () => setFlashMode(curr => curr === 'off' ? 'on' : 'off');
	const toggleFacing = () => setFacing(curr => curr === 'front' ? 'back' : 'front');
	const toggleStatus = () => setStatus(curr => !curr)
	const takePhoto = async e => {
		if(cameraRef.current) {
			const options = { quality: 0.5, base64: true, skipProcessing: true, isImageMirror: false };
			const data = await cameraRef.current.takePictureAsync(options);
			if(facing === 'front') {
				const manipResult = await manipulateAsync(
					data.uri,
					[{rotate: 180}, {flip: FlipType.Vertical}]
				);

				setImageUri(manipResult.uri);
			} else {
				setImageUri(data.uri);
			}
			if(data.uri) {
				toggleStatus();
			}
		}
	}
	const cancelHandler = () => {
		toggleStatus();
	}

	return (
		<Animated.View 
			style={styles.container}
			entering={SlideInDown}
			exiting={SlideOutUp}
		>
			<View style={styles.navSection}>
				<TouchableOpacity style={[styles.navBtn, styles.avatar]}>
					<Image />
				</TouchableOpacity>

				{/* friend nav */}
				<TouchableOpacity style={styles.friendBtn}>
					<SvgXml xml={friendIcon}/>
					<Text style={styles.friendTxt}>Friend</Text>
				</TouchableOpacity>

				{/* chat nav */}
				<TouchableOpacity style={styles.navBtn}>
					<SvgXml xml={chatIcon} />
				</TouchableOpacity>
			</View>

			
			{!status ? (
				<>
					<CameraView  ref={cameraRef} style={styles.camera} facing={facing} flash={flashMode}/>
					<View style={styles.captureSection}>
						{/* flash */}
						<TouchableOpacity onPress={toggleFlashMode}>
							<SvgXml xml={(flashMode === 'off' ? flashOffIcon : flashOnIcon)} />
						</TouchableOpacity>

						{/* capture */}
						<TouchableOpacity style={styles.captureBtn} onPress={takePhoto}>
							<View style={styles.cameraBtnInner}>
								<SvgXml style={{margin: 'auto'}} xml={cameraIcon}/>
							</View>
						</TouchableOpacity>

						{/* len changing */}
						<TouchableOpacity onPress={toggleFacing}>
							<SvgXml xml={flipIcon}/>
						</TouchableOpacity>
					</View>

					{/* history navigate */}
					<TouchableOpacity onPress={() => navigation.navigate('History')}>
						<Text style={styles.historyTxt}>History</Text>
					</TouchableOpacity>
				</>
				
			) : (
				<>
					{/* message */}
					<View style={styles.imageSection}>
						<Image source={{uri: imageUri}} style={styles.camera} />
						<View style={{width: '100%', position: 'absolute', left: 0, right: 0, bottom: 10, justifyContent: 'center', alignItems: 'center'}}>
							<TextInput textAlign='center' numberOfLines={1} style={styles.messageInput} onChangeText={setMessage} value={message}/>
						</View>
					</View>

					<View style={styles.captureSection}>
						{/* cancel */}
						<TouchableOpacity onPress={cancelHandler}>
							<SvgXml xml={cancelIcon} />
						</TouchableOpacity>

						{/* send */}
						<TouchableOpacity style={styles.captureBtn} onPress={takePhoto}>
							<View style={styles.cameraBtnInner}>
								<SvgXml style={{margin: 'auto'}} xml={sendIcon}/>
							</View>
						</TouchableOpacity>

						{/* saving */}
						<TouchableOpacity onPress={toggleFacing}>
							<SvgXml xml={flipIcon}/>
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