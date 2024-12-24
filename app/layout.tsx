import './globals.css'
import { Outfit } from 'next/font/google'
import { WalletProvider } from '../contexts/WalletContext'

const outfit = Outfit({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

export const metadata = {
  title: 'MBetterTI - AI Powered MBTI Growth Platform',
  description: 'Discover and develop your MBTI personality type with AI assistance. A decentralized platform for personal growth and self-discovery.',
  keywords: 'MBTI, AI, Personal Growth, Self Discovery, Web3, Personality Development',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="bg-gradient-to-br from-purple-100 via-indigo-100 to-purple-200 min-h-screen flex flex-col">
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  )
}
