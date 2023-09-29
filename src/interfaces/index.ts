import { ObjectId } from 'mongoose'
export interface ICategory {
  value: string
  label: string
}
export interface IBook {
  _id?: ObjectId | string
  title: string
  author: string
  publisher: string
  description: string
  categories?: string[]
  pageCount: number
  language: string
  price: number
  inventory: number
  image: string
  user: ObjectId | string
  readed: boolean
}
export interface IUser extends IAuth {
  name: string
  status: boolean
}

export interface IAuth {
  email: string
  password: string
}
