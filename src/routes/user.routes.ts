import { Router } from 'express'
import { UserRepositoryMongoose } from '../repositories/UserRepositoryMongoose'
import { UserController } from '../controllers/user.controller'
import { UserUseCase } from '../useCases/user.usecase'

class UserRoutes {
  public router: Router
  private controller: UserController
  constructor() {
    this.router = Router()
    const userRepository = new UserRepositoryMongoose()
    const userUseCase = new UserUseCase(userRepository)
    this.controller = new UserController(userUseCase)
    this.initRoutes()
  }

  initRoutes() {
    this.router.post('/', this.controller.create.bind(this.controller))
  }
}

export { UserRoutes }
