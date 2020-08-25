import { Request, Response, NextFunction } from 'express'

export default (err: any, req: Request, res: Response, _: NextFunction) => {
  res.status(req.statusCode || 500).json({ message: err.message || '' })
}
