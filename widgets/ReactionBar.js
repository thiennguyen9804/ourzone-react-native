import { View, StyleSheet } from "react-native";
import LeftHalfBar from "./LeftHalfBar";
import RightHalfBar from "./RightHalfBar";

export default function ReactionBar() {
	return (
		<View style={styles.container}>
			<LeftHalfBar/>
			<RightHalfBar/>
		</View>
	)
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		width: 250,
		height: 40,
		// backgroundColor: 'red',
		elevation: 6,
		borderRadius: 20
	}
});