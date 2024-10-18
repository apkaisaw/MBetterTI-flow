import './globals.css'
import dynamic from 'next/dynamic'
import Footer from '../components/Footer'
import { LanguageProvider } from '../contexts/LanguageContext'

const Header = dynamic(() => import('../components/Header'), { ssr: false })

export const metadata = {
  title: 'Idealist Garden - 创意与个人成长平台',
  description: '探索你的创意,发现你的潜力,与志同道合的人联系。一个去中心化的创意和个人成长平台。',
  keywords: 'MBTI, NFT, 博客, 个人成长, 创意, Web3',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gradient-to-br from-purple-100 via-indigo-100 to-purple-200 min-h-screen flex flex-col font-sans">
        <LanguageProvider>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 mt-20">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
