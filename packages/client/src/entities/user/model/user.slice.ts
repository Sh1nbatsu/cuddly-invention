import { User } from '@/shared/types/User'
import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit'
import { fetchMe, login, logout, register } from './user.thunk'

interface AuthState {
  user: User | null
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  loading: true,
}

const userSlice = createSlice({
  name: '@@user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(logout.fulfilled, state => {
        state.user = null
      })

      .addMatcher(isPending(fetchMe, login, register, logout), state => {
        state.loading = true
      })

      .addMatcher(isRejected(fetchMe, login, register, logout), state => {
        state.loading = false
      })

      .addMatcher(isFulfilled(fetchMe, login, register, logout), state => {
        state.loading = false
      })
  },
})

export const userReducer = userSlice.reducer
