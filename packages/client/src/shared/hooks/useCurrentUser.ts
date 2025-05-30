import { selectUser } from '@/entities/user/model/user.selector'
import { useAppSelector } from '@/providers/store/store.hooks'

export const useCurrentUser = () => useAppSelector(selectUser)
