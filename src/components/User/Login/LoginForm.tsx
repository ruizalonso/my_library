'use client'
import { IAuth } from '@/src/interfaces'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { signIn } from 'next-auth/react'
// import { Link, useNavigate } from 'react-router-dom'
// import useNotification from '../../hooks/useNotify'

export default function LoginForm() {
  const signInerros = ['CredentialsSignin']
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  //   const [notification, showNotification] = useNotification()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    try {
      if (email && password) {
        const loginRes = await loginUser({ email, password })
        if (loginRes?.error) {
          throw new Error()
        }
        console.log(loginRes)
        setLoading(false)
        router.push('/books')
      } else {
        throw new Error()
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const loginUser = async ({ email, password }: IAuth) => {
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })
    return res
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight">
          Inicia sesión
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                required={true}
                placeholder="mail@mail.com"
                className="block w-full input input-bordered"
                ref={emailRef}
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
                required={true}
                placeholder="********"
                className="block w-full input input-bordered"
                ref={passwordRef}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              Login
              {loading && <span className="loading loading-spinner"></span>}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm">
          ¿No estás registrado?{' '}
          <Link href="/register" className="font-semibold leading-6">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  )
}
