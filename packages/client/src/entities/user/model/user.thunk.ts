import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  getMe,
} from '@/api/auth'

import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchMe = createAsyncThunk('auth/fetchMe', getMe)
export const login = createAsyncThunk('auth/login', apiLogin)
export const register = createAsyncThunk('auth/register', apiRegister)
export const logout = createAsyncThunk('auth/logout', apiLogout)
