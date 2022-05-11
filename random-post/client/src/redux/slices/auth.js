import { createSlice } from '@reduxjs/toolkit'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ?? { username: '', token: '' }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeUser: (state, action) => {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },

    logout: (state) => {
      state.user.username = ''
      state.user.token = ''
      localStorage.removeItem('user')
    }
  }
})

export const { storeUser, logout } = authSlice.actions
export default authSlice.reducer
