import { Request } from 'express'
import { User } from '../entities/User'

export interface IFile {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}

export interface IFileRequest {
  banner: IFile[]
  flyers: IFile[]
}

export interface IUser extends User {
  id: string
}
