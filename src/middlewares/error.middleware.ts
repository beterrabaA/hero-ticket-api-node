import { NextFunction, Request, Response } from 'express'
import { HttpException } from '../interfaces/HttpException'

export function errorMiddleware(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { status, message } = err

  res.status(status).json({ status, message })
}
