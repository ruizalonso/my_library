'use client'
import { signOut, useSession } from 'next-auth/react'
import {
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function Navbar() {
  const { data: session } = useSession()
  const user = session?.user

  const router = useRouter()
  return (
    <nav className="navbar bg-base-100 justify-end">
      <div className="">
        {user && (
          <button
            className="btn btn-square btn-ghost"
            onClick={() => signOut()}
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
        {!user && (
          <button
            className="btn btn-square btn-ghost"
            onClick={() => router.push('/')}
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
