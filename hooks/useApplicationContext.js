import { useContext } from "react";
import { ApplicationContext } from "../contexts/ApplicationContext";


export const useApplicationContext = () => {
	const context = useContext(ApplicationContext);
	if(!context) {
		throw new Error('Aplplication context must be used inside Application Context Provider');
	}
	return context;
}

