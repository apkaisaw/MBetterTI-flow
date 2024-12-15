import './globals.css'
import { LanguageProvider } from '../contexts/LanguageContext'
import I18nClientProvider from './I18nClientProvider'
import { Inter } from 'next/font/google'
import RootLayoutContent from './components/RootLayoutContent'
import { WalletProvider } from '../contexts/WalletContext'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={`bg-gradient-to-br from-purple-100 via-indigo-100 to-purple-200 min-h-screen flex flex-col ${inter.className}`}>
        <WalletProvider>
          <LanguageProvider initialLanguage={defaultLang}>
            <I18nClientProvider locale={defaultLang} namespaces={['common']}>
              <RootLayoutContent>{children}</RootLayoutContent>
            </I18nClientProvider>
          </LanguageProvider>
        </WalletProvider>
      </body>
    </html>
  )
}
