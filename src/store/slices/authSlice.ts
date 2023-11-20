import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { setUser } from './userSlice'
import { deleteToken, deleteUser, persistToken, readToken } from '../../services/localStorage.service'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'

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

export const doLogin = createAsyncThunk('auth/doLogin', async (loginPayload: LoginRequest, { dispatch }) =>
  signInWithEmailAndPassword(auth, loginPayload.email, loginPayload.password).then((res) => {
    const user = res.user
    dispatch(setUser(res.user))
    // @ts-ignore
    persistToken(res.user?.accessToken)

    // @ts-ignore
    return res.user?.accessToken
  })
)

export const doLogout = createAsyncThunk('auth/doLogout', (payload, { dispatch }) => {
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
