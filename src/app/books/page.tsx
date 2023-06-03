import BookList from '@/src/components/Book/BookList'
import { IBook } from '@/src/interfaces'
import { getAllBooks } from '@/src/lib/books'
import type { Metadata } from 'next'

const getData = async () => {
  const data: IBook[] = await getAllBooks()
  return data
}
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Todos tu libros',
    description: 'Todos tu libros',
  }
}
const Home = async () => {
  const books = await getData()
  return <BookList books={books} />
}
export default Home
