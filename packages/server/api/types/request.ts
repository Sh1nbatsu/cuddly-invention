import { Request } from 'express'

export type RequestWithValidateData<T> = Request<{}, {}, T>
