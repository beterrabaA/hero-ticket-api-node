import mongoose from 'mongoose'
import { User } from '../entities/User'
import { UserRepository } from './user.repository'
import { userSchema } from '../schemas/user.schema'

const UserModel = mongoose.model('User', userSchema)

class UserRepositoryMongoose implements UserRepository {
  public async add(user: User): Promise<User> {
    const model = new UserModel(user)
    const newUser = await model.save()
    return newUser.toObject()
  }

  public async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await UserModel.findOne({
      email,
    }).exec()

    return user?.toObject() || undefined
  }
}

export { UserRepositoryMongoose }
