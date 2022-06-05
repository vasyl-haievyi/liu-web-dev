import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    logIn: (state, action) => {
        return action.payload;
    },
    logOut: () => {
        return null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { logIn, logOut } = userSlice.actions

export default userSlice.reducer