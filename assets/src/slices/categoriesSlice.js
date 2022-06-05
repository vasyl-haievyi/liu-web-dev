import { createSlice } from '@reduxjs/toolkit'

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    load: (state, action) => {
        return action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { load } = categoriesSlice.actions

export default categoriesSlice.reducer