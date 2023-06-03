import mongoose, { Schema, Types, model, Model } from 'mongoose'
import { IUser } from '@/src/interfaces'

const BookSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    status: { type: Boolean, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const UserModel: Model<IUser> =
  mongoose.models.users || model('users', BookSchema)

export { UserModel }
