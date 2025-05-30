import {
  getMeApi,
  loginUserApi,
  logoutUserApi,
  registerUserApi,
} from '../../session/session.api'

import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchMe = createAsyncThunk('auth/fetchMe', getMeApi)
export const login = createAsyncThunk('auth/login', loginUserApi)
export const register = createAsyncThunk('auth/register', registerUserApi)
export const logout = createAsyncThunk('auth/logout', logoutUserApi)
