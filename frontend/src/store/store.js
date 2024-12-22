import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../reducers/userReducer'
import postSlice from '../reducers/postReducer'
export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [postSlice.name]: postSlice.reducer
  },
})