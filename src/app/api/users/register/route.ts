import { IUser } from '@/src/interfaces'
import { connect } from '@/src/lib/connection'
import { UserModel } from '@/src/models/user'
import { hash } from 'bcryptjs'

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  await connect()

  const user: IUser = await req.json()
  const { email, password, name } = user
  try {
    const user = await UserModel.findOne({ email })
    if (user) {
      return NextResponse.json(
        { error: 'This email is already in use' },
        { status: 400 }
      )
    }
    const passHash = await encrypt(password)
    const registerNewUser = await UserModel.create({
      email,
      password: passHash,
      name,
      status: true,
    })
    return NextResponse.json({ user: registerNewUser }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }
}

const encrypt = async (pass: string) => {
  const passwordHash = await hash(pass, 8)
  return passwordHash
}
