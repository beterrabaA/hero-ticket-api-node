import { User } from '../entities/User'

export interface UserRepository {
  add(user: User): Promise<User>
  findUserByEmail(email: string): Promise<User | undefined>
}
