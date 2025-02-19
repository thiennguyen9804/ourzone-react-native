
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: 'user',
	initialState: {
		
	},
	reducers: {
		setUser: (state, action) => ({...state, ...action.payload}),
	}
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
