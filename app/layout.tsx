import './globals.css'
import { Outfit } from 'next/font/google'
import { AuthContextProvider } from '../contexts/AuthContext'
import type { Metadata } from 'next'

const outfit = Outfit({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: 'MBetterTI Flow',
  description: 'A better way to understand yourself through MBTI',
  keywords: 'MBTI, AI, Personal Growth, Self Discovery, Web3, Personality Development',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="bg-gradient-to-br from-purple-100 via-indigo-100 to-purple-200 min-h-screen flex flex-col">
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
