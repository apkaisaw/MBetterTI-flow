'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Brain, Trophy, Store } from 'lucide-react';

const MobileBottomNav = () => {
  const pathname = usePathname() || '';

  const mainNavItems = [
    {
      name: 'Overview',
      path: '/overview',
      icon: Home
    },
    {
      name: 'Growth',
      path: '/my-growth/growth-chain',
      icon: User
    },
    {
      name: 'AI Coach',
      path: '/ai-life-coach',
      icon: Brain,
      isSpecial: true
    },
    {
      name: 'Challenge',
      path: '/challenges',
      icon: Trophy
    },
    {
      name: 'Market',
      path: '/agent-market',
      icon: Store
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-white/80 backdrop-blur-lg border-t border-purple-100">
        <nav className="flex justify-around items-center h-16 px-2 max-w-screen-lg mx-auto relative">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.path || '') || 
              (item.path === '/challenges' && pathname.startsWith('/rater-dao'));
            
            if (item.isSpecial) {
              return (
                <Link
                  key={item.path}
                  href={item.path || ''}
                  className="flex flex-col items-center justify-center -mt-6 relative"
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600'
                      : 'bg-purple-100'
                  } shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                    <Icon size={24} className={isActive ? 'text-white' : 'text-purple-600'} />
                  </div>
                  <span className={`text-xs font-medium mt-1 ${
                    isActive ? 'text-purple-600' : 'text-gray-500'
                  }`}>
                    {item.name}
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={item.path}
                href={item.path || ''}
                className={`flex flex-col items-center justify-center w-16 h-full relative ${
                  isActive 
                    ? 'text-purple-600' 
                    : 'text-gray-500 hover:text-purple-500'
                }`}
              >
                <Icon size={20} className={`mb-1 transition-colors duration-200 ${isActive ? 'text-purple-600' : ''}`} />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default MobileBottomNav; 