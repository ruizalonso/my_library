import { IBook } from '@/src/interfaces'
import { connect } from '@/src/lib/connection'
import { BookModel } from '@/src/models/book'
import { getServerSession } from 'next-auth'
import { authOptions } from '@lib/auth'
import { NextResponse } from 'next/server'

export async function PUT(req: Request, { params }: any) {
  await connect()
  const _id = params.id
  const session = await getServerSession(authOptions)
  const user: any = session?.user
  const data: IBook = await req.json()
  data.user = user._id
  console.log(data)

  try {
    const book = await BookModel.findByIdAndUpdate(_id, data, {
      new: true,
      runValidators: true,
    })
    if (!book) {
      return NextResponse.json({ error: 'Not found' }, { status: 401 })
    }
    return NextResponse.json({ data: book }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }
}
