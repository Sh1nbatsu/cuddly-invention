import { RootState } from '@/providers/store/store.types'

export const selectUser = (state: RootState) => state.user.user
