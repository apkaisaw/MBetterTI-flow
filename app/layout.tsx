import './globals.css'
import dynamic from 'next/dynamic'
import Footer from '../components/Footer'
import { LanguageProvider } from '../contexts/LanguageContext'
import I18nClientProvider from './I18nClientProvider'

const Header = dynamic(() => import('../components/Header'), { ssr: false })

export const metadata = {
  title: 'Idealist Garden - Creative and Personal Growth Platform',
  description: 'Explore your creativity, discover your potential, and connect with like-minded individuals. A decentralized platform for creativity and personal growth.',
  keywords: 'MBTI, NFT, Blog, Personal Growth, Creativity, Web3',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const defaultLang = 'en';

  return (
    <html lang={defaultLang}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gradient-to-br from-purple-100 via-indigo-100 to-purple-200 min-h-screen flex flex-col font-sans">
        <LanguageProvider initialLanguage={defaultLang}>
          <I18nClientProvider locale={defaultLang} namespaces={['common']}>
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 mt-20">{children}</main>
            <Footer />
          </I18nClientProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
