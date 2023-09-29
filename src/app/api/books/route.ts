import { IBook } from '@/src/interfaces'
import { connect, disconnect } from '@/src/lib/connection'
import { BookModel } from '@/src/models/book'
import { getServerSession } from 'next-auth'
import { authOptions } from '@lib/auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  await connect()

  const data: IBook = await req.json()
  data.user = await getUserSession()
  try {
    const book = new BookModel(data)
    await book.save()
    
    return NextResponse.json({ data: book }, { status: 200 })
  } catch (error: any) {
    console.log('error', error)

    return NextResponse.json({ error: error.message }, { status: 403 })
  }
}

// export async function GET(req: Request) {
//   await connect()
  
//   const { searchParams } = new URL(req.url)
//   const page = searchParams.get('page')
//   const user = await getUserSession()
//   const PAGE_SIZE = 5
//   const skip = (Number(page) - 1) * PAGE_SIZE
//   const totalBooks = await BookModel.countDocuments()
//   const totalPages = Math.ceil(totalBooks / PAGE_SIZE)
//   try {
//     const books = await BookModel.find({ user })
//       .skip(skip)
//       .limit(PAGE_SIZE)
//       .lean()
//     await disconnect()
//     return NextResponse.json({ data: books, totalPages }, { status: 200 })
//   } catch (error: any) {
//     console.log('error', error)
//     return NextResponse.json({ error: error.message }, { status: 403 })
//   }
// }

const getUserSession = async () => {
  const session = await getServerSession(authOptions)
  const user: any = session?.user
  return user._id
}
