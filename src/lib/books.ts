import { ObjectId, isValidObjectId } from 'mongoose'
import { connect, disconnect } from './connection'
import { IBook, ICategory } from '@/src/interfaces'
import { BookModel } from '@/src/models/book'

export const getAllBooks = async (): Promise<IBook[]> => {
  await connect()

  const books = await BookModel.find({}).lean()
  await disconnect()
  // if (!books) return null
  return JSON.parse(JSON.stringify(books))
}
export const getBookById = async (_id: ObjectId | string): Promise<IBook> => {
  await connect()
  const books = await BookModel.findOne({ _id }).lean()
  await disconnect()
  // if (!books) return null
  return JSON.parse(JSON.stringify(books))
}
// export const getCategoryBooks = async (): Promise<ICategory[] | null> => {
//   await connect()
//   const entries = await CategoryModel.find({}).lean()
//   await disconnect()
//   if (!entries) return null
//   return JSON.parse(JSON.stringify(entries))
// }
