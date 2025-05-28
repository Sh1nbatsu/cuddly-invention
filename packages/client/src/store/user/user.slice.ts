import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  getMe,
  User,
} from '@/api/auth'
import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit'

interface AuthState {
  user: User | null
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  loading: true,
}

export const fetchMe = createAsyncThunk('auth/fetchMe', getMe)
export const login = createAsyncThunk('auth/login', apiLogin)
export const register = createAsyncThunk('auth/register', apiRegister)
export const logout = createAsyncThunk('auth/logout', apiLogout)

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
