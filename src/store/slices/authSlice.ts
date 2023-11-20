import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { setUser } from './userSlice'
import { deleteToken, deleteUser, persistToken, readToken } from '~/services/localStorage'

export interface AuthSlice {
  token: string | null
}

export interface LoginRequest {
  email: string
  password: string
}

const initialState: AuthSlice = {
  token: readToken()
}

export const doLogin = createAsyncThunk('auth/doLogin', async () => {
  // TODO: update this
  return ''
})

export const doLogout = createAsyncThunk('auth/doLogout', (_, { dispatch }) => {
  deleteToken()
  deleteUser()
  dispatch(setUser(null))
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.token = action.payload
    })
    builder.addCase(doLogout.fulfilled, (state) => {
      state.token = ''
    })
  }
})

export default authSlice.reducer
