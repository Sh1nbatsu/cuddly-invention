import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  id: number | null
  first_name: string | null
  second_name: string | null
  display_name?: string | null
  phone: string | null
  login: string | null
  avatar?: string | null
  email: string | null
}

// Не знаю является ли такая запись лучшей практикой

const initialState: UserState = {
  id: null,
  first_name: null,
  second_name: null,
  display_name: null,
  phone: null,
  login: null,
  avatar: null,
  email: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<UserState>) => {
      state.id = action.payload.id
      state.first_name = action.payload.first_name
      state.second_name = action.payload.second_name
      state.display_name = action.payload?.display_name || null
      state.phone = action.payload.phone
      state.login = action.payload.login
      state.avatar = action.payload?.avatar || null
      state.email = action.payload.email
    },
    clearUser: (state: UserState) => {
      state.id = null
      state.first_name = null
      state.second_name = null
      state.display_name = null
      state.phone = null
      state.login = null
      state.avatar = null
      state.email = null
    },
    setAvatar: (state: UserState, action: PayloadAction<string>) => {
      state.avatar = action.payload
    },
    setDisplayName: (state: UserState, action: PayloadAction<string>) => {
      state.display_name = action.payload
    },
  },
})

export const { setUser, clearUser, setAvatar, setDisplayName } =
  userSlice.actions

export default userSlice.reducer

// Отдельные редюсеры для аватара и имени, так как они меняются только отдельно
