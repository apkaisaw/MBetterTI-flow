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
      <div className="bg-white/95 backdrop-blur-2xl border-t border-purple-100/30 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)]">
        <nav className="flex justify-around items-center h-[4.5rem] px-2 max-w-screen-lg mx-auto relative">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.path || '') || 
              (item.path === '/challenges' && pathname.startsWith('/rater-dao'));
            
            if (item.isSpecial) {
              return (
                <Link
                  key={item.path}
                  href={item.path || ''}
                  className="flex flex-col items-center justify-center -mt-8 relative group"
                >
                  <div className={`w-[3.25rem] h-[3.25rem] rounded-full flex items-center justify-center ${
                    isActive 
                      ? 'bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 shadow-purple-400/30'
                      : 'bg-gradient-to-br from-purple-50 to-purple-100/80'
                  } shadow-lg group-hover:shadow-xl group-hover:-translate-y-1.5 group-hover:scale-110 transition-all duration-300 ease-out`}>
                    <div className="relative">
                      <Icon size={22} className={`${isActive ? 'text-white' : 'text-purple-600'} transform transition-transform duration-300`} />
                      {!isActive && (
                        <>
                          <div className="absolute inset-0 bg-purple-600/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute -inset-3 bg-purple-100/50 rounded-full opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300" />
                        </>
                      )}
                    </div>
                  </div>
                  <span className={`text-xs font-medium mt-2 ${
                    isActive ? 'text-purple-600 font-semibold' : 'text-gray-500'
                  } transition-all duration-200 group-hover:text-purple-500`}>
                    {item.name}
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={item.path}
                href={item.path || ''}
                className={`flex flex-col items-center justify-center w-16 h-full relative group ${
                  isActive 
                    ? 'text-purple-600' 
                    : 'text-gray-400 hover:text-purple-500'
                }`}
              >
                <div className="relative">
                  <Icon size={20} className={`mb-1.5 transition-all duration-300 ease-out ${
                    isActive ? 'text-purple-600 scale-110' : 'group-hover:scale-110 group-hover:text-purple-500'
                  }`} />
                  {isActive && <div className="absolute -inset-1 bg-purple-400/20 blur-md rounded-full -z-10" />}
                </div>
                <span className={`text-xs font-medium transition-all duration-200 ${
                  isActive ? 'font-semibold' : ''
                }`}>{item.name}</span>
                {isActive && (
                  <div className="absolute -bottom-[1.125rem] w-1 h-1 rounded-full bg-purple-600" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default MobileBottomNav; 