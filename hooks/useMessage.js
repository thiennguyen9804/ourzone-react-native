import { doc, getDoc } from "firebase/firestore";
import { db, app } from '../firebase'

export const useMessage = () => {
	// setMessages is optional
	const getMessageByMessageId = async (messageId, setMessages) => {
		if(!messageId) {
			throw new Error('getMessageByMessageId requires messageId');
		}

		const docRef = doc(db, 'message', messageId);
		const docSnap = await getDoc(docRef);
		if(setMessages) {
			setMessages(prev => [...prev, docSnap.data()]);
		}

		return Promise.resolve(docSnap.data());
	}
	return {getMessageByMessageId}
}