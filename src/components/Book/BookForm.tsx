'use client'
import React, { useState } from 'react'
import { IBook, ICategory } from '@/src/interfaces'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { MultiSelect } from 'react-multi-select-component'
import Image from 'next/image'

interface Props {
  book: IBook
  edit?: boolean
}
const BookForm = ({ book, edit }: Props) => {
  const { _id } = useParams()
  const router = useRouter()

  let categoiesEdit: ICategory[] = []
  if (book?.categories) {
    categoiesEdit = book?.categories.map((category) => {
      return { value: category, label: category }
    })
  }
  const [selectedCategories, setSelectedCategories] = useState<ICategory[]>(
    book?.categories ? categoiesEdit : []
  )
  const categoriesToSave = (): string[] => {
    return selectedCategories.map(({ value }) => value)
  }
  const formatterCurrency = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  })
  const categories: ICategory[] = [
    { value: 'Liderazgo', label: 'Liderazgo' },
    { value: 'Negocios', label: 'Negocios' },
    { value: 'Autoayuda', label: 'Autoayuda' },
    { value: 'Superación', label: 'Superación' },
    { value: 'Espiritualidad', label: 'Espiritualidad' },
    { value: 'Motivación', label: 'Motivación' },
    { value: 'Desarrollo personal', label: 'Desarrollo personal' },
    { value: 'Finanzas personales', label: 'Finanzas personales' },
    { value: 'Crecimiento empresarial', label: 'Crecimiento empresarial' },
    { value: 'Psicología', label: 'Psicología' },
    { value: 'Mente y cuerpo', label: 'Mente y cuerpo' },
    { value: 'Historia', label: 'Historia' },
    {
      value: 'Filosofía Social Y Política',
      label: 'Filosofía Social Y Política',
    },
  ]
  const languages = ['Español', 'Ingles']
  const [form, setForm] = useState<IBook>({
    title: book?.title,
    author: book?.author,
    publisher: book?.publisher,
    description: book?.description,
    pageCount: book?.pageCount,
    language: book?.language ?? 'Español',
    price: book?.price,
    inventory: book?.inventory,
    image: book?.image,
    user: book?.user,
    readed: book?.readed ? true : false,
  })
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target
    if (target instanceof HTMLInputElement) {
      const value = target.type === 'checkbox' ? target.checked : target.value
      const name = target.name

      setForm({
        ...form,
        [name]: value,
      })
    } else {
      const value = target.value
      const name = target.name

      setForm({
        ...form,
        [name]: value,
      })
    }
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (edit) {
      putData(form)
    } else {
      postData(form)
    }
  }
  const postData = async (formData: IBook) => {
    formData.categories = categoriesToSave()
    fetch(`/api/books`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        console.log('response', res)
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        router.push('/books')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const putData = async (formData: IBook) => {
    formData.categories = categoriesToSave()
    console.log('formData', formData)
    fetch(`/api/books/${_id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        console.log('response', res)
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        router.push('/books')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const titleProps = {
    className: 'input input-bordered w-full max-w-xs',
    id: 'title',
    type: 'text',
    name: 'title',
    autoComplete: 'off',
    required: true,
    placeholder: 'Títuto',
    value: form.title,
    onChange: handleChange,
  }
  const authorProps = {
    className: 'input input-bordered w-full max-w-xs',
    id: 'author',
    type: 'text',
    name: 'author',
    autoComplete: 'off',
    required: true,
    placeholder: 'Autor',
    value: form.author,
    onChange: handleChange,
  }
  const publisherProps = {
    className: 'input input-bordered w-full max-w-xs',
    id: 'publisher',
    type: 'text',
    name: 'publisher',
    autoComplete: 'off',
    required: true,
    placeholder: 'Editorial',
    value: form.publisher,
    onChange: handleChange,
  }
  const pageCountProps = {
    className: 'input input-bordered w-full max-w-xs',
    id: 'pageCount',
    type: 'number',
    name: 'pageCount',
    autoComplete: 'off',
    required: true,
    placeholder: 'Páginas',
    value: form.pageCount,
    onChange: handleChange,
  }
  const languageProps = {
    className: 'select select-bordered w-full max-w-xs',
    id: 'language',
    name: 'language',
    required: true,
    value: form.language,
    onChange: handleChange,
  }
  const priceProps = {
    className: 'input join-item input-bordered w-full max-w-xs',
    id: 'price',
    type: 'number',
    name: 'price',
    autoComplete: 'off',
    required: true,
    placeholder: 'Precio',
    value: form.price,
    onChange: handleChange,
  }
  const inventoryProps = {
    className: 'input input-bordered w-full max-w-xs',
    id: 'inventory',
    type: 'number',
    name: 'inventory',
    autoComplete: 'off',
    required: true,
    placeholder: 'Inventario',
    value: form.inventory,
    onChange: handleChange,
  }
  const imageProps = {
    className: 'input input-bordered w-full max-w-xs',
    id: 'image',
    type: 'text',
    name: 'image',
    autoComplete: 'off',
    required: true,
    placeholder: 'Imagen',
    value: form.image,
    onChange: handleChange,
  }
  const descriptionProps = {
    className: 'textarea textarea-bordered w-full max-w-xs',
    id: 'description',
    name: 'description',
    autoComplete: 'off',
    rows: 8,
    required: true,
    placeholder: 'Descripción',
    value: form.description,
    onChange: handleChange,
  }
  const readedProps = {
    className: 'toggle toggle-primary',
    id: 'readed',
    name: 'readed',
    type: 'checkbox',
    checked: form.readed,
    onChange: handleChange,
  }

  return (
    <div>
      <p className="text-center">
        {edit ? 'Editar ' + form.title : 'Añade un nuevo libro'}
      </p>
      <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="form-control my-2">
            <label htmlFor="title" className="label">
              Título
            </label>
            <input {...titleProps} />
          </div>
          <div className="form-control my-2">
            <label htmlFor="author" className="label">
              Autor
            </label>
            <input {...authorProps} />
          </div>
          <div className="form-control my-2">
            <label htmlFor="publisher" className="label">
              Editorial
            </label>
            <input {...publisherProps} />
          </div>
          <div className="form-control my-2">
            <label htmlFor="pageCount" className="label">
              Páginas
            </label>
            <input {...pageCountProps} />
          </div>
          <div className="form-control my-2">
            <label htmlFor="language" className="label">
              Idioma
            </label>
            <select {...languageProps}>
              {languages.map((language, i) => (
                <option key={i} value={language} defaultValue={form.language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control my-2">
            <label htmlFor="category" className="label">
              Categoria
            </label>
            <MultiSelect
              className="dark"
              options={categories}
              value={selectedCategories}
              onChange={setSelectedCategories}
              labelledBy="Seleccionar"
            />
          </div>
          <div className="form-control join my-2">
            <label htmlFor="price" className="label">
              Precio
            </label>
            <label className="label">
              <input {...priceProps} />
              <span className="btn join-item rounded-r-full">COP</span>
            </label>
          </div>
          <div className="form-control my-2">
            <label htmlFor="inventory" className="label">
              Inventario
            </label>
            <input {...inventoryProps} />
          </div>
          <div className="form-control my-2">
            <label htmlFor="image" className="label">
              Portada
            </label>
            <input {...imageProps} />
            {form.image && (
              <Image
                className="mask mask-squircle mx-auto"
                src={form.image}
                alt={form.title}
                width={130}
                height={130}
              />
            )}
          </div>
          <div className="form-control my-2">
            <label htmlFor="description" className="label">
              Descripción
            </label>
            <textarea {...descriptionProps} />
          </div>
          <div className="form-control my-2">
            <label className="label cursor-pointer">
              <label htmlFor="readed" className="label">
                Leído
              </label>
              <input {...readedProps} />
              {/* <input
                type="checkbox"
                name="readed"
                id="readed"
                className="toggle toggle-primary"
                checked={form.readed}
                onChange={handleChange}
              /> */}
            </label>
          </div>
        </div>
        <div className="mt-10">
          <button className="btn btn-primary btn-block">
            {edit ? 'Actualizar' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default BookForm
