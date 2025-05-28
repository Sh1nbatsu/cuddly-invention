import { logout } from '@/api/auth'
import { useDispatch } from 'react-redux'
import { clearUser } from '@/store/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { ButtonWrapper } from './styled'
import { CustomLink } from '../CustomLink/CustomLink'

export const LogoutButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      dispatch(clearUser())
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <ButtonWrapper>
      <CustomLink to="/" variant="retro" onClick={handleLogout}>
        Выйти
      </CustomLink>
    </ButtonWrapper>
  )
}
