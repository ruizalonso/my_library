/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { IBook } from '@/src/interfaces'
import React, { useState } from 'react'
import BookItem from './BookItem'
import Link from 'next/link'
import SearchBook from './SearchBook'

interface Props {
  books: IBook[]
}
const BookList = ({ books }: Props) => {
  const pageSize = 5
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchValue, setSearchValue] = useState<string>('')
  const filteredItems = searchValue
    ? books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    : books
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentBooks = filteredItems?.slice(startIndex, endIndex)
  const totalPages = Math.ceil(filteredItems?.length / pageSize)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const lisItems = currentBooks?.map((book) => (
    <BookItem book={book} key={book._id as string} />
  ))

  return (
    <>
      <div className="overflow-x-auto w-full">
        <div className="flex justify-center my-5">
          <Link href={'/books/new'} className="btn btn-circle">
            <PlusCircleIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
        <div className="">
          <SearchBook
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          {lisItems.length > 0 && (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Género</th>
                  <th>Precio</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{lisItems}</tbody>
              <tfoot>
                <tr>
                  <th>Nombre</th>
                  <th>Género</th>
                  <th>Precio</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          )}
          {lisItems.length === 0 && (
            <div className="text-center">
              <p>
                No se encontraron libros que coincidan con{' '}
                <span className="font-medium underline underline-offset-4">
                  {searchValue}
                </span>
              </p>
            </div>
          )}
          <div className="join flex justify-center mt-10">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                className="oin-item btn btn-outline btn-sm mx-1"
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default BookList
