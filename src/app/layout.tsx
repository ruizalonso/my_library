import Footer from '@/src/components/common/Footer'
import './globals.css'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from './provider'
import Navbar from '../components/common/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'my_library',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body suppressHydrationWarning={true}>
          <Navbar />
          <div className="container mx-auto rounded-xl p-8 m-10">
            {children}
          </div>
          <Footer />
        </body>
      </NextAuthProvider>
    </html>
  )
}
