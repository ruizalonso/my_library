import { compare } from 'bcryptjs'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connect } from '@/src/lib/connection'
import { UserModel } from '@/src/models/user'
import { Types } from 'mongoose'

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }
        await connect()
        const user = await UserModel.findOne({
          email: credentials?.email,
        }).select('+password')

        if (!user || !(await compare(credentials.password, user.password))) {
          return null
        }

        return {
          id: user._id as unknown as string,
          email: user.email,
          name: user.name,
        } as any
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          _id: token._id as Types.ObjectId,
        },
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          _id: u._id as Types.ObjectId,
        }
      }
      return token
    },
  },
}
