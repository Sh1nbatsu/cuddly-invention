import { RootState } from '../store'
import { UserState } from './userSlice'

export const getUser = (state: RootState): UserState => state.user
