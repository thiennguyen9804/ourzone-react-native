import { StyleSheet, Text, View } from "react-native";
import Animated, { SlideInDown, SlideInUp, SlideOutDown, SlideOutUp } from "react-native-reanimated";

const HistoryScreen = ({ navigation }) => {
	return (
		<Animated.View
			entering={SlideInDown}
			exiting={SlideOutUp}
		>
			<View>
				{/* header buttons */}
			</View>

			
		</Animated.View>
	)
}

export default HistoryScreen



const styles = StyleSheet.create({

});

