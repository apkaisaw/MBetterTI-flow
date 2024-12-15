'use client'

import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import Footer from '../../components/Footer'

const Header = dynamic(() => import('../../components/Header'), { 
  ssr: false,
  loading: () => <div className="h-20" />
})

export default function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardPage = pathname === '/persona-discovery' || pathname === '/ai-life-coach';
  const isTestPage = pathname === '/mbti-test';

  if (isTestPage) {
    return <>{children}</>;
  }

  return (
    <>
      {!isDashboardPage && <Header />}
      <main className={`flex-grow ${!isDashboardPage ? 'px-4 py-8 mt-20' : ''}`}>
        {children}
      </main>
      {!isDashboardPage && <Footer />}
    </>
  );
} 