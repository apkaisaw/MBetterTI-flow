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
      <div className="relative">
        {/* 呼吸光效果 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-x-0 -top-32 h-32 bg-gradient-to-b from-transparent to-purple-500/15 dark:to-amber-500/15 blur-2xl opacity-50" />
          <div className="absolute inset-x-0 -bottom-32 h-32 bg-gradient-to-t from-transparent to-purple-500/15 dark:to-amber-500/15 blur-2xl opacity-50 animate-pulse" />
        </div>
        {/* 主要内容 */}
        <div className="bg-gradient-to-r from-white/60 via-blue-50/60 to-purple-50/60 dark:from-gray-900/80 dark:via-blue-900/30 dark:to-purple-900/30 backdrop-blur-xl border-t border-gray-200/20 dark:border-gray-800/30 relative">
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
                    className="flex flex-col items-center justify-center -mt-6 relative group"
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center relative ${
                      isActive 
                        ? 'bg-gradient-to-tr from-purple-600 to-amber-500 shadow-lg shadow-purple-500/30'
                        : 'bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100/80 dark:from-amber-900/40 dark:via-yellow-900/30 dark:to-amber-800/50 border border-amber-200/30 dark:border-amber-700/30 shadow-inner shadow-amber-100/20'
                    } group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 ease-out`}>
                      {isActive && (
                        <>
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-purple-500 to-amber-400 opacity-50 blur-xl -z-10 animate-pulse" />
                          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-purple-500/20 to-amber-400/20 opacity-75 blur-2xl -z-10" />
                        </>
                      )}
                      <div className="relative">
                        <Icon size={24} className={`${isActive ? 'text-white' : 'text-amber-700 dark:text-amber-200'} transform transition-transform duration-300`} />
                        {!isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-200/0 via-amber-100/30 to-amber-200/0 group-hover:opacity-100 opacity-0 transition-all duration-300 rounded-xl" />
                        )}
                      </div>
                    </div>
                    <span className={`text-xs font-medium mt-1.5 ${
                      isActive ? 'text-purple-600 dark:text-amber-400 font-semibold' : 'text-gray-700 dark:text-gray-300'
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
                      ? 'text-purple-600 dark:text-amber-400' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="relative">
                    <Icon size={22} className={`transition-all duration-300 ease-out ${
                      isActive 
                        ? 'scale-110 text-purple-600 dark:text-amber-400' 
                        : 'group-hover:scale-110 group-hover:text-purple-500'
                    }`} />
                  </div>
                  <span className={`text-xs font-medium mt-1 transition-all duration-200 ${
                    isActive 
                      ? 'text-purple-600 dark:text-amber-400 font-semibold' 
                      : 'group-hover:text-purple-500'
                  }`}>{item.name}</span>
                  {isActive && (
                    <>
                      <div className="absolute -bottom-[0.875rem] w-6 h-1 rounded-full bg-gradient-to-r from-purple-600 to-amber-500 opacity-90" />
                      <div className="absolute -bottom-[0.875rem] w-8 h-2 rounded-full bg-gradient-to-r from-purple-500/30 to-amber-500/30 blur-md -z-10" />
                    </>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileBottomNav; 