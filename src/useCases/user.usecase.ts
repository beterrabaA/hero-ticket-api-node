import { User } from '../entities/User'
import { HttpException } from '../interfaces/HttpException'
import { UserRepository } from '../repositories/user.repository'

class UserUseCase {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  public async create(userData: User): Promise<User> {
    const existsUser = await this.userRepository.findUserByEmail(userData.email)

    if (existsUser) throw new HttpException(400, 'User already exists')

    return await this.userRepository.add(userData)
  }
}

export { UserUseCase }
