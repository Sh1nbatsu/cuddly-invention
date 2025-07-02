import { UserAttributes } from 'api/db/models/User.model'

declare global {
  namespace Express {
    interface Request {
      user: UserAttributes
    }
  }
}
