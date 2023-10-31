import { NextFunction, Request, Response } from 'express'
import { UserUseCase } from '../useCases/user.usecase'
import { User } from '../entities/User'

class UserController {
  constructor(private userUseCase: UserUseCase) {
    this.userUseCase = userUseCase
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const userData: User = req.body

    try {
      await this.userUseCase.create(userData)
      return res.status(201).json({ message: 'User created' })
    } catch (error) {
      next(error)
    }
  }
}

export { UserController }
