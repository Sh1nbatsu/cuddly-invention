import { UserAttributes } from 'api/db/models/User.model'
import { Request } from 'express'

export type RequestWithValidateData<T> = Request<{}, {}, T>

export interface RequestWithUser extends Request {
  user?: UserAttributes
}
