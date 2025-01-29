import { Metadata } from 'next'
import ClientLayout from './client-layout'

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
  return <ClientLayout>{children}</ClientLayout>
} 