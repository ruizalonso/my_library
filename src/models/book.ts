import mongoose, { Schema, Types, model, Model } from 'mongoose'
import { IBook, ICategory } from '@/src/interfaces'

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    description: { type: String, required: true },
    categories: { type: [String], required: true },
    pageCount: { type: Number, required: true },
    language: { type: String, required: true },
    price: { type: Number, required: true },
    inventory: { type: Number, required: true },
    image: { type: String, required: true },
    user: { type: Types.ObjectId, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const BookModel: Model<IBook> =
  mongoose.models.books || model('books', BookSchema)

export { BookModel }
