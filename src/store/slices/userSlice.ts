import { createAction, createAsyncThunk, createSlice, PrepareAction } from '@reduxjs/toolkit'
import { searchCustomerByUsername, updateCustomer } from '~/services/customer'
import { persistUser } from '~/services/localStorage'
import { CustomerType } from '~/types/customer'

export interface UserState {
  user: CustomerType | null
}

const initialState: UserState = {
  user: null
}

export const setUser = createAction<PrepareAction<any>>('user/setUser', (newUser) => {
  persistUser(newUser)

  return {
    payload: newUser
  }
})

export const getUser = createAsyncThunk('user/getUser', async (username: string) => {
  const res = await searchCustomerByUsername(username)
  return {
    payload: res
  }
})

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userId, user }: { userId: string; user: CustomerType }) => {
    const res = await updateCustomer(user, userId)
    return {
      user: res
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setUser, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.payload
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload.user
    })
  }
})

export default userSlice.reducer
