import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  getMe,
  User,
} from '@/api/auth'
import { LoginFormData, RegisterFormData } from '@/pages/auth/schemas'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface AuthState {
  user: User | null
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  loading: true,
}

export const fetchMe = createAsyncThunk('auth/fetchMe', async () => {
  return await getMe()
})

export const login = createAsyncThunk(
  'auth/login',
  async (data: LoginFormData) => {
    return await apiLogin(data)
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (data: RegisterFormData) => {
    return await apiRegister(data)
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  await apiLogout()
})

const userSlice = createSlice({
  name: '@@user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMe.pending, state => {
        state.loading = true
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
      })
      .addCase(fetchMe.rejected, state => {
        state.loading = false
      })
      .addCase(login.pending, state => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
      })
      .addCase(login.rejected, state => {
        state.loading = false
      })
      .addCase(register.pending, state => {
        state.loading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
      })
      .addCase(register.rejected, state => {
        state.loading = false
      })
      .addCase(logout.pending, state => {
        state.loading = true
      })
      .addCase(logout.fulfilled, state => {
        state.user = null
        state.loading = false
      })
      .addCase(logout.rejected, state => {
        state.loading = false
      })
  },
})

export const userReducer = userSlice.reducer
