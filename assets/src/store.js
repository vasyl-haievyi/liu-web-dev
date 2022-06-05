import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from './slices/categoriesSlice'
import userSlice from './slices/userSlice'

export default configureStore({
  reducer: {
      categories: categoriesReducer,
      user: userSlice
  },
})