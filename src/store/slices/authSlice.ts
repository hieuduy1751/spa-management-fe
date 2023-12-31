import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUser, setUser } from './userSlice'
import {
  deleteToken,
  deleteUser,
  persistRole,
  persistToken,
  persistUsername,
  readRole,
  readToken,
  readUsername
} from '../../services/localStorage'
import { LoginRequest, RegisterRequest } from '../../types/authenticationTypes'
import { login, register } from '../../services/authentication'

export type AuthSlice = {
  token: string | null
  role: string | null
  username: string | null
}

const initialState: AuthSlice = {
  token: readToken(),
  role: readRole(),
  username: readUsername()
}
export const setToken = createAction('auth/setToken', (token: string) => {
  return {
    payload: token
  }
})

export const doLogin = createAsyncThunk('auth/doLogin', async (loginPayload: LoginRequest, { dispatch }) => {
  try {
    const res = await login(loginPayload.username, loginPayload.password)
    return ''
  } catch (err: any) {
    return ''
  }
})

export const doRefresh = createAsyncThunk('auth/doRefresh', (_, { dispatch }) => {
  const token = localStorage.getItem('token')
  if (token) {
    const username = localStorage.getItem('username') || ''
    dispatch(getUser(username))
  }
})

export const doRegister = createAsyncThunk('auth/doRegister', async (registerPayload: RegisterRequest) => {
  const res = await register(
    registerPayload.username,
    registerPayload.password,
    registerPayload.passwordConfirm,
    registerPayload.email
  )
  console.log(res)
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
    builder.addCase(setToken, (state, action) => {
      state.token = action.payload
    })
  }
})

export default authSlice.reducer
