import { Request, Response, NextFunction } from 'express'

export default (req: Request, _: Response, next: NextFunction) => {
  req.statusCode = 404
  next(new Error('Not found'))
}
