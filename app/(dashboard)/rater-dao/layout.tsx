'use client'

import ChallengesTabs from '../../components/ChallengesTabs';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <ChallengesTabs />
      {children}
    </div>
  );
} 