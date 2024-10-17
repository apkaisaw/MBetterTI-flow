import './globals.css'
import { Noto_Sans_SC, Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
import Footer from '../components/Footer'
import Script from 'next/script'
import { LanguageProvider } from '../contexts/LanguageContext'

const Header = dynamic(() => import('../components/Header'), { ssr: false })

const notoSansSC = Noto_Sans_SC({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-sc',
})

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

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
    <html lang="zh" className={`${notoSansSC.variable} ${inter.variable}`}>
      <body className={`${inter.className} bg-gradient-to-br from-purple-100 to-indigo-100 min-h-screen flex flex-col font-sans`}>
        <LanguageProvider>
          <Script src="https://unpkg.com/lucide@latest" strategy="afterInteractive" />
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
