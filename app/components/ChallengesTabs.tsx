'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy, Users } from 'lucide-react';

const ChallengesTabs = () => {
  const pathname = usePathname() || '';
  
  const tabs = [
    {
      name: 'Challenges',
      path: '/challenges',
      icon: Trophy
    },
    {
      name: 'Rater DAO',
      path: '/rater-dao',
      icon: Users
    }
  ];

  return (
    <>
      <div className="h-9 md:hidden" /> {/* Spacer */}
      <div className="fixed top-4 left-0 right-0 z-40 md:hidden flex justify-center px-4">
        <nav className="inline-flex items-center h-9 bg-white/30 backdrop-blur-xl rounded-full shadow-lg border border-white/40 p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.path;
            
            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-white/50 text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-purple-500 hover:bg-white/30'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-purple-500' : 'text-gray-500'} />
                <span>{tab.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default ChallengesTabs; 