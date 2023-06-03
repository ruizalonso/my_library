import React from 'react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { IBook } from '@/src/interfaces'
import Image from 'next/image'
import Link from 'next/link'
interface Props {
  book: IBook
}
const BookItem = ({ book }: Props) => {
  const { _id: id, image, title, categories, author, price } = book
  const formatterCurrency = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  })
  return (
    <tr className="hover">
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <Image src={image as string} alt={title} width={50} height={50} />
            </div>
          </div>
          <div>
            <div className="font-bold">{title}</div>
            <div className="text-sm opacity-50">{author}</div>
          </div>
        </div>
      </td>
      <td>
        {categories?.map((category) => {
          return (
            <div key={category as string}>
              <span className="badge badge-ghost badge-sm">{category}</span>
            </div>
          )
        })}
      </td>
      <td>{formatterCurrency.format(price)}</td>
      <th>
        <Link href={`/books/${id}`} className="btn btn-ghost btn-xs">
          detalles
        </Link>
      </th>
    </tr>
  )
}

export default BookItem
