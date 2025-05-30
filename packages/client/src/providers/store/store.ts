import { userReducer } from '@/entities/user/model/user.slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})
