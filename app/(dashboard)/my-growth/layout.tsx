'use client'

import GrowthTabs from '../../components/GrowthTabs';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <GrowthTabs />
      {children}
    </div>
  );
} 