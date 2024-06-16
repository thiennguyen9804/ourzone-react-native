import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice';
import postsReducer from '../slices/postsSlice';


export default configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
  },
});