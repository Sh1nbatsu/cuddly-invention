import { loginRoute } from '@/pages/login/login.route'
import { registrationRoute } from '@/pages/registration/registration.route'

export const authRoutes = {
  path: '/',
  children: [registrationRoute, loginRoute],
}
