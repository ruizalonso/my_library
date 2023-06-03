import BookForm from '@/src/components/Book/BookForm'
import React from 'react'
import { getBookById, getAllBooks } from '@/src/lib/books'
import { IBook } from '@/src/interfaces'
import { ObjectId } from 'mongoose'

type Props = {
  params: {
    _id: string
  }
}
const getDataBook = async (id: ObjectId | string) => {
  const data: IBook = await getBookById(id)
  return data
}
const AddEditBook = async ({ params: { _id } }: Props) => {
  const book = await getDataBook(_id)
  return <BookForm book={book} edit={true} />
}

export async function generateStaticParams() {
  const books = await getAllBooks()
  return books?.map(({ _id }) => ({ _id }))
}

export async function generateMetadata({ params: { _id } }: Props) {
  const book = await getBookById(_id)

  if (!book) {
    return {
      title: 'No se encontró el libro que buscas',
    }
  }

  return {
    title: book.title,
  }
}
export default AddEditBook
