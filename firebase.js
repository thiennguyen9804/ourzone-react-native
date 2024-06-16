
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAd9yfmEOMjE04GK8IWSfJnGgXZi2_aK10",
	authDomain: "locket-clone-d9494.firebaseapp.com",
	projectId: "locket-clone-d9494",
	storageBucket: "locket-clone-d9494.appspot.com",
	messagingSenderId: "388995846486",
	appId: "1:388995846486:web:8ed2b8db843ed32ac0c6f7",
	measurementId: "G-RQBMK36XVG"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

