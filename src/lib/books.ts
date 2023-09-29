import { ObjectId } from 'mongoose'
import { connect, disconnect } from './connection'
import { IBook } from '@/src/interfaces'
import { BookModel } from '@/src/models/book'

export const getAllBooks = async (): Promise<IBook[]> => {
  await connect()

  const books = await BookModel.find({}).lean()
  await disconnect()
  return JSON.parse(JSON.stringify(books))
}
export const getBookById = async (_id: ObjectId | string): Promise<IBook> => {
  await connect()
  const books = await BookModel.findOne({ _id }).lean()
  await disconnect()
  return JSON.parse(JSON.stringify(books))
}