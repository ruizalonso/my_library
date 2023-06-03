'use client'
import { IUser } from '@/src/interfaces'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
// import { addUser } from '../../../services/user.service'
// import useNotification from '../../../hooks/useNotify'

export default function RegisterForm() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    status: true,
  })
  //   const [notification, showNotification] = useNotification()

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target
    const value = target.value
    const name = target.name
    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await postData(form)
  }

  const postData = async (formData: IUser) => {
    try {
      const res = await fetch(`/api/users/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        throw new Error(res.status as unknown as string)
      }
      console.log('res', res)
      router.push('/')
    } catch (error: any) {
      // showNotification({
      //   variant: 'error',
      //   message: 'error.message',
      // })
      console.log('error', error)
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight">
          Registrate
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nombre</label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                autoComplete="off"
                required={true}
                placeholder="Your name"
                className="block w-full input input-bordered"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                autoComplete="off"
                required={true}
                placeholder="mail@mail.com"
                className="block w-full input input-bordered"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="password">Password</label>
            </div>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                autoComplete="off"
                required={true}
                placeholder="********"
                className="block w-full input input-bordered"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button type="submit" className="btn btn-block">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
